const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sendMessage', (req,res) => {
    var message = req.body.message;
    console.log("Received: " +  message);
    if(message === '') {
        res.json('Empty message')
    }else {
        const URL = 'https://oamk.webhook.office.com/webhookb2/4ff68511-f285-493a-9d79-91d418a54878@386d3ea4-7f15-47e4-9dd7-9f0f28e57746/IncomingWebhook/cfd14ade23cc4b5984c45f0535960e21/65984e6c-17ba-4b24-be86-9761819b0abc'
        var formatted_Card_Payload = {
            "type": "message",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.adaptive",
                    "contentUrl": null,
                    "content": {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "type": "AdaptiveCard",
                        "version": "1.2",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": message
                            }
                        ]
                    }
                }
            ]
        }
        axios.post(URL , formatted_Card_Payload )
        .then(response => {
            console.log(`statusCode: ${response.status}`)
            res.json(response.status);
        })
        .catch(error => {
            console.error(error)
            res.json(error);
        })
    }
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});