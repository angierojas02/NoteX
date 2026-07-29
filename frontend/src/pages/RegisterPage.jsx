import { useState } from "react"
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Input } from "../components/UI/Input"
import { useAuth } from "../context/authContext"
import Background from "../components/UI/Background"
import  TargetAuth  from "../components/UI/TargetAuth.jsx"
import { Link } from "react-router-dom"


function RegisterPage () {

    const { register, error, setError } = useAuth()

    const initialState = {email: '', username: '', password: ''}

    const [ formData, setFormData ] = useState(initialState)
    
        const handleChange = (e) => {
            const { name, value } = e.target
            setFormData(prev => ({...prev, [name]:  value}))
            if(error) setError(null)
        }

        const handleSubmit = async (e) => {
           e.preventDefault()
            //console.log(formData)
            const result = await register(formData)

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
                <h2 className="font-medium text-center text-xl mb-6 text-slate-800">Regístrate</h2>
                 <form onSubmit={handleSubmit}>
                    <div className="mb-3.5">
                    <Input
                        label="Correo electrónico"
                        icon={MdEmail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        />
                    </div>
                    <div className="mb-3.5">
                        <Input
                        label="Usuario"
                        icon={FaCircleUser}
                        type="text"
                        name="username"
                        value={formData.username}
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
                        placeholder="****************"
                        />
                    </div>
                    
                    {error && <div className="text-red-500 mb-2">{typeof error === 'object' ? (error.message || 'Error de registro '): error}</div>}
                    <button type="submit" className="w-full rounded-md bg-slate-600 p-1.5 text-white font-semibold hover:bg-slate-700"> Crear cuenta </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        ¿Ya tienes una cuenta? {" "}
                        <Link
                        to="/login"
                        className="text-blue-700 font-semibold hover:underline">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
                
            </TargetAuth>
        </Background>
    )
}

export default RegisterPage