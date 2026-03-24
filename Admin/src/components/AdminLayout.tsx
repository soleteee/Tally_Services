
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FilePlus, LogOut, Briefcase, Search } from 'lucide-react';
import { clearAuthSession, getCurrentRole } from '../utils/auth';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = getCurrentRole();
    const handleLogout = () => {
        clearAuthSession();
        navigate('/login', { replace: true });
    };


    const isActive = (path: string) => location.pathname === path || (path === '/seo/dashboard' && location.pathname.startsWith('/seo'));

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl z-10 flex flex-col">
                <div className="p-6 border-b flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {role === 'admin' && (
                        <>
                            <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <LayoutDashboard size={20} />
                                <span className="font-medium">Blog Management</span>
                            </Link>
                            <Link to="/add-blog" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/add-blog') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <FilePlus size={20} />
                                <span className="font-medium">Add New Blog</span>
                            </Link>
                            <Link to="/jobs" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/jobs') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <Briefcase size={20} />
                                <span className="font-medium">Job Management</span>
                            </Link>
                            <Link to="/poster-settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/poster-settings') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <FilePlus size={20} />
                                <span className="font-medium">Poster Popup</span>
                            </Link>
                        </>
                    )}

                    {role === 'seo' && (
                        <Link to="/seo/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/seo/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                            <Search size={20} />
                            <span className="font-medium">SEO Dashboard</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 sticky top-0 z-20 flex justify-end items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome, {role === 'seo' ? 'SEO User' : 'Admin'}</span>
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                            {/* Placeholder avatar */}
                            <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center font-bold">{role === 'seo' ? 'SEO' : 'AD'}</div>
                        </div>
                    </div>
                </header>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
