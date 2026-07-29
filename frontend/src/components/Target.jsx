 const colorPriority = {
        "Alta": "from-red-400 to-red-500", 
        "Media": "from-yellow-400 to-yellow-500", 
        "Baja": "from-green-400 to-green-500"
    }

    const colorStatus = {
        "Completada": "bg-green-500",
        "En proceso": "bg-yellow-500",
        "Pendiente": "bg-red-500"
    }

 export function Target ({_id, id, title, description, priority, status, onDelete, onModify, onSelectEdit}) {
    const taskId = _id || id
    let nextStatus = ""
    let buttonText = ""

    if(status === "Pendiente") {
        nextStatus = "En proceso"
        buttonText = "Empezar tarea"
    } else if (status === "En proceso") {
        nextStatus = "Completada"
        buttonText = "Terminar tarea"
    }

    return (
        <div className='shadow-2xl md:max-w-80 rounded-2xl max-w-72 m-2.5 bg-slate-800 overflow-hidden text-white'>
            <div className="p-3 flex flex-col gap-1">
                <h3 className="text-base mb-1 font-bold">{title.toUpperCase()}</h3>
                <p className="text-sm mb-1">{description}</p>
                {status !== "Completada" && (
                    <button onClick={() => onModify(taskId, nextStatus)}
                        className={`font-bold rounded-2xl ${colorStatus[status]}`}>
                        {buttonText}
                    </button>
                )}
                
                <p className={`text-xs pl-1 pr-1.5 w-fit text-white rounded-full text-center font-semibold border-2 border-transparent bg-clip-border bg-linear-to-r ${colorPriority[priority]}`}>{priority}</p>
                {/* {console.log(`id: ${taskId}, Nextstatus: ${nextStatus}`)} */}
            </div>
            <div className="border-t-2 border-slate-600/50 rounded-b-2xl flex justify-between">
                <button onClick={() => onDelete(taskId)} className="font-semibold flex-1 bg-slate-500/80 p-1">Eliminar</button>
                <button onClick={onSelectEdit} className="font-semibold flex-1 bg-slate-400">Editar</button>
            </div>
              
        </div>
    )
 }