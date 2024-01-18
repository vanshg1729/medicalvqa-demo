const fetch = require('node-fetch');
require('dotenv').config();
const FLASK_APP = process.env.FLASK_APP || 'http://localhost:9000';

const getSimilarTags = async (req, res) => {
    console.log(`Inside getSimilarTags`)
    try {
        const response = await fetch(`${FLASK_APP}/get_tags`, {
            method: req.method,
            headers: req.headers,
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getClosestQuestion = async (req, res) => {
    console.log(`Inside getClosestQuestion`)
    try {
        const response = await fetch(`${FLASK_APP}/get_question`, {
            method: req.method,
            headers: req.headers,
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getSimilarTags,
    getClosestQuestion
}