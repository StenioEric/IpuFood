// 🔥 SCRIPT PARA POPULAR O BANCO COM DADOS DE EXEMPLO
// 
// Execute este script após configurar o Firebase para criar dados iniciais
// 
// Como usar:
// 1. Configure o Firebase abaixo com suas credenciais
// 2. Execute: node scripts/seedDatabase.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, collection, addDoc, Timestamp } = require('firebase/firestore');

// 🔥 COLE SUAS CREDENCIAIS DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyCPbMQ9LZH05ykcnI4Gn_PumJrrZaRtk_g",
  authDomain: "ipufood-2d025.firebaseapp.com",
  projectId: "ipufood-2d025",
  storageBucket: "ipufood-2d025.firebasestorage.app",
  messagingSenderId: "319742911393",
  appId: "1:319742911393:web:99a056207399a946a1a1e0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // 1. Criar usuário admin
    console.log('👤 Criando usuário admin...');
    const adminUser = await createUserWithEmailAndPassword(
      auth, 
      'admin@ipufood.com', 
      'admin123'
    );

    await setDoc(doc(db, 'users', adminUser.user.uid), {
      name: 'Administrador',
      email: 'admin@ipufood.com',
      role: 'admin',
      phone: '(11) 99999-9999',
      address: 'Rua Admin, 123 - São Paulo, SP',
    });

    // 2. Criar usuário cliente
    console.log('👤 Criando usuário cliente...');
    const clientUser = await createUserWithEmailAndPassword(
      auth, 
      'cliente@ipufood.com', 
      'cliente123'
    );

    await setDoc(doc(db, 'users', clientUser.user.uid), {
      name: 'João Silva',
      email: 'cliente@ipufood.com',
      role: 'user',
      phone: '(11) 88888-8888',
      address: 'Rua Cliente, 456 - São Paulo, SP',
    });

    // 3. Criar pedidos de exemplo
    console.log('📦 Criando pedidos de exemplo...');
    
    const orders = [
      {
        userId: clientUser.user.uid,
        userName: 'João Silva',
        items: [
          {
            id: '1',
            productId: '1',
            productName: 'X-Burger',
            quantity: 2,
            price: 15.00,
            total: 30.00
          },
          {
            id: '2',
            productId: '2',
            productName: 'Batata Frita',
            quantity: 1,
            price: 12.00,
            total: 12.00
          }
        ],
        total: 42.00,
        status: 'delivered',
        paymentMethod: 'credit',
        createdAt: Timestamp.fromDate(new Date('2024-01-15')),
        deliveredAt: Timestamp.fromDate(new Date('2024-01-15T12:30:00')),
      },
      {
        userId: clientUser.user.uid,
        userName: 'João Silva',
        items: [
          {
            id: '3',
            productId: '3',
            productName: 'Pizza Margherita',
            quantity: 1,
            price: 25.00,
            total: 25.00
          },
          {
            id: '4',
            productId: '4',
            productName: 'Refrigerante',
            quantity: 2,
            price: 8.00,
            total: 16.00
          }
        ],
        total: 41.00,
        status: 'pending',
        paymentMethod: 'pix',
        createdAt: Timestamp.fromDate(new Date('2024-01-16')),
      },
      {
        userId: clientUser.user.uid,
        userName: 'João Silva',
        items: [
          {
            id: '5',
            productId: '5',
            productName: 'Sorvete',
            quantity: 3,
            price: 8.00,
            total: 24.00
          }
        ],
        total: 24.00,
        status: 'delivered',
        paymentMethod: 'cash',
        createdAt: Timestamp.fromDate(new Date('2024-01-14')),
        deliveredAt: Timestamp.fromDate(new Date('2024-01-14T15:45:00')),
      }
    ];

    for (const order of orders) {
      await addDoc(collection(db, 'orders'), order);
    }

    console.log('✅ Seed concluído com sucesso!');
    console.log('');
    console.log('📋 Credenciais de acesso:');
    console.log('👤 Admin: admin@ipufood.com / admin123');
    console.log('👤 Cliente: cliente@ipufood.com / cliente123');
    console.log('');
    console.log('🔗 Acesse o console do Firebase para ver os dados criados');

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    console.error('Detalhes do erro:', error.message);
  }
}

// Executar o seed
seedDatabase(); 