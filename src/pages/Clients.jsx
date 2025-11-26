import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Plus, Search, Edit2 } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const Clients = () => {
    const { clients, addClient, updateClient } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        systemSize: '',
        totalValue: '',
        paidAmount: '',
        status: 'Lead',
        sentiment: 'Neutral',
    });

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (client = null) => {
        if (client) {
            setCurrentClient(client);
            setFormData(client);
        } else {
            setCurrentClient(null);
            setFormData({
                name: '',
                address: '',
                systemSize: '',
                totalValue: '',
                paidAmount: '',
                status: 'Lead',
                sentiment: 'Neutral',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            totalValue: Number(formData.totalValue),
            paidAmount: Number(formData.paidAmount)
        };

        if (currentClient) {
            updateClient(currentClient.id, dataToSave);
        } else {
            addClient(dataToSave);
        }
        setIsModalOpen(false);
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'Happy': return 'success';
            case 'Neutral': return 'secondary';
            case 'Risk: Cancel': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Client
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredClients.map((client) => (
                    <Card key={client.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-lg">{client.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{client.address}</p>
                            </div>
                            <Badge variant={getSentimentColor(client.sentiment)}>{client.sentiment}</Badge>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-medium">System Size</p>
                                    <p className="text-muted-foreground">{client.systemSize}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Status</p>
                                    <p className="text-muted-foreground">{client.status}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Payment Progress</span>
                                    <span>{Math.round((client.paidAmount / client.totalValue) * 100)}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-secondary/20">
                                    <div
                                        className="h-2 rounded-full bg-secondary transition-all"
                                        style={{ width: `${(client.paidAmount / client.totalValue) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Paid: {formatCurrency(client.paidAmount)}</span>
                                    <span>Total: {formatCurrency(client.totalValue)}</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" onClick={() => handleOpenModal(client)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentClient ? 'Edit Client' : 'Add New Client'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">System Size</label>
                            <Input
                                required
                                value={formData.systemSize}
                                onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Total Value ($)</label>
                            <Input
                                type="number"
                                required
                                value={formData.totalValue}
                                onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Paid Amount ($)</label>
                            <Input
                                type="number"
                                required
                                value={formData.paidAmount}
                                onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Lead">Lead</option>
                                <option value="Installation">Installation</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sentiment</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.sentiment}
                                onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
                            >
                                <option value="Happy">Happy</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Risk: Cancel">Risk: Cancel</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Save Client</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Clients;
