import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5">
      {/* Background Decorations */}
      <div className="absolute bg-yellow-500 bottom-0 left-0 w-64 h-64 -ml-64 mb-32 rounded-full"></div>
      <div className="absolute bg-yellow-500 top-0 right-0 w-64 h-64 -mr-64 mt-32 rounded-full"></div>

      <div className="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl z-10">
        <div className="md:flex w-full">
          {/* Left Side */}
          <div className="hidden md:flex w-1/2 bg-yellow-500 py-10 px-10 items-center justify-center">
            {/* Example Illustration */}
            <svg
              className="w-3/4 h-3/4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <circle cx="256" cy="256" r="256" fill="#fff176" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="120"
                fill="#f57f17"
              >
                404
              </text>
            </svg>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">You seem to be lost!</h1>
              <p className="mt-2 text-gray-600">
                The page you’re looking for doesn’t exist. How you got here is a mystery.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="text-lg font-medium px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              >
                ⬅ Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
