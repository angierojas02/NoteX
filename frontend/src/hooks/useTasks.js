import { useState, useEffect } from "react"

const API_URL = 'http://localhost:3000/tasks'

export function useTasks () {
  const [tasks, setTasks] = useState([])
  const [taskToEdit, setTaskToEdit] = useState(null)

  const FETCH_OPTIONS = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  /* VISUALIZAR TODAS LAS TAREAS */
  useEffect(() => {

    const viewTasks = async () => {
      try {

        const res = await fetch(API_URL, {
          method: 'GET',
          credentials: 'include'
        })

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`)
        }

        const resultTask = await res.json()

        setTasks(resultTask.data || [])
      } catch (error) {

        console.error("Hubo un error al conectar con el backend", error)
      }
    }
    viewTasks()
  },[])

  /* AÑADIR NUEVA TAREA */
  const addTask = async (newTaskData) => {
    try {
      const response = await fetch(API_URL, {
        ...FETCH_OPTIONS,
        method: 'POST',
        body: JSON.stringify(newTaskData)
      })

      if (response.ok) {
          const createdTask = await response.json()
          setTasks(prevTasks => [...prevTasks, createdTask.data])
      }
      
    } catch (error) {
      console.error("Hubo un error al crear la tarea", error)
    }
  }

  /* ELIMINAR UNA TAREA */
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

     if (response.ok) {
        setTasks(prevTasks => prevTasks.filter(tsk => (tsk._id || tsk.id) !== id))
      }
    } catch (error) {
       console.error("Hubo un error al eliminar tarea", error)
    }
  }

  /* MODIFICAR EL ESTADO DE UNA TAREA */
  const modifyTask = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        ...FETCH_OPTIONS,
        method: "PATCH",
        body: JSON.stringify({ status: newStatus}) 
      })
      
      if (response.ok) {
      setTasks(prevTasks => prevTasks.map(tsk => {
        const taskId = tsk._id || tsk.id
        if (taskId === id) {
          return { ...tsk, status: newStatus }
        }
        return tsk
      }))
    }
    } catch (error) {
      console.error("Hubo un error al modificar la tarea", error)
    }
  }

  /* MODIFICAR UNA TAREA COMPLETA */

  const updateExistingTask = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        ...FETCH_OPTIONS,
        method: 'PUT',
        body: JSON.stringify(updatedData)
      })

      if(response.ok) {
        const taskFromServer = await response.json()

        setTasks(prevTasks => prevTasks.map(tsk => {
        const taskId = tsk._id || tsk.id
        return taskId === id ? (taskFromServer.data || taskFromServer) : tsk
      }))
        setTaskToEdit(null)
      }

    } catch (error) {
      console.error("Hubo un error al editar la tarea", error)
    }
  }
  return {
    tasks,
    taskToEdit,
    setTaskToEdit,
    addTask,
    deleteTask,
    modifyTask,
    updateExistingTask
  }
}