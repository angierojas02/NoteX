import { useEffect, useState } from "react"

export function TaskForm ({addNewTask, taskToEdit, onUpdateTask}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("Media")

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title)
            setDescription(taskToEdit.description)
            setPriority(taskToEdit.priority)
        }
    },[taskToEdit])

    const handleSubmit = (e) => {
        e.preventDefault()

        const taskData = {
            title,
            description,
            priority,
            status: 'Pendiente'
        }

        if (taskToEdit) {
            
            onUpdateTask(taskToEdit.id, taskData)
        } else {
            
            addNewTask(taskData)
        }

        // Al final limpiamos los inputs de texto
        setTitle("")
        setDescription("")
        setPriority("Media")
    }

    return (
        <div className="text-white font-raleway">
            <h2 className="text-center mb-2 font-black text-2xl">Ingrese una nueva tarea</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"/>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="" id="" className="bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"></textarea>
                
                <select className="bg-slate-950 border border-slate-800 text-white p-3 rounded-xl cursor-pointer" onChange={(e) => setPriority(e.target.value)} value={priority} id="status" name="priority">
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <button className="bg-slate-800 font-semibold text-white py-1.5 rounded-xl border-3 border-transparent hover:border-blue-950 transition-all duration-300 mt-2 " type="submit">{taskToEdit ? "Guardar cambios" : "Agregar"}</button>
            </form>
        </div>
    )
}