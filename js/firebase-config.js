/**
 * Firebase Configuration
 * KaiNow Saúde - Sistema de Afiliados
 */

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxYZ1234567890abcdefghijklmnop",
    authDomain: "kainow-saude.firebaseapp.com",
    projectId: "kainow-saude",
    storageBucket: "kainow-saude.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências
const auth = firebase.auth();
const db = firebase.firestore();

// Exportar para uso global
window.firebaseAuth = auth;
window.firebaseDB = db;

console.log('🔥 Firebase inicializado com sucesso!');
