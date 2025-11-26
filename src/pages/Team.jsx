import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { User, MapPin, AlertTriangle, Plus, Trash2, Edit2 } from 'lucide-react';

const Team = () => {
    const { staff, addStaff, updateStaff, deleteStaff } = useData();
    const { userRole } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: 'Staff',
        isAbsent: false,
        currentJob: 'N/A',
    });

    const handleOpenModal = (member = null) => {
        if (member) {
            setCurrentStaff(member);
            setFormData(member);
        } else {
            setCurrentStaff(null);
            setFormData({
                name: '',
                role: 'Staff',
                isAbsent: false,
                currentJob: 'N/A',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStaff) {
            updateStaff(currentStaff.id, formData);
        } else {
            addStaff(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            deleteStaff(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Team & Roster</h1>
                {userRole === 'admin' && (
                    <Button onClick={() => handleOpenModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Staff
                    </Button>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {staff.map((member) => {
                    const hasConflict = member.isAbsent && member.currentJob !== 'N/A';

                    return (
                        <Card key={member.id} className={hasConflict ? 'border-destructive' : ''}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{member.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                                <Badge variant={member.isAbsent ? 'destructive' : 'success'}>
                                    {member.isAbsent ? 'Absent' : 'Active'}
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Current Job:</span>
                                    <span className="text-muted-foreground">{member.currentJob}</span>
                                </div>

                                {hasConflict && (
                                    <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span>Conflict: Absent but assigned to job!</span>
                                    </div>
                                )}

                                {userRole === 'admin' && (
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenModal(member)}>
                                            <Edit2 className="mr-2 h-3 w-3" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentStaff ? 'Edit Staff Member' : 'Add New Staff'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="Staff">Staff</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.isAbsent}
                                onChange={(e) => setFormData({ ...formData, isAbsent: e.target.value === 'true' })}
                            >
                                <option value="false">Active</option>
                                <option value="true">Absent</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Current Job (Location)</label>
                        <Input
                            required
                            value={formData.currentJob}
                            onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                            placeholder="e.g. 123 Sunny Ln or N/A"
                        />
                    </div>
                    <Button type="submit" className="w-full">Save Staff Member</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Team;
