import Typewriter from 'typewriter-effect'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getGoogleAuthUrl } from '../api/auth.api';
import useToast from '../hooks/useToast';
import Button from '../components/Button';
import { useUserContext } from '../contexts/user.context';
import useApi from '../hooks/useApi';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToast();
  const navigate = useNavigate();
  const axiosInstance = useApi()
  const { isLoggedIn } = useUserContext();

  useEffect(() => {
    document.title = 'UPTIME | Home'
  }, []);

  const handleGetStartedClick = async (): Promise<void> => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        navigate('/dashboard');
        return;
      }

      const url: string = await getGoogleAuthUrl(axiosInstance);
      window.location.href = url
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Something went wrong. please try again.', 'error')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center -mt-10">
        Introducing <span className="text-blue-400">UPTIME</span>
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        {/* WE NOTIFY YOU WHEN YOUR WEBSITE GOES DOWN! */}
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('WE NOTIFY YOU WHEN YOUR WEBSITE GOES DOWN!')
              .start()
          }}
          options={{
            delay: 80
          }}
        />
      </h2>

      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center px-6 md:px-16 lg:px-32">
        The ultimate AI-powered website monitoring system. Track your website’s health with ease, efficiency, and precision.
      </p>
      {/* <button className={`${loading ? 'cursor-not-allowed' : ''} bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105`} onClick={handleGetStartedClick}>
        Get Started
      </button> */}
      <Button
        label={isLoggedIn ? "Go to Dashboard 🖥️" : "Get Started Now 🚀"}
        isLoading={loading}
        onClick={handleGetStartedClick}
      />
    </div>
  );
};

export default Home;
