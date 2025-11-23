const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST /api/feedback
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
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/feedback
router.get('/api/feedback', async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find().sort({ createdAt: -1 }).select('name email message createdAt -_id');
        return res.status(200).json(allFeedbacks);
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
