const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'List specialties - TO BE IMPLEMENTED' });
});

module.exports = router;
