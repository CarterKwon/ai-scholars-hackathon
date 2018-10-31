'use strict';
const Alexa = require('ask-sdk-core');

// This handler gets called when the user invokes your skill without providing a specific intent
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    // In the string below, <break time="300ms"/> is used to create a break (pause) in Alexa's output for the specified time
    // In this example, it's 300 milliseconds
    const speechText = 'Welcome to the A.I. Scholars Hackathon. This template will help you get started! What skill category is your team choosing? <break time="400ms"/> You can say one of the following options: <break time="300ms"/> Education, Sustainability, or Disability Resources and Services.';
    const repromptText = 'What skill category is your team choosing?';

    // The line .withSimpleCard below sends a card to the user's companion Alexa app on their mobile phone
    // It takes two arguments: the first is the title, and the second is the body text
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard('Welcome To The AI Scholars Hackathon', "What skill category is your team choosing? The options are: Education, Sustainability, or Disability Resources and Services.")
      .getResponse();
  },
};

const ProjectCategoryIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ProjectCategoryIntent';
  },
  handle(handlerInput) {

    // The function getCanonicalSlots() returns an object with the canonical values for the
    // all the slots. This is especially important if your slots have synonyms listed that a
    // user might say - for example, the user might say "the skill category is public health".
    // The actual value of that slot is "public health", but the canonical value that we defined
    // in the language model for that slot is "Public Health And Wellness". With this function,
    // you can get "Public Health And Wellness" from an utterance where a synonym was used.
    // If you still have questions, visit https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html
    const slotValues = getCanonicalSlots(handlerInput.requestEnvelope.request.intent.slots);
    const projectCategorySlot = slotValues.category.resolved;

    // Speechcons are special words and phrases that Alexa pronounces more expressively
    // Using these appropriately will bring your skill to life with personality
    // For a full list of available speechcons, go here: https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-english-us.html
    const speechcons = ['Oh la la', 'Woo hoo', 'Zing', 'Cowabunga', 'Hip hip hooray', 'Hurray', 'Dynomite', 'Cha ching', 'Booya', 'Bada bing bada boom']

    // Select a random speechcon from the array above so the response isn't the same everytime
    // Varying the responses like this makes the skill more enjoyable to use
    const randomSpeechcon = speechcons[Math.floor(Math.random() * speechcons.length)];

    // If you want to use template literal like shown below, you must enclose the string in back-ticks (``) instead of double ("") or single ('') quotes 
    const speechText = `<say-as interpret-as="interjection">${randomSpeechcon}</say-as>! ${projectCategorySlot} is a great category. I can't wait to see what you build.`;
    const prompt = ' Try asking for a random hackathon rule by saying <break time="300ms"/> give me a random rule. Or, you can try an online joke A.P.I. by saying, <break time="300ms"/> give me a dad joke.'
    
    // Make special note of the line below .withShouldEndSession(false) - you can use this to control if the session remains open or not
    return handlerInput.responseBuilder
      .speak(speechText + prompt)
      .reprompt(prompt)
      .withShouldEndSession(false)
      .getResponse();
  },
};

// This built-in intent is triggered everytime a user says "help" or something similar
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This response is meant to help your users navigate through the skill. It is helpful to list the different features of the skill here.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

// This built-in intent is triggered everytime a user says "stop", "cancel", or something similar
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye, and goodluck with the hackathon!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

// This is called when the current skill session ends for any reason other than your code closing the session
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

// This is the error/fallback handler that Alexa defaults to when she can't map an utterance to an intent
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say that again.')
      .reprompt('Sorry, I can\'t understand the command. Please say that again.')
      .getResponse();
  },
};

// Don't worry too much about the logic of this function as it can be a little confusing...
// Just know that it is a utility function that returns an object with the canonical slot values
// See usage on line 40
function getCanonicalSlots(filledSlots) {
  const slotValues = {};
  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;
    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);
  return slotValues;
}

const skillBuilder = Alexa.SkillBuilders.custom();

// Make note of the lines below that say require('./<FILENAME>'), this allows you to access handlers that are located in different files
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ProjectCategoryIntentHandler,
    require('./more-handlers/randomRuleHandler'),
    require('./more-handlers/makeAPICallHandler'),
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(
    require('./interceptors/logRequestInterceptor')
  )
  .addResponseInterceptors(
    require('./interceptors/logResponseInterceptor')
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();