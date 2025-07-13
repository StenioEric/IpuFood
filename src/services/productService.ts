import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  available?: boolean;
}

export const productService = {
  // CREATE
  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
  },

  // READ ALL
  async getAllProducts(): Promise<Product[]> {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  },

  // READ ONE
  async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(db, 'products', productId);
    const productDoc = await getDoc(docRef);
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() } as Product;
    }
    return null;
  },

  // UPDATE
  async updateProduct(productId: string, data: Partial<Product>): Promise<void> {
    await updateDoc(doc(db, 'products', productId), data);
  },

  // DELETE
  async deleteProduct(productId: string): Promise<void> {
    await deleteDoc(doc(db, 'products', productId));
  }
}; 