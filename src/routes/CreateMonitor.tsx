import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";

import { useUserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import isValidUrl from "../utils/isValidUrl";
import { MonitorFormType } from "../types/monitor.types";
import isValidJsonObject from "../utils/isValidJSON";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import { createMonitor } from "../api/monitor.api";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const types = ["WEBSITE", "API"];

const CreateMonitor = () => {
  const { isLoggedIn, user } = useUserContext();
  const [form, setForm] = useState<MonitorFormType>({
    name: `Monitor ${crypto.randomUUID().split('-')[0]}`,
    type: "WEBSITE",
    endpoint: "",
    method: "GET",
    payload: undefined,
    headers: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const showToast = useToast();
  const axiosInstance = useApi();

  const [payloadInput, setPayloadInput] = useState<string>("");
  const [headersInput, setHeadersInput] = useState<string>("");

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'payload') setPayloadInput(value);
    if (name === 'headers') setHeadersInput(value);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Name validation
      if (!form.name) {
        showToast('Name can not be empty', 'warning');
        return;
      }

      // Endpoint validation
      if (!isValidUrl(form.endpoint)) {
        showToast('Provide a valid URL endpoint. Consider including https:// or http://', 'warning');
        return;
      }

      // Payload validation
      if (!payloadInput.trim()) form.payload = undefined; // No input for payload
      else {
        // Invalid json input for payload
        if (!isValidJsonObject(payloadInput)) {
          showToast('Provide valid JSON payload', 'warning');
          return;
        }
        const parsed = JSON.parse(payloadInput);
        if (Object.keys(parsed)?.length > 0) form.payload = payloadInput;
        else form.payload = undefined;
        // form.payload = Object.keys(parsed).length > 0 ? JSON.stringify(parsed) : undefined;  // Set to undefined if the value if {}
      }

      // Headers validation
      if (!headersInput.trim()) form.headers = undefined; // No input for headers
      else {
        // Invalid json input for headers
        if (!isValidJsonObject(headersInput)) {
          showToast('Provide valid JSON headers', 'warning');
          return;
        }
        const parsed = JSON.parse(headersInput);
        form.headers = Object.keys(parsed).length > 0 ? headersInput : undefined; // Set to undefined if the value is {}
      }

      const monitorData = await createMonitor(axiosInstance, form);
      showToast('Your monitor has been created successfully and now it will be monitored!', 'success', { duration: 3500 });
      navigate(`/monitor?id=${monitorData?.id}`)
    } catch (error: any) {
      showToast('Something went wrong while creating monitor, Please try again', 'error');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    // If user does not have enough monitor quota left
    if ((user?.monitors !== undefined) && (user?.monitors <= 0)) {
      navigate('/dashboard');
      return;
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-white text-2xl font-bold mb-4">Create Monitor</h1>

        <label className="block text-gray-400">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="Enter monitor name" />

        <div className="relative mt-4">
          <Listbox value={form.type} onChange={(value) => setForm({ ...form, type: value })}>
            <Listbox.Button className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 text-center">{form.type}</Listbox.Button>
            <Listbox.Options className="absolute z-10 bg-gray-800 text-white w-full mt-1 rounded-lg shadow-lg border border-gray-700">
              {types.map((type) => (
                <Listbox.Option key={type} value={type} className="p-2 cursor-pointer hover:bg-gray-700 text-center data-[selected]:bg-blue-600">
                  {type}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <label className="block text-gray-400 mt-4">Endpoint</label>
        <input type="url" name="endpoint" value={form.endpoint} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="Enter valid URL" />

        <div className="relative mt-4">
          <Listbox value={form.method} onChange={(value) => setForm({ ...form, method: value })}>
            <Listbox.Button className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 text-center">{form.method}</Listbox.Button>
            <Listbox.Options className="absolute z-10 bg-gray-800 text-white w-full mt-1 rounded-lg shadow-lg border border-gray-700">
              {methods.map((method) => (
                <Listbox.Option key={method} value={method} className="p-2 cursor-pointer hover:bg-gray-700 text-center data-[selected]:bg-blue-600">
                  {method}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <label className="block text-gray-400 mt-4">Payload (JSON)</label>
        <textarea
          name="payload"
          value={payloadInput}
          onChange={handleTextAreaChange}
          className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter JSON data (or leave empty)"
          rows={4}
        />

        <label className="block text-gray-400 mt-4">Headers (JSON)</label>
        <textarea
          name="headers"
          value={headersInput}
          onChange={handleTextAreaChange}
          className="w-full bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter JSON data (or leave empty)"
          rows={4}
        />

        <div className="flex gap-4 mt-6">
          {/* <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">Create Monitor</button> */}
          <Button
            onClick={handleSubmit}
            label="Create monitor"
            isLoading={isLoading}
          />
          <button onClick={() => (window.location.href = "/dashboard")} className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default CreateMonitor;
