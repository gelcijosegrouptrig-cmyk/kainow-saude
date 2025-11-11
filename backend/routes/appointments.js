const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'List appointments - TO BE IMPLEMENTED' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Create appointment - TO BE IMPLEMENTED' });
});

module.exports = router;
