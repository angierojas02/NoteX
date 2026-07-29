import { ImSpinner6 } from "react-icons/im";

export const Spinner = () => {
    return (
        <div className="flex items-center gap-2 text-blue-600">
            <ImSpinner6 className="animate-spin text-2xl" />
            <span>Cargando...</span>
        </div>
    )
}