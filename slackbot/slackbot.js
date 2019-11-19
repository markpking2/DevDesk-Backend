const router = require('express').Router();
const request = require('request');



router.post('/', (req, res) => {
    var data = {form: {
          token: process.env.SLACK_AUTH_TOKEN,
          channel: "#generall",
          text: 'darn'
        }};

        request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
          // Sends welcome message
          console.log(body);
          res.json();
        });

});

module.exports = router;