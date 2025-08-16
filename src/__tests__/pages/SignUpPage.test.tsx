import { render, screen } from '@testing-library/react'
import SignUpPage from '@/app/auth/sign-up/page'

describe('SignUpPage', () => {
  it('renders sign up page title', () => {
    render(<SignUpPage />)
    
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    render(<SignUpPage />)
    
    expect(screen.getByText(/Join us today! Create your account to get started./i)).toBeInTheDocument()
  })

  it('renders Clerk SignUp component', () => {
    render(<SignUpPage />)
    
    expect(screen.getByTestId('sign-up')).toBeInTheDocument()
  })
})
