import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

const Header = () => {
    const { currentUser, userRole } = useAuth();

    return (
        <header className="flex h-14 items-center justify-between border-b bg-card px-6">
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{currentUser?.email || 'User'}</span>
                    <Badge variant="outline" className="text-[10px] uppercase">{userRole || 'Guest'}</Badge>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {currentUser?.email?.[0].toUpperCase() || 'U'}
                </div>
            </div>
        </header>
    );
};

export { Header };
