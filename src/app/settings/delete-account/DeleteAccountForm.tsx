'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteAccountFormProps {
  userEmail: string
}

export default function DeleteAccountForm({ userEmail }: DeleteAccountFormProps) {
  const [confirmText, setConfirmText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (response.ok) {
        // Başarılı silme sonrası ana sayfaya yönlendir
        router.push('/?deleted=true')
      } else {
        alert('Failed to delete account. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
      setShowConfirmModal(false)
    }
  }

  const isConfirmValid = confirmText === 'DELETE MY ACCOUNT'

  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type "DELETE MY ACCOUNT" to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="DELETE MY ACCOUNT"
          />
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={!isConfirmValid}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isConfirmValid
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Delete My Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Final Confirmation
            </h3>
            <p className="text-gray-600 mb-6">
              Are you absolutely sure you want to delete your account ({userEmail})? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
