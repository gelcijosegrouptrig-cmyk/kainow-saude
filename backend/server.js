/**
 * KAINOW SAÚDE - API BACKEND
 * Servidor Express com webhook Woovi
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
try {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'kainowmedic-fa477'
    });
    console.log('✅ Firebase Admin inicializado');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
}

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Em produção, especifique o domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
});

// Routes
const webhookWoovi = require('./webhook-woovi');
app.use('/webhook', webhookWoovi);

// API Routes
const affiliatesRoutes = require('./routes/affiliates');
const subscriptionsRoutes = require('./routes/subscriptions');
const webhooksRoutes = require('./routes/webhooks');

app.use('/api/affiliates', affiliatesRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/webhooks', webhooksRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Kainow Saúde API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Status do sistema
app.get('/status', (req, res) => {
    res.json({
        server: 'running',
        firebase: admin.apps.length > 0 ? 'connected' : 'disconnected',
        woovi: process.env.WOOVI_APP_ID ? 'configured' : 'not configured',
        timestamp: new Date().toISOString()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        method: req.method
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Kainow Saúde API`);
    console.log(`📍 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔥 Firebase: ${admin.apps.length > 0 ? 'Connected' : 'Disconnected'}`);
    console.log(`💳 Woovi: ${process.env.WOOVI_APP_ID ? 'Configured' : 'Not configured'}`);
    console.log(`\n✅ Ready to receive webhooks!\n`);
});

module.exports = app;