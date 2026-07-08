import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const navigate = useNavigate();
    const links=[
        {name:"Dashboard",path:"/"},
        {name:"Analytics",path:"/analytics"},
        {name:"Budgets",path:"/budgets"},
        {name:"Settings",path:"/settings"}
    ]
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const user = JSON.parse(localStorage.getItem("user"));

    return(
                 <aside className="w-44 bg-white text-gray-900 min-h-screen p-4 flex flex-col border-r">
                        <div className="mb-6 flex items-center gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="text-lg font-medium cursor-pointer focus:outline-none"
                                aria-label="Go to Dashboard"
                            >
                                Expense
                            </button>
                            <div
                                className="ml-2 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700"
                                title={user?.name || 'User'}
                            >
                                {(() => {
                                    const name = user?.name || '';
                                    if (!name) return 'U';
                                    const parts = name.trim().split(/\s+/);
                                    const initials = (parts[0][0] || '') + (parts[1] ? parts[1][0] : '');
                                    return initials.toUpperCase();
                                })()}
                            </div>
                        </div>
            <nav className="flex-1 space-y-1">
                {links.map((link)=>(
                    <NavLink 
                        key={link.path}
                        to={link.path}
                        className={({isActive})=>`block px-3 py-2 rounded text-sm ${
                            isActive?"text-gray-900 font-semibold":"text-gray-600 hover:text-gray-900"}`}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="btn-ghost w-full text-left"
                >
                    Logout
                </button>
            </div>
         </aside>
    )
}

export default Sidebar;