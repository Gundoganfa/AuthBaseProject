import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DeleteAccountForm from './DeleteAccountForm'

export default async function DeleteAccountPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="border-l-4 border-red-400 bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Warning: This action cannot be undone
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Deleting your account will permanently remove all your data and cannot be recovered.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Account</h2>
              <p className="text-gray-600 mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">What will be deleted:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Your profile information ({user?.emailAddresses[0]?.emailAddress})</li>
                <li>All associated data and settings</li>
                <li>Access to your dashboard and features</li>
                <li>Login credentials and authentication</li>
              </ul>
            </div>

            <DeleteAccountForm userEmail={user?.emailAddresses[0]?.emailAddress || ''} />
          </div>
        </div>
      </main>
    </div>
  )
}
