const { Router } = require('express');
const router = Router();
const User = require("../models/users");

router.post("/api/register-user", async (req, res) => {
    try {
        const { userId, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.password === password) {
                return res.status(200).json({
                    message: "User logged in successfully",
                    data: {
                        userId: existingUser.userId,
                        email: existingUser.email
                    },
                    statusCode: 200
                });
            } else {
                return res.status(401).json({
                    message: "Incorrect password",
                    statusCode: 401
                });
            }
        }
        const user = new User({ userId, email, password });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            data: {
                userId: user.userId,
                email: user.email
            },
            statusCode: 201
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            statusCode: 500,
            error: error.message,
        });
    }
});

module.exports = router;
