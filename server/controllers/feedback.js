const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST /api/feedback - create one feedback
router.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'name, email and message are required' });
        }

        const fb = new Feedback({ name, email, message });
        await fb.save();
        return res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/feedback - get all feedbacks
router.get('/api/feedback', async (req, res) => {
    try {
        const all = await Feedback.find().sort({ createdAt: -1 }).select('name email message createdAt -_id');
        return res.json(all);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
