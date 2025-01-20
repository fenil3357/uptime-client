import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { googleAuthEncryption } from '../api/auth.api';
import useToast from '../hooks/useToast';
import Loader from '../components/Loader';
import { useUserContext } from '../contexts/user.context';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const { login } = useUserContext();
  const [searchParams] = useSearchParams();
  const isAuthHandled = useRef(false);

  useEffect(() => {
    const handleGoogleAuth = async () => {
      // To avoid extra execution
      if (isAuthHandled.current) return;
      isAuthHandled.current = true;

      const encrypted = searchParams.get('encrypted');

      if (!encrypted) {
        showToast('Invalid or null encrypted value', 'error');
        navigate('/');
        return;
      }

      try {
        const data = await googleAuthEncryption(encrypted);
        login(data.user, data.tokens.access_token);
        showToast('Google authentication successful!', 'success');
        navigate('/dashboard');
      } catch (error: any) {
        showToast(error?.response?.data?.message || 'Something went wrong while google authentication. Please try again.', 'error');
        navigate('/');
      }
    };

    handleGoogleAuth();
  }, [navigate, searchParams]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col items-center justify-center space-y-6">
      <Loader />
      <h1 className="text-2xl font-semibold tracking-wide">
        Authenticating, please wait...
      </h1>
      <p className="text-sm text-gray-400">
        We are processing your request. This may take a moment.
      </p>
    </div>
  );
};

export default GoogleAuthCallback;
