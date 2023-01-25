import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/authContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/protectedRoute';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noAuthProtected = ['/login', '/signup']

  return (
    <AuthContextProvider>
    {noAuthProtected.includes(router.pathname) ? (
      <Component {...pageProps} />
    ) : (
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    )
    }
    </AuthContextProvider>
  )
}
