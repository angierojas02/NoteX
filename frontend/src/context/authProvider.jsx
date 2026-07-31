import { AuthContext } from "./authContext"
import {useNavigate} from 'react-router-dom'
import { useState } from "react"
import { apiClient } from "../api/apiClient"
import { useEffect } from "react"

export const AuthProvider = ({ children }) => {
        const [ user, setUser ] = useState(null)
        const [ error, setError ] = useState(null)

        const navigate = useNavigate()

        const [loading, setLoading] = useState(true)


        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const data = await apiClient('/verify', {
                        method: 'GET'
                    })
                    if (data?.user) {
                        setUser(data.user)
                    }
                } catch (error) {
                    // setError(error)
                    setUser(null)
                } finally {
                    setLoading(false)
                }
            }

            checkAuth()
        }, [])

        const register = async (userData) => {

            if (!userData.email || !userData.password ) {
               const msg = 'Email and password required'
               setError(msg)
               return {success: false, error: msg}
            }

            try {
                const data = await apiClient('/register', {
                    method: 'POST',
                    body: JSON.stringify(userData)
                })

                if (data?.user) {
                    setUser(data.user)
                }
                navigate('/dashboard')

                return { success: true, data }
            } catch (err) {
                setError(err.message)
                return {success: false, error: err.message}
            } finally {
                setLoading(false)
            }
        }

        const login = async (userData) => {
            setError(null)
            if (!userData.username || !userData.password ) {
                const msg = 'Missing fields'
                setError(msg)
                return { success: false, error: msg }
            }
            try {
                const data = await apiClient('/login', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    credentials: 'include'
                })

                if (data?.user) {
                    setUser(data.user)
                }
                //console.log('Login successfully!',data)
                navigate('/dashboard')
                //return { success: true, data }
            } catch (err) {
                console.error('Error capturado API CLIENT: ', err.message)
                setError(err.message)
                return { success: false, error: err.message}
            }
        }


        const logout = async () => {
            try {
                await apiClient('/logout', {
                    method: 'POST',
                    credentials: 'include'
                })
            } catch (error) {
                console.log('ERROR - LOGOUT', error)
            } finally {
                setUser(null)
                setError(null)
                navigate('/login')
            }
        }

        return (
            <AuthContext.Provider value={{ user, error, loading, setError ,register, login, logout,  }}>
                {children}
            </AuthContext.Provider>
        )
}



