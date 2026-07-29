export const Input = ({type, name, value, placeholder, onChange, label, icon : Icon}) => {
    
    return (
        <div className="flex flex-col gap-3 font-raleway">  
            <div>
                {label && (
                    <div className="flex items-center gap-1 mb-2">
                        { Icon && <Icon className="text-slate-600 text-lg"/> }
                        <label className="text-lg font-bold text-slate-700" htmlFor="{name}">{label}</label>
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full px-6 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
            </div>
        </div>
        
    )
}