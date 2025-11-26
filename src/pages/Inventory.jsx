import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const Inventory = () => {
    const { inventory, updateInventoryStock, addInventoryItem, deleteInventoryItem } = useData();
    const { userRole } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        stock: 0,
        minStock: 0,
        unitPrice: 0,
        status: 'Good',
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Good': return 'success';
            case 'Low': return 'warning';
            case 'Critical': return 'destructive';
            default: return 'default';
        }
    };

    const handleOpenModal = () => {
        setFormData({
            name: '',
            category: '',
            stock: 0,
            minStock: 0,
            unitPrice: 0,
            status: 'Good',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addInventoryItem({
            ...formData,
            stock: Number(formData.stock),
            minStock: Number(formData.minStock),
            unitPrice: Number(formData.unitPrice),
        });
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteInventoryItem(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Inventory Hub</h1>
                {userRole === 'admin' && (
                    <Button onClick={handleOpenModal}>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                )}
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Item Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Unit Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock Level</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {inventory.map((item) => (
                                <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{item.name}</td>
                                    <td className="p-4 align-middle">{item.category}</td>
                                    <td className="p-4 align-middle">{formatCurrency(item.unitPrice)}</td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 text-center">{item.stock}</span>
                                            <span className="text-xs text-muted-foreground">/ Min: {item.minStock}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateInventoryStock(item.id, item.stock - 1)}
                                                disabled={item.stock <= 0}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateInventoryStock(item.id, item.stock + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            {userRole === 'admin' && (
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8 ml-2"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Inventory Item"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Item Name</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Unit Price ($)</label>
                            <Input
                                type="number"
                                required
                                value={formData.unitPrice}
                                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Initial Stock</label>
                            <Input
                                type="number"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Min Stock Level</label>
                        <Input
                            type="number"
                            required
                            value={formData.minStock}
                            onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className="w-full">Add Item</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Inventory;
