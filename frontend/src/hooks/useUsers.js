import { useState, useEffect } from "react"

const API_URL = 'http://localhost:3000/users'

export function useUsers () {
    const [users, setUsers ] = useState([])

    const FETCH_OPTIONS = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  useEffect(() => {
  
      const viewUsers = async () => {
        try {
  
          const res = await fetch(`${API_URL}/admin`, {
            method: 'GET',
            credentials: 'include'
          })
  
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`)
          }
  
          const resultTask = await res.json()
  
          setUsers(resultTask.data || [])
        } catch (error) {
  
          console.error("Hubo un error al conectar con el backend", error)
        }
      }
      viewUsers()
    },[])

    const deleteUser = async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        })

      if (response.ok) {
          setUsers(prevTasks => prevTasks.filter(usr => (usr._id || usr.id) !== id))
        }
      } catch (error) {
        console.error("Hubo un error al eliminar tarea", error)
      }
  }

  /* MODIFICAR EL ESTADO DE UNA TAREA */
  const modifyUsers = async (id, updateUsers) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        ...FETCH_OPTIONS,
        method: 'PUT',
        body: JSON.stringify(updateUsers)
      })

      if(response.ok) {
        const userFromServer = await response.json()
        const updatedUserData = userFromServer.data || userFromServer.user || userFromServer

        setUsers(prevUsers => prevUsers.map(usr => {
        const currentId = usr._id || usr.id

        if(String(currentId) === String(id)){
          return { ...usr, ...updatedUserData}
        }

        return usr
        
      }))
        return { success: true, data: updatedUserData }
      } else {
        return { success: false, message: 'Error en la petición' }
      }
    } catch (error) {
      console.error("Hubo un error al eliminar el usuario", error)
      return { success: false, error: error.message }
    }
  }



    return {
        users,
        modifyUsers,
        deleteUser
    }
}

