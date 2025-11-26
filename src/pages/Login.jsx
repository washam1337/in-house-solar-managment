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
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl text-primary">ESS Core Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="rounded bg-destructive/15 p-2 text-sm text-destructive">{error}</div>}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t p-4">
                    <p className="text-xs text-muted-foreground">Demo Credentials:</p>
                    <div className="flex w-full gap-2">
                        <Button variant="outline" className="flex-1 text-xs" onClick={() => fillDemo('admin')}>Fill Admin</Button>
                        <Button variant="outline" className="flex-1 text-xs" onClick={() => fillDemo('staff')}>Fill Staff</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
