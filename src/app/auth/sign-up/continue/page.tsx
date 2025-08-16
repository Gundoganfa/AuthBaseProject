import { SignUp } from '@clerk/nextjs'

export default function ContinuePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Continue your registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please complete your account setup.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <SignUp />
        </div>
      </div>
    </div>
  )
}
