require('dotenv').config();

const router = require('express').Router();
const axios = require('axios');


router.post('/', (req, res) => {
    var data = {form: {
          token: process.env.SLACK_AUTH_TOKEN,
          channel: "#general",
          text: "Hi! :wave: \n I am here to destroy all humans. Thank you for creating me."
        }};
    axios.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
          // Sends welcome message
          res.json();
        });
});

module.exports = router;