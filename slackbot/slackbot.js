require('dotenv').config();
const router = require('express').Router();
const request = require('request');



router.post('/', (req, res) => {
    console.log(req.headers);
     
    var data = {form: {
          token: process.env.SLACK_AUTH_TOKEN,
          channel: "#general",
          text: 'https://prod.liveshare.vsengsaas.visualstudio.com/join?32A27F34AACA6D22EC5AA61113BEFFC506AD'
        }};
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
          res.json();
        });
});

// router.post('/view', (req, res) => {
//   var data = {
//     "Authorization": process.env.SLACK_AUTH_TOKEN,
//     "trigger_id": "156772938.1827394",
//     "view": {
//       "type": "modal",
//       "callback_id": "modal-identifier",
//       "title": {
//         "type": "plain_text",
//         "text": "Just a modal"
//       },
//       "blocks": [
//         {
//           "type": "section",
//           "block_id": "section-identifier",
//           "text": {
//             "type": "mrkdwn",
//             "text": "*Welcome* to ~my~ Block Kit _modal_!"
//           },
//           "accessory": {
//             "type": "button",
//             "text": {
//               "type": "plain_text",
//               "text": "Just a button",
//             },
//             "action_id": "button-identifier",
//           }
//         }
//       ],
//     }
//   };

//   request.post('https://slack.com/api/views.open', data, function (error, response, body) {
//           // Sends welcome message
//           res.json();
//         });
// });

module.exports = router;