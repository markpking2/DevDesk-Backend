require('dotenv').config();
const router = require('express').Router();
const request = require('request');



router.post('/', (req, res) => {
    console.log(req.body);
    var data = {form: {
          token: process.env.SLACK_AUTH_TOKEN,
          channel: "#general",
          text: 'darn'
        }};
        res.status(200).json({message: 'ok'});

});

// router.post('/', (req, res) => {
//   console.log(req.body);
//   var data = {
//     "token": process.env.SLACK_AUTH_TOKEN,
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
//           console.log(body);
//           res.json();
//         });
// });

module.exports = router;