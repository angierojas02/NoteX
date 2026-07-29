import { Navbar } from "../components/Navbar"
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}