import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        }
    };

    // Demo helper
    const fillDemo = (role) => {
        if (role === 'admin') {
            setEmail('admin@ess.com');
            setPassword('password');
        } else {
            setEmail('staff@ess.com');
            setPassword('password');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-dark-950">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </div>

            <Card className="w-full max-w-md relative z-10 border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
                <CardHeader className="space-y-2 text-center pb-8 border-b border-white/5">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                            <path d="M12 2v8" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m8 22 4-10 4 10" />
                        </svg>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-white">
                        Welcome Back
                    </CardTitle>
                    <p className="text-muted-foreground">
                        Enter your credentials to access ESS Core
                    </p>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive flex items-center gap-2 animate-fade-in">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white placeholder:text-gray-500"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/20" variant="default">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-white/5 p-6 bg-black/20">
                    <p className="text-xs text-muted-foreground text-center uppercase tracking-wider font-semibold">Quick Access (Demo)</p>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white" onClick={() => fillDemo('admin')}>
                            Admin
                        </Button>
                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white" onClick={() => fillDemo('staff')}>
                            Staff
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
