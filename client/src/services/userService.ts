import api from './apiService';
import { User } from '@/types/User';

const RESOURCE = 'personal';
const SECTOR = 1000;

export const fetchAllUsers = async () => {
    const res = await api.get<User[]>(`${RESOURCE}?sector=${SECTOR}&_sort=id&_order=desc`);
    return res.data;
};

// Crear usuario 
export const createUser = async (nuevo: Omit<User, 'id'>): Promise<User> => {
    const [ultimo] = await fetchAllUsers();
    const nuevoId = ultimo ? ultimo.id + 1 : 1;

    const res = await api.post<User>(RESOURCE, {
        id: nuevoId,
        ...nuevo
    });
    return res.data;
};

// Actualizar usuario 
export const updateUser = (id: number | string, user: Partial<User>) =>
    api.put<User>(`${RESOURCE}/${id}`, user);

// Eliminar usuario
export const deleteUser = (id: number | string) =>
    api.delete(`${RESOURCE}/${id}`);