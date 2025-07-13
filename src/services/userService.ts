import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types';

export const userService = {
  // Criar novo usuário
  async createUser(userId: string, userData: User): Promise<void> {
    await setDoc(doc(db, 'users', userId), userData);
  },

  // Buscar usuário por ID
  async getUserById(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  },

  // Atualizar usuário
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    await updateDoc(doc(db, 'users', userId), userData);
  },

  // Buscar usuários por role (para admin)
  async getUsersByRole(role: 'admin' | 'user'): Promise<User[]> {
    const q = query(collection(db, 'users'), where('role', '==', role));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  }
}; 