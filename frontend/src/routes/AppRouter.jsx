import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/DashboardNotes'
import AdminPage from '../pages/AdminPage' 
import { AdminRoute } from '../components/AdminRoute' 
import { AuthProvider } from '../context/authProvider'
import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    )
}

const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/login' replace/>
            },
            {
                path:'/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                element: <MainLayout/>,
                children: [
                    {
                        element: <ProtectedRoute/>,
                        children: [
                            {
                                path: '/dashboard',
                                element: <Dashboard/>
                            },
                            {
                                element: <AdminRoute/>,
                                    children: [
                                                {  
                                                    path: '/admin',
                                                    element: <AdminPage/>
                                                }
                                            ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}