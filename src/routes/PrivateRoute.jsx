
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
