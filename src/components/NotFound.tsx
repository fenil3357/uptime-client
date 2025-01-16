import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center -mt-10">
      <h1 className="text-7xl font-extrabold mb-6 text-gray-200">
        404
      </h1>
      <p className="text-xl mb-6 text-gray-300 flex items-center gap-2">
        Oops! Looks like you’re lost{' '}
        <span role="img" aria-label="confused face">
          😕
        </span>
      </p>
      <p className="text-lg mb-8 text-gray-400 text-center">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <button
        onClick={goToHomePage}
        className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-md shadow-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105"
      >
        🏠 Take Me Home
      </button>
    </div>
  );
};

export default NotFound;
