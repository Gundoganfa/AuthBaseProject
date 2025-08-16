import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'

// Mock the auth and currentUser functions
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
  currentUser: jest.fn()
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it('renders dashboard title', async () => {
    const mockAuth = require('@clerk/nextjs/server').auth
    const mockCurrentUser = require('@clerk/nextjs/server').currentUser
    
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })
    mockCurrentUser.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }]
    })

    render(await DashboardPage())
    
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })

  it('renders welcome message with user name', async () => {
    const mockAuth = require('@clerk/nextjs/server').auth
    const mockCurrentUser = require('@clerk/nextjs/server').currentUser
    
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })
    mockCurrentUser.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }]
    })

    render(await DashboardPage())
    
    expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument()
  })

  it('renders user information card', async () => {
    const mockAuth = require('@clerk/nextjs/server').auth
    const mockCurrentUser = require('@clerk/nextjs/server').currentUser
    
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })
    mockCurrentUser.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }]
    })

    render(await DashboardPage())
    
    expect(screen.getByText(/User Information/i)).toBeInTheDocument()
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument()
  })

  it('renders account status card', async () => {
    const mockAuth = require('@clerk/nextjs/server').auth
    const mockCurrentUser = require('@clerk/nextjs/server').currentUser
    
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })
    mockCurrentUser.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }]
    })

    render(await DashboardPage())
    
    expect(screen.getByText(/Account Status/i)).toBeInTheDocument()
    expect(screen.getByText(/Active/i)).toBeInTheDocument()
  })

  it('renders quick actions', async () => {
    const mockAuth = require('@clerk/nextjs/server').auth
    const mockCurrentUser = require('@clerk/nextjs/server').currentUser
    
    mockAuth.mockResolvedValue({ userId: 'test-user-id' })
    mockCurrentUser.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }]
    })

    render(await DashboardPage())
    
    expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument()
    expect(screen.getByText(/View Profile/i)).toBeInTheDocument()
    expect(screen.getByText(/Settings/i)).toBeInTheDocument()
    expect(screen.getByText(/Security/i)).toBeInTheDocument()
    expect(screen.getByText(/Help/i)).toBeInTheDocument()
  })
})
