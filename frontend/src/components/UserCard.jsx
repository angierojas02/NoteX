import { useState } from "react";
import { FaCircleUser, FaDeleteLeft, FaPenToSquare, FaFloppyDisk, FaBan } from "react-icons/fa6";

function UserCard({ id, _id, username, email, role, onUpdateUser, onDeleteUser }) {
  const userId = id || _id
  const [isEditing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ username, email, role })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await onUpdateUser(userId, formData)
    if (result?.success) {
      setEditing(false)
    }
  }


  return (
    <div className="font-raleway">
      <div className="bg-white font-raleway rounded overflow-hidden w-full max-w-sm mx-auto">
        <div className="flex items-center gap-1.5 bg-slate-200 py-2.5 px-1.5">
          <FaCircleUser size={30} className="text-slate-800" />
          <h2><strong>{username}</strong></h2>
        </div>
        <div className="text-gray-600 px-2 py-4">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Rol:</strong> {role}</p>
        </div>
        <div className="flex justify-between mt-1 text-white font-semibold overflow-hidden">
          <button
            onClick={() => setEditing(true)}
            className="bg-green-800 rounded-bl flex flex-1 items-center justify-center gap-2 px-1.5 py-2 cursor-pointer text-white"
          >
            <FaPenToSquare size={20} />
            <span>Editar</span>
          </button>
          <button
            onClick={() => onDeleteUser(userId)}
            className="bg-red-800 rounded-br flex flex-1 items-center justify-center gap-2 px-1.5 py-2 cursor-pointer text-white"
          >
            <FaDeleteLeft size={20} />
            <span>Eliminar</span>
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-90 shadow-xl text-slate-800">
            <h2 className="font-bold mb-3">Editar usuario</h2>
            <form onSubmit={handleSubmit}>
              <label className="font-medium block text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
              />

              <label className="font-medium block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
              />

              <label className="font-medium block text-sm">Rol</label>
              <select
                value={formData.role}
                name="role"
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="flex justify-between mt-1 text-white font-semibold overflow-hidden gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({ username, email, role }); // Restaura los datos
                    setEditing(false);
                  }}
                  className="bg-gray-700 rounded-bl flex flex-1 items-center justify-center px-1.5 py-2 gap-1.5 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <FaBan size={20} />
                  <span>Cancelar</span>
                </button>

                <button
                  type="submit"
                  className="bg-blue-800 rounded-br flex flex-1 items-center justify-center px-1.5 py-2 gap-1.5 cursor-pointer hover:bg-blue-900 transition-colors"
                >
                  <FaFloppyDisk size={20} />
                  <span>Guardar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;