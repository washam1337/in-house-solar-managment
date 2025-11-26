import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [clients, setClients] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsSnap = await getDocs(collection(db, "clients"));
                setClients(clientsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));

                const inventorySnap = await getDocs(collection(db, "inventory"));
                setInventory(inventorySnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));

                const staffSnap = await getDocs(collection(db, "staff"));
                setStaff(staffSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // --- CLIENTS ---
    const addClient = async (clientData) => {
        try {
            const docRef = await addDoc(collection(db, "clients"), clientData);
            setClients(prev => [...prev, { ...clientData, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    const updateClient = async (id, data) => {
        await updateDoc(doc(db, "clients", id), data);
        setClients(clients.map(client => client.id === id ? { ...client, ...data } : client));
    };

    // --- INVENTORY ---
    const addInventoryItem = async (itemData) => {
        try {
            const docRef = await addDoc(collection(db, "inventory"), itemData);
            setInventory(prev => [...prev, { ...itemData, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding inventory:", error);
        }
    };

    const updateInventoryStock = async (id, newStock) => {
        // Find current item to calculate status
        const currentItem = inventory.find(i => i.id === id);
        const status = newStock <= 0 ? 'Critical' : newStock <= currentItem.minStock ? 'Low' : 'Good';

        await updateDoc(doc(db, "inventory", id), { stock: newStock, status });
        setInventory(inventory.map(item => item.id === id ? { ...item, stock: newStock, status } : item));
    };

    const deleteInventoryItem = async (id) => {
        await deleteDoc(doc(db, "inventory", id));
        setInventory(inventory.filter(item => item.id !== id));
    };

    // --- STAFF ---
    const addStaff = async (staffData) => {
        try {
            const docRef = await addDoc(collection(db, "staff"), staffData);
            setStaff(prev => [...prev, { ...staffData, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    };

    const updateStaff = async (id, data) => {
        await updateDoc(doc(db, "staff", id), data);
        setStaff(staff.map(s => s.id === id ? { ...s, ...data } : s));
    };

    const deleteStaff = async (id) => {
        await deleteDoc(doc(db, "staff", id));
        setStaff(staff.filter(s => s.id !== id));
    };

    const value = {
        clients,
        inventory,
        staff,
        addClient,
        updateClient,
        addInventoryItem,
        updateInventoryStock,
        deleteInventoryItem,
        addStaff,
        updateStaff,
        deleteStaff,
        loading
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}
