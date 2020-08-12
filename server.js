var request = require("request");

request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
        access_token: "EAAsHu2amnGsBACaZAIUs2iHQ4WU8XX6Y3R4PsDnPj8YfKmY5tNK4zumZCprU2CbS7bjAZAtkIF2ZAvFS99vZCTbW3UeWnDpf50M5egBRnPUsOSvXYMIRZClEvdIk4ZC0hEo6QVQFwQ1H90OkvLQDfuEqMZAB36fVxtsPtbVZCAZACsZBQ5310fUzGpN",
    },
    method: 'POST',
    json: {
        recipient: {
            id: 2248424415276865
        },
        message: {
            text: 'message'
        },
    }
});

