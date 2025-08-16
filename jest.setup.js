import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    isSignedIn: false,
    isLoaded: true,
    userId: null,
    user: null,
  }),
  useUser: () => ({
    isSignedIn: false,
    isLoaded: true,
    user: null,
  }),
  SignIn: () => <div data-testid="sign-in">Sign In Component</div>,
  SignUp: () => <div data-testid="sign-up">Sign Up Component</div>,
  UserButton: () => <div data-testid="user-button">User Button</div>,
  auth: () => Promise.resolve({ userId: null }),
  currentUser: () => Promise.resolve(null),
  clerkClient: {
    users: {
      getUser: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'test_publishable_key'
process.env.CLERK_SECRET_KEY = 'test_secret_key'
