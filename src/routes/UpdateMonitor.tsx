import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";

import { useUserContext } from "../contexts/user.context";
import { MonitorFormType } from "../types/monitor.types";
import isValidUrl from "../utils/isValidUrl";
import isValidJsonObject from "../utils/isValidJSON";
import useToast from "../hooks/useToast";
import useApi from "../hooks/useApi";
import Button from "../components/Button";
import { getMonitorById, updateMonitorById } from "../api/monitor.api";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const types = ["WEBSITE", "API"];

const UpdateMonitor = () => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const showToast = useToast();
  const axiosInstance = useApi();

  const [id] = useState<string | null>(searchParams.get("id"));
  const [form, setForm] = useState<MonitorFormType>({
    name: `Monitor ${crypto.randomUUID().split('-')[0]}`,
    type: "WEBSITE",
    endpoint: "",
    method: "GET",
    payload: undefined,
    headers: undefined
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMonitorDataLoading, setIsMonitorDataLoading] = useState<boolean>(true);

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
      if (!isValidUrl(form.endpoint as string)) {
        showToast('Provide a valid URL endpoint. Consider including https:// or http://', 'warning');
        return;
      }

      // Payload validation
      if (!payloadInput.trim()) form.payload = null; // No input for payload
      else {
        // Invalid json input for payload
        if (!isValidJsonObject(payloadInput)) {
          showToast('Provide valid JSON payload', 'warning');
          return;
        }
        const parsed = JSON.parse(payloadInput);
        if (Object.keys(parsed)?.length > 0) form.payload = parsed;
        else form.payload = null;
      }

      // Headers validation
      if (!headersInput.trim()) form.headers = null; // No input for headers
      else {
        // Invalid json input for headers
        if (!isValidJsonObject(headersInput)) {
          showToast('Provide valid JSON headers', 'warning');
          return;
        }
        const parsed = JSON.parse(headersInput);
        if (Object.keys(parsed)?.length > 0) form.headers = parsed;
        else form.headers = null;
      }

      await updateMonitorById(axiosInstance, id as string, form)
      showToast('Monitor data has been updated!', 'success')
      navigate(`/monitor?id=${id}`)
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Something went wrong while creating monitor, Please try again', 'error');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !id || id == "") {
      navigate('/');
      return;
    }
    
    const fetchMonitorData = async (id: string) => {
      try {
        const monitorData = await getMonitorById(axiosInstance, id, "0", "1");
        setForm({
          name: monitorData?.name as string,
          endpoint: monitorData?.endpoint as string,
          method: monitorData?.method as any,
          type: monitorData?.type as any,
          payload: monitorData?.payload ? JSON.stringify(monitorData?.payload, null, 2) : undefined,
          headers: monitorData?.headers ? JSON.stringify(monitorData?.headers, null, 2) : undefined
        })
        if (monitorData?.payload) setPayloadInput(JSON.stringify(monitorData?.payload, null, 2));
        if (monitorData?.headers) setHeadersInput(JSON.stringify(monitorData?.headers, null, 2));
        document.title = `Update ${monitorData.name} monitor`
        setIsMonitorDataLoading(false);
      } catch (error) {
        navigate('/');
        return;
      }
    }

    fetchMonitorData(id);
  }, []);
  return (
    !isMonitorDataLoading && <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-white text-2xl font-bold mb-4">Update Monitor : {form.name}</h1>

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
          <Button
            onClick={handleSubmit}
            label="Update monitor"
            isLoading={isLoading}
          />
          <button onClick={() => (window.location.href = "/dashboard")} className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg">Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateMonitor;