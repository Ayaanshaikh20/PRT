const { Router } = require('express');
const router = Router();
const Poll = require("../models/polls");

//fetch all question poll
router.get("/api/poll", async (req, res) => {
    try {
        const result = await Poll.find();
        if (result && result.length > 0) {
            res.status(200).json({
                message: "Polls fetched successfully",
                data: result,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: "No polls found",
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error getting polls",
            error: error.message,
            statusCode: 500
        });
    }
});

//create question poll
router.post("/api/poll", async (req, res) => {
    try {
        const { question, options } = req.body;

        if (!question || !options || options.length < 1) {
            return res.status(400).json({
                message: "Select atleast one option",
                statusCode: 400
            });
        }
        
        const pollObject = new Poll({
            question,
            options: options.map(opt => ({ text: opt.text, votes: 0 }))
        });

        await pollObject.save();

        res.status(201).json({
            message: "Poll created successfully",
            statusCode: 201,
            data: pollObject._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating poll",
            error: error.message,
            statusCode: 500
        });
    }
});

//submit vote
router.post("/api/vote", async (req, res) => {
    try {
        const { pollId, optionIndex, voterId } = req.body;

        if (!pollId || optionIndex === undefined || !voterId) {
            return res.status(400).json({
                message: "pollId, optionIndex, and voterId are required",
                statusCode: 400
            });
        }

        const pollObject = await Poll.findById(pollId);
        if (!pollObject) {
            return res.status(404).json({
                message: "Poll not found",
                statusCode: 404
            });
        }

        //check user second vote validation
        if (pollObject.voters.includes(voterId)) {
            return res.status(400).json({
                message: "You have already voted on this poll",
                statusCode: 400
            });
        };

        if (!pollObject.options[optionIndex]) {
            return res.status(400).json({
                message: "Invalid option index",
                statusCode: 400
            });
        };

        pollObject.options[optionIndex].votes += 1;

        //add the voter to the list
        pollObject.voters.push(voterId);

        await pollObject.save();

        res.status(200).json({
            message: "Vote submitted successfully",
            data: pollObject._id,
            statusCode: 200
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting vote",
            error: error.message,
            statusCode: 500
        });
    }
});

module.exports = router;
