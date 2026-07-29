import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react"
import { Input } from "../components/UI/Input"
import { useAuth } from "../context/authContext"
import Background from "../components/UI/Background"
import  TargetAuth  from "../components/UI/TargetAuth.jsx"
import { Link, useNavigate } from "react-router-dom"



function LoginPage () {
    const { login, error, setError } = useAuth()
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    })
    const [ errorMsg, setErrorMsg ] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]:  value}))
        if(error) setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg("")

        const result = await login(formData)

        if (result.success) {
            setFormData({
            username:'',
            password:''
            })
        }
    }
    return (
        <Background>
            <TargetAuth>
                <h2 className="font-black text-3xl mb-3.5 text-center text-slate-800">NoteX</h2>
                <h2 className="font-medium text-center text-xl mb-6 text-slate-800">Inicia sesión</h2>

                {errorMsg && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm flex justify-between items-center">
                        <span>{errorMsg}</span>
                        <button
                            onClick={() => navigate('/register')} 
                            className="underline font-semibold ml-2 text-red-800 hover:text-red-950 ">
                            Registrarse
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3.5">
                        <Input
                        label="Usuario"
                        icon={FaCircleUser}
                        type="text"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        placeholder="usuario123"
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                        label="Contraseña"
                        icon={RiLockPasswordFill}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="***********"
                        />
                    </div>
                        {error && <p className="text-red-500 mb-2">{typeof error === 'object' ? (error.message || 'Error de autenticación '): error}</p>}
                        <button type="submit" className=" w-full rounded-md bg-slate-600 p-1.5 text-white font-semibold hover:bg-slate-700"> Iniciar sesión </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        ¿No tienes cuenta aún? {" "}
                        <Link
                        to="/register"
                        className="text-blue-700 font-semibold hover:underline">
                            Crea una cuenta aquí
                        </Link>
                    </p>
                </div>
            </TargetAuth>
        </Background>
    )
}

export default LoginPage