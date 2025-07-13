import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: 'credit' | 'pix' | 'cash';
  createdAt: Date;
  deliveredAt?: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export const orderService = {
  // Criar novo pedido
  async createOrder(order: Omit<Order, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Buscar pedidos do usuário
  async getUserOrders(userId: string): Promise<Order[]> {
    console.log('🔍 orderService: Buscando pedidos para userId:', userId);
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    console.log('📦 orderService: Encontrados', snapshot.docs.length, 'pedidos');
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      deliveredAt: doc.data().deliveredAt?.toDate()
    })) as Order[];
    console.log('📋 orderService: Pedidos processados:', orders);
    return orders;
  },

  // Buscar todos os pedidos (admin)
  async getAllOrders(): Promise<Order[]> {
    const snapshot = await getDocs(collection(db, 'orders'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      deliveredAt: doc.data().deliveredAt?.toDate()
    })) as Order[];
  },

  // Atualizar status do pedido
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const updateData: any = { status };
    
    if (status === 'delivered') {
      updateData.deliveredAt = Timestamp.now();
    }
    
    await updateDoc(doc(db, 'orders', orderId), updateData);
  },

  // Buscar pedidos por status
  async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    const q = query(
      collection(db, 'orders'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      deliveredAt: doc.data().deliveredAt?.toDate()
    })) as Order[];
  }
}; 