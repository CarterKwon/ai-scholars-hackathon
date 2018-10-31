/*jslint node: true */
/*jshint esversion: 6 */

const interceptor = {
    process(handlerInput, response) {
        console.log('---> logResponseInterceptor');

        console.log("\n" + "******************* RESPONSE **********************");
        if (response) {
            console.log("\n" + JSON.stringify(response, null, 2));
        }
        else {
            console.log("\n" + "NONE");
        }
    }
};

module.exports = interceptor;