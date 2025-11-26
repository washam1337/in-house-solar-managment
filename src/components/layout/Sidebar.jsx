import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, UserCheck, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const Sidebar = () => {
    const { userRole, logout } = useAuth();

    const links = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'staff'] },
        { to: '/clients', icon: Users, label: 'Clients', roles: ['admin', 'staff'] },
        { to: '/inventory', icon: Package, label: 'Inventory', roles: ['admin', 'staff'] },
        { to: '/team', icon: UserCheck, label: 'Team & Roster', roles: ['admin', 'staff'] },
        // { to: '/settings', icon: Settings, label: 'Settings', roles: ['admin'] },
    ];

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl text-white">
            <div className="flex h-16 items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">ESS Core</h1>
                </div>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {links.map((link) => (
                    (link.roles.includes(userRole) || !userRole) && (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )
                            }
                        >
                            <link.icon className={cn("h-5 w-5", ({ isActive }) => isActive ? "text-primary" : "text-muted-foreground")} />
                            {link.label}
                        </NavLink>
                    )
                ))}
            </nav>
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive hover:border hover:border-destructive/20"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export { Sidebar };
