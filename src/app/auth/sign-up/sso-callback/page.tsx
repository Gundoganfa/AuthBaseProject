import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to AuthBase!
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">
            We're creating your new account with Google. Please wait a moment...
          </p>
          
          {/* Progress Steps */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Google authentication complete</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Setting up your profile</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Preparing your dashboard</span>
            </div>
          </div>
        </div>
        
        {/* Hidden Clerk Component */}
        <div className="hidden">
          <AuthenticateWithRedirectCallback />
        </div>
      </div>
    </div>
  )
}
