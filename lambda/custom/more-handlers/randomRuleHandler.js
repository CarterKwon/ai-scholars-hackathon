// This file was designed to show the process of separating handlers into separate files for more organized code.

const rules = [
    'All work must be done during the weekend of the hackathon.',
    'You must build an Alexa skill in some form.',
    'Teams must have a minimum of 3 members and a maximum of 5 members.',
    'On Sunday, you must give a 5 minute presentation followed by a 3 minute question and answer session from the audience.'
];

// This intent shows how you can pick a random value from an array for Alexa to output
const RandomRuleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RandomRuleIntent';
    },
    handle(handlerInput) {
        // Selects a random rule from the array
        const randomRule = rules[Math.floor(Math.random() * rules.length)];
        const speechText = `Here is one of the rules: ${randomRule}`
        const prompt = ` <break time="300ms"/> If you'd like another rule, say <break time="300ms"/> give me another rule. Or, if you're done, say <break time="300ms"/> stop.`

        return handlerInput.responseBuilder
            .speak(speechText + prompt)
            .reprompt(prompt)
            .withShouldEndSession(false)
            .getResponse();
    },
};

// This line is very important. Without it, your skill won't be able to access this handler
module.exports = RandomRuleIntentHandler;