import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock the auth function
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn()
}))

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Welcome to AuthBase/i)).toBeInTheDocument()
  })

  it('renders sign in and sign up buttons when user is not authenticated', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  })

  it('renders dashboard link when user is authenticated', () => {
    // Mock authenticated user
    const mockAuth = require('@clerk/nextjs/server').auth
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })

    render(<HomePage />)
    
    expect(screen.getByText(/Go to Dashboard/i)).toBeInTheDocument()
  })

  it('displays feature cards', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Secure Authentication/i)).toBeInTheDocument()
    expect(screen.getByText(/Fast & Scalable/i)).toBeInTheDocument()
    expect(screen.getByText(/Type Safe/i)).toBeInTheDocument()
  })
})
