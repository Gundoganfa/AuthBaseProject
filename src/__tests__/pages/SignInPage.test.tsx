import { render, screen } from '@testing-library/react'
import SignInPage from '@/app/auth/sign-in/page'

describe('SignInPage', () => {
  it('renders sign in page title', () => {
    render(<SignInPage />)
    
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    render(<SignInPage />)
    
    expect(screen.getByText(/Welcome back! Please sign in to continue./i)).toBeInTheDocument()
  })

  it('renders Clerk SignIn component', () => {
    render(<SignInPage />)
    
    expect(screen.getByTestId('sign-in')).toBeInTheDocument()
  })
})
