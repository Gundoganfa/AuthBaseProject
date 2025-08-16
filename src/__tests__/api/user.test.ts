import { NextRequest } from 'next/server'
import { GET, PUT } from '@/app/api/user/route'

// Mock Clerk functions
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
  currentUser: jest.fn()
}))

describe('/api/user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns user data when authenticated', async () => {
      const mockAuth = require('@clerk/nextjs/server').auth
      const mockCurrentUser = require('@clerk/nextjs/server').currentUser
      
      mockAuth.mockResolvedValue({ userId: 'test-user-id' })
      mockCurrentUser.mockResolvedValue({
        id: 'test-user-id',
        firstName: 'John',
        lastName: 'Doe',
        emailAddresses: [{ emailAddress: 'john@example.com' }],
        imageUrl: 'https://example.com/avatar.jpg',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        id: 'test-user-id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        imageUrl: 'https://example.com/avatar.jpg',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      })
    })

    it('returns 401 when not authenticated', async () => {
      const mockAuth = require('@clerk/nextjs/server').auth
      mockAuth.mockResolvedValue({ userId: null })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data).toEqual({ error: 'Unauthorized' })
    })
  })

  describe('PUT', () => {
    it('updates user data when authenticated', async () => {
      const mockAuth = require('@clerk/nextjs/server').auth
      mockAuth.mockResolvedValue({ userId: 'test-user-id' })

      const requestBody = {
        firstName: 'Jane',
        lastName: 'Smith'
      }

      const request = new NextRequest('http://localhost:3000/api/user', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        message: 'User updated successfully',
        data: requestBody
      })
    })

    it('returns 401 when not authenticated', async () => {
      const mockAuth = require('@clerk/nextjs/server').auth
      mockAuth.mockResolvedValue({ userId: null })

      const request = new NextRequest('http://localhost:3000/api/user', {
        method: 'PUT',
        body: JSON.stringify({ firstName: 'Jane' })
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data).toEqual({ error: 'Unauthorized' })
    })
  })
})
