"use client";
import React, { useState } from 'react';

// SVGs for social icons (embedded for simplicity)
const GoogleIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.4 512 244.8 512C111.8 512 0 398.8 0 256S111.8 0 244.8 0c69.8 0 130.8 28.7 173.4 74.5l-64.5 64.5C320.5 106.6 285.6 80 244.8 80C163.8 80 97.4 146.3 97.4 227.3c0 81 66.4 147.3 147.4 147.3c87 0 129.2-61.2 134.4-92.6H244.8v-81.3h239.2c2.6 12.7 4 25.9 4 39.5z"></path>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path fill="currentColor" d="M318.7 268.7c0-38.5-19.1-70.1-47.6-86.8c23.5-16.7 39.6-41.9 39.6-70.1c0-40.9-33.1-74-74-74c-30.9 0-57.2 19.3-68.5 46.8c-11.3-27.4-37.6-46.8-68.5-46.8c-40.9 0-74 33.1-74 74c0 28.2 16.1 53.4 39.6 70.1c-28.5 16.7-47.6 48.3-47.6 86.8c0 35.2 19.1 66.8 47.6 83.7c-23.5 16.7-39.6 41.9-39.6 70.1c0 40.9 33.1 74 74 74c30.9 0 57.2-19.3 68.5-46.8c11.3 27.4 37.6 46.8 68.5 46.8c40.9 0 74-33.1 74-74c0-28.2-16.1-53.4-39.6-70.1c28.5-16.7 47.6-48.3 47.6-83.7zM224 434.3c-15.2 0-29.2-7.2-38.4-19.5c-9.2-12.3-15.2-27.6-15.2-43.9c0-16.3 6-31.5 15.2-43.9c9.2-12.3 23.2-19.5 38.4-19.5c15.2 0 29.2 7.2 38.4 19.5c9.2 12.3 15.2 27.6 15.2 43.9c0 16.3-6 31.5-15.2 43.9c-9.2 12.3-23.2 19.5-38.4 19.5zM128 226.3c0-16.3 6-31.5 15.2-43.9c9.2-12.3 23.2-19.5 38.4-19.5c15.2 0 29.2 7.2 38.4 19.5c9.2 12.3 15.2 27.6 15.2 43.9c0 16.3-6 31.5-15.2 43.9c-9.2 12.3-23.2 19.5-38.4 19.5c-15.2 0-29.2-7.2-38.4-19.5c-9.2-12.3-15.2-27.6-15.2-43.9z"></path>
  </svg>
);

function AuthForm() {
  // State to toggle between login (true) and register (false)
  // Defaults to true (Login) as requested
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle the form
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  // Handle form submission
  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Your form submission logic will go here
    // You can access form data via: new FormData(event.target)
    console.log('Form submitted');
    if (isLogin) {
      console.log('Logging in...');
    } else {
      console.log('Creating account...');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-blue-600">Roofers</span>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {isLogin ? 'Login to your account' : 'Create your Account'}
        </h2>
        
        <p className="text-sm text-center text-gray-600 mb-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={toggleForm}
            className="font-medium text-blue-600 hover:underline ml-1"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Email Field (Both) */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Full Name Field (Register Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="full-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g. Bonnie Green"
                required
              />
            </div>
          )}
          
          {/* Country Field (Register Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                Country
              </label>
              <select 
                id="country" 
                name="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          )}

          {/* Password Field (Both) */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Forgot Password (Login Only) */}
          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          {/* Checkboxes (Register Only) */}
          {!isLogin && (
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                  By signing up, you are creating a Flowbite account, and you agree to Flowbite's 
                  <a className="font-medium text-blue-600 hover:underline ml-1" href="#">Terms of Use</a> and 
                  <a className="font-medium text-blue-600 hover:underline ml-1" href="#">Privacy Policy</a>.
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="updates"
                  aria-describedby="updates"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
                <label htmlFor="updates" className="ml-3 text-sm text-gray-600">
                  Email me about product updates and resources.
                </label>
              </div>
            </div>
          )}

          {/* Submit Button (Conditional Text) */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLogin ? 'Login' : 'Create an account'}
          </button>
          
        </form>

        {/* Separator */}
        <div className="flex items-center justify-center my-6">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm font-medium text-gray-500">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-4">
          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <GoogleIcon />
            <span className="ml-2">{isLogin ? 'Sign in' : 'Sign up'} with Google</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <AppleIcon />
            <span className="ml-2">{isLogin ? 'Sign in' : 'Sign up'} with Apple</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default AuthForm;