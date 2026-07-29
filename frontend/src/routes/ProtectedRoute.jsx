import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Spinner } from '../components/UI/LoadingDesign'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  
  if (loading) {
    return <Spinner/>
  } 

  
  if (!user) {
    return <Navigate to="/login" replace />
  }

 
  return <Outlet />
}