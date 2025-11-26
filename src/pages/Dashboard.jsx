import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, DollarSign, Users, Package, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const Dashboard = () => {
    const { userRole } = useAuth();
    const { clients, inventory, staff } = useData();

    // Logic for Priority Alerts
    const unpaidClients = clients.filter(c => c.paidAmount < c.totalValue);
    const lowStockItems = inventory.filter(i => i.stock <= i.minStock);
    const absentStaffOnJob = staff.filter(s => s.isAbsent && s.currentJob !== 'N/A');

    // Stats
    const totalRevenue = clients.reduce((acc, curr) => acc + curr.totalValue, 0);
    const totalPaid = clients.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const outstanding = totalRevenue - totalPaid;
    const activeProjects = clients.filter(c => c.status === 'Installation').length;
    const absentStaffCount = staff.filter(s => s.isAbsent).length;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your energy solutions business.</p>
            </div>

            {/* Priority Alerts Section */}
            {(unpaidClients.length > 0 || lowStockItems.length > 0 || absentStaffOnJob.length > 0) && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {unpaidClients.length > 0 && (
                        <Card className="border-l-4 border-l-yellow-500 bg-yellow-500/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-0">
                                <CardTitle className="text-base font-semibold text-yellow-500">Unpaid Deposits</CardTitle>
                                <div className="p-2 rounded-full bg-yellow-500/20">
                                    <DollarSign className="h-5 w-5 text-yellow-500" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{unpaidClients.length}</div>
                                <p className="text-sm text-muted-foreground mt-1">Clients owe payments</p>
                            </CardContent>
                        </Card>
                    )}
                    {lowStockItems.length > 0 && (
                        <Card className="border-l-4 border-l-red-500 bg-red-500/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-0">
                                <CardTitle className="text-base font-semibold text-red-500">Low Stock Alerts</CardTitle>
                                <div className="p-2 rounded-full bg-red-500/20">
                                    <Package className="h-5 w-5 text-red-500" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{lowStockItems.length}</div>
                                <p className="text-sm text-muted-foreground mt-1">Items below minimum</p>
                            </CardContent>
                        </Card>
                    )}
                    {absentStaffOnJob.length > 0 && (
                        <Card className="border-l-4 border-l-destructive bg-destructive/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-0">
                                <CardTitle className="text-base font-semibold text-destructive">Roster Conflicts</CardTitle>
                                <div className="p-2 rounded-full bg-destructive/20">
                                    <AlertTriangle className="h-5 w-5 text-destructive" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">{absentStaffOnJob.length}</div>
                                <p className="text-sm text-muted-foreground mt-1">Absent staff assigned to jobs</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Financial Snapshot (Admin Only) */}
            {userRole === 'admin' && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold text-white">Financial Snapshot</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-white/5">
                                <CardTitle className="text-sm font-medium text-primary-100">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
                                <p className="text-xs text-primary-200/70 mt-1">Projected from all jobs</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-white/5">
                                <CardTitle className="text-sm font-medium text-secondary-100">Collected</CardTitle>
                                <CheckCircle className="h-4 w-4 text-secondary" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-white">{formatCurrency(totalPaid)}</div>
                                <p className="text-xs text-secondary-200/70 mt-1">Cash in bank</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-white/5">
                                <CardTitle className="text-sm font-medium text-orange-100">Outstanding</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-white">{formatCurrency(outstanding)}</div>
                                <p className="text-xs text-orange-200/70 mt-1">Pending collections</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{activeProjects}</div>
                            <p className="text-xs text-muted-foreground mt-1">Currently installing</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Staff Absent</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{absentStaffCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Today</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
