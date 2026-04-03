import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { setAuthSession } from '../utils/auth';

type LoginResponse = {
    success: boolean;
    message?: string;
    data?: {
        token: string;
        user: {
            id: string;
            email: string;
            role: 'admin' | 'seo';
        };
    };
};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = (await response.json()) as LoginResponse;

            if (!response.ok || !result.success || !result.data) {
                throw new Error(result.message || 'Invalid credentials');
            }

            setAuthSession(result.data.token, result.data.user);
            toast.success('Login successful');

            navigate(result.data.user.role === 'seo' ? '/seo/dashboard' : '/', { replace: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to login';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel Login</h1>
                <p className="text-sm text-gray-500 mt-1">Sign in with your admin credentials.</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@admin.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
