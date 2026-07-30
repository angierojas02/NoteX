
export const apiClient = async (endpoint, options = {}) => {

    const BASE_URL = import.meta.env.VITE_API_URL
    const API_USERS = `${BASE_URL}/users`

    const defaultHeaders = {
        'Content-type':'application/json',
    }

    const config = {
        credentials: 'include',
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        }
    }

    try {
        const response = await fetch(`${API_USERS}${endpoint}`,config)

        const isJson = response.headers.get('content-type')?.includes('application/json')
                const data = isJson ? await response.json() : null

                if (!response.ok) {
                    const errorMessage = 
                    data?.error?.message ||
                    data?.message ||
                    `Server error (${response.status})`

                    const error = new Error(errorMessage)
                    error.status = response.status
                    error.details = data
                    throw error
                }
            return data
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    console.error('Red error ', error)
                    throw new Error('Could not connect to the server. Check your internet connection.', {cause: error})
        }
        console.error('Login error ', error)
        throw error 
    }
}