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
        <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4">
                <h1 className="text-lg font-bold text-primary">ESS Core</h1>
            </div>
            <nav className="flex-1 space-y-1 p-2">
                {links.map((link) => (
                    (link.roles.includes(userRole) || !userRole) && ( // Show all if role not loaded yet or matches
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )
                            }
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </NavLink>
                    )
                ))}
            </nav>
            <div className="border-t p-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export { Sidebar };
