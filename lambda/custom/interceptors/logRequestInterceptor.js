/*jslint node: true */
/*jshint esversion: 6 */

const interceptor = {
    process(handlerInput) {
        console.log('---> logRequestInterceptor');

        console.log("\n" + "******************* REQUEST **********************");
        console.log("\n" + JSON.stringify(handlerInput.requestEnvelope, null, 2));
    }
};

module.exports = interceptor;