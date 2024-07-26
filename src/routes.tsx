import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/pages/_layouts/app'
import { AuthLayout } from './components/pages/_layouts/auth'
import { Dashboard } from './components/pages/app/dashboard'
import { SingIn } from './components/pages/auth/sigin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sigin',
        element: <SingIn />,
      },
    ],
  },
])
