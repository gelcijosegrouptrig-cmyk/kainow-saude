const express = require('express');
const router = express.Router();
// TODO: Implementar middleware de autenticação

router.get('/me', (req, res) => {
    res.json({ message: 'Get user profile - TO BE IMPLEMENTED' });
});

router.put('/me', (req, res) => {
    res.json({ message: 'Update user profile - TO BE IMPLEMENTED' });
});

module.exports = router;
