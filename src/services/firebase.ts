import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase - Substitua pelas suas credenciais
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

// Exportar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 