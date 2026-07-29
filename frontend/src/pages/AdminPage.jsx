import  UserCard from '../components/UserCard'
import { useUsers } from '../hooks/useUsers'

function AdminPage () {
    const {
        users,
        modifyUsers,
        deleteUser
        } = useUsers()

    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4">
            {users 
            .map(usr => (
               <UserCard 
                key={usr.id || usr._id}
                {...usr}
                onUpdateUser={modifyUsers}
                onDeleteUser={deleteUser}
               /> 
            ))
            }
        </div>
    )
}

export default AdminPage