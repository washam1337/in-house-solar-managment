import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertTriangle, DollarSign, Users, Package, CheckCircle } from 'lucide-react';
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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            {/* Priority Alerts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {unpaidClients.length > 0 && (
                    <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unpaid Deposits</CardTitle>
                            <DollarSign className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{unpaidClients.length}</div>
                            <p className="text-xs text-muted-foreground">Clients owe payments</p>
                        </CardContent>
                    </Card>
                )}
                {lowStockItems.length > 0 && (
                    <Card className="border-l-4 border-l-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                            <Package className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{lowStockItems.length}</div>
                            <p className="text-xs text-muted-foreground">Items below minimum</p>
                        </CardContent>
                    </Card>
                )}
                {absentStaffOnJob.length > 0 && (
                    <Card className="border-l-4 border-l-destructive">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Roster Conflicts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{absentStaffOnJob.length}</div>
                            <p className="text-xs text-muted-foreground">Absent staff assigned to jobs</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Financial Snapshot (Admin Only) */}
            {userRole === 'admin' && (
                <>
                    <h2 className="text-xl font-semibold mt-8">Financial Snapshot</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                                <p className="text-xs text-muted-foreground">Projected from all jobs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Collected</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
                                <p className="text-xs text-muted-foreground">Cash in bank</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(outstanding)}</div>
                                <p className="text-xs text-muted-foreground">Pending collections</p>
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}

            {/* Quick Stats */}
            <h2 className="text-xl font-semibold mt-8">Quick Stats</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeProjects}</div>
                        <p className="text-xs text-muted-foreground">Currently installing</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Staff Absent</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{absentStaffCount}</div>
                        <p className="text-xs text-muted-foreground">Today</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
