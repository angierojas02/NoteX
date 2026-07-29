import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


export function Navbar () {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        if (logout) {
            await logout()
        }
        navigate('/login')
    }

    return (
    
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-4 md:px-8 bg-slate-600 text-white font-raleway font-medium text-sm md:text-base">
            <div className="font-bold text-xl text-center md:text-left w-full md:w-auto">
                <Link to="/dashboard">NoteX</Link>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full md:w-auto">
                <Link 
                to="/dashboard" 
                className="bg-slate-700 hover:bg-slate-800 transition-colors px-3 py-1.5 rounded-lg text-center whitespace-nowrap"
                >
                Mis notas
                </Link>
                
                {user?.role === 'Admin' && (
                <Link 
                    to="/admin" 
                    className="bg-slate-700 hover:bg-slate-800 transition-colors px-3 py-1.5 rounded-lg text-center whitespace-nowrap"
                >
                    Panel de usuarios
                </Link>
                )}
            </nav>
            <div className="flex items-center justify-center md:justify-end gap-3 text-xs md:text-sm w-full md:w-auto pt-2 md:pt-0 border-t border-slate-500/50 md:border-none">
                <span>
                Hola, <strong className="font-bold">{user?.username || 'Usuario'}</strong>
                </span>
                
                <button 
                className="bg-red-500/80 hover:bg-red-600 transition-colors px-3 py-1.5 rounded-lg font-semibold cursor-pointer whitespace-nowrap" 
                onClick={handleLogout}
                >
                Cerrar sesión
                </button>
            </div>
    </header>
    )
}