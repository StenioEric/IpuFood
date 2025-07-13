// 🔥 FIREBASE CONFIGURAÇÃO - EXEMPLO
// 
// 1. Vá para https://console.firebase.google.com/
// 2. Crie um novo projeto ou use um existente
// 3. Adicione um app web ao projeto
// 4. Copie as credenciais abaixo e substitua no arquivo services/firebase.ts
//
// ⚠️ IMPORTANTE: Nunca commite suas credenciais reais no Git!
// Use variáveis de ambiente ou arquivos .env

const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "ipufood-2d025",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};

// 🔧 CONFIGURAÇÕES NECESSÁRIAS NO FIREBASE:

// 1. AUTENTICAÇÃO:
//    - Vá para Authentication > Sign-in method
//    - Habilite "Email/Password"
//    - Opcional: Configure outros métodos (Google, Facebook, etc.)

// 2. FIRESTORE:
//    - Vá para Firestore Database
//    - Crie um banco de dados em modo de teste
//    - Configure as regras de segurança:

/*
// Regras de segurança do Firestore (exemplo básico)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Pedidos: usuários veem apenas os seus, admins veem todos
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null;
    }
  }
}
*/

// 3. ESTRUTURA DO BANCO:
/*
Coleção: users
  Documento: {userId}
    - name: string
    - email: string
    - role: 'admin' | 'user'
    - phone: string
    - address: string

Coleção: orders
  Documento: {orderId}
    - userId: string
    - userName: string
    - items: array
    - total: number
    - status: string
    - paymentMethod: string
    - createdAt: timestamp
    - deliveredAt: timestamp (opcional)
*/

module.exports = firebaseConfig; 