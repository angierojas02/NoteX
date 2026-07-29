import { Target } from '../components/Target'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks.js'

function Dashboard () {
  
    const {
      tasks,
      taskToEdit,
      setTaskToEdit,
      addTask,
      deleteTask,
      modifyTask,
      updateExistingTask
    } = useTasks()

    return (
    <div className='bg-slate-900 min-h-screen flex flex-col items-center p-4 md:p-6'>
    
    {/* Formulario para añadir tareas */}
    <TaskForm addNewTask={addTask} taskToEdit={taskToEdit} onUpdateTask={updateExistingTask}/>
    
    
    <div className='w-full flex flex-col md:flex-row md:justify-center md:items-start gap-4 md:gap-6 font-raleway mt-6'>
      
      {/* 1. COLUMNA: PENDIENTE */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-red-700/50 mb-3'>
          <h2 className='text-red-500 font-semibold p-2 text-center text-lg'>Pendiente</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {tasks
            .filter(tsk => tsk.status === "Pendiente")
            .map(tsk => (
              <Target 
                key={tsk._id || tsk.id}
                {...tsk}
                onDelete={() => deleteTask(tsk._id || tsk.id)}
                onModify={modifyTask}
                onSelectEdit={() => setTaskToEdit(tsk)}
              />
            ))}
        </div>
      </div>

      {/* 2. COLUMNA: EN PROCESO */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-yellow-500/50 mb-3'>
          <h2 className='text-yellow-400 font-semibold p-2 text-center text-lg'>En proceso</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {tasks
            .filter(tsk => tsk.status === "En proceso")
            .map(tsk => (
              <Target 
                key={tsk._id || tsk.id}
                {...tsk}
                onDelete={() => deleteTask(tsk._id || tsk.id)}
                onModify={modifyTask}
                onSelectEdit={() => setTaskToEdit(tsk)}
              />
            ))}
        </div>
      </div>

      {/* 3. COLUMNA: COMPLETADA */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-green-500/50 mb-3'>
          <h2 className='text-green-500 font-semibold p-2 text-center text-lg'>Completada</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {tasks
            .filter(tsk => tsk.status === "Completada")
            .map(tsk => (
              <Target 
                key={tsk._id || tsk.id}
                {...tsk}
                onDelete={() => deleteTask(tsk._id || tsk.id)}
                onModify={modifyTask}
              />
            ))}
        </div>
      </div>

    </div>
  </div>
)
}

export default Dashboard