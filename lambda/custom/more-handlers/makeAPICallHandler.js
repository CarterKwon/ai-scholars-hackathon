// This file was designed to show the process of separating handlers into separate files for more organized code.

const request = require('request');

// You can modify the url in the makeAPICall() function to use whatever API you'd like.
function makeAPICall() {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://icanhazdadjoke.com',
            json: true
        }, (error, response, body) => {
            console.log('Returned from API:\n', body);
            const joke = body.joke;

            // Use resolve to pass the desired value
            resolve(joke);
        })
    });
}

const APICallIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'APICallIntent';
    },
    // IMPORTANT: If you want to use async/await like shown below, you must add 'async' before the handler like shown below
    async handle(handlerInput) {
        // Uses async/await to make a call to an API. In this example, we are calling the free dad joke API
        // The API can be found here: https://icanhazdadjoke.com/
        let randomDadJoke = await makeAPICall();
        
        // This line demonstrates how to add an audio file to the response. You can use audio files you have hosted online,
        // or you can use a sound from Amazon's library here: https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html
        randomDadJoke = randomDadJoke +  "<audio src='soundbank://soundlibrary/musical/amzn_sfx_drum_comedy_01'/>";

        // Notice the use of <break time="300ms"/> to create short pauses in the response to make it sound more natural
        const prompt = `If you'd like another joke, say <break time="300ms"/> give me another dad joke. Or, if you're done, say <break time="300ms"/> stop.`

        return handlerInput.responseBuilder
            .speak(randomDadJoke + prompt)
            .reprompt(prompt)
            .withShouldEndSession(false)
            .getResponse();
    },
};

// This line is very important. Without it, your skill won't be able to access this handler
module.exports = APICallIntentHandler;