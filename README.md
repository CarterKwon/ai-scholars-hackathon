# AI Scholars Hackathon Starter Template

## Introduction

These instructions will get a new Alexa project set up on your machine. The template provides functioning code samples that will serve as a foundation for further development. Please direct any questions you have to the [ASU Alexa Slack](http://links.asu.edu/asualexaslack).

## Prerequisites

These instructions assume that you have the following:

* [Amazon Developer Account](https://developer.amazon.com/)
* [AWS Account](https://aws.amazon.com/) (you can use your own AWS account, or an [AWS Educate Starter Account](https://www.awseducate.com/signin/SiteLogin))
* **If you have your own AWS Account:** [Create a user](http://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) (save the .csv file with your AWS Access Key ID & AWS Secret Access Key)
* **If you're using an AWS Educate Starter Account:** Click on **Acount Details** to get your `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`
* Prepare your computer for Alexa development, using the instructions for [Mac](https://docs.google.com/document/d/1LKRezyBnXjY7TiJBEQ6fOeOXbjWF6T_KsgRii_Y4LeU/edit?usp=sharing), [Linux](https://docs.google.com/document/d/1OL1hHrCJaFWq7d_LfFPK49ycCoYGk2qJEvZz5BK5_vI/edit?usp=sharing), or [Windows](https://docs.google.com/document/d/1VZ4AHYDU4e3XuISKMn1ZiRgNeuhik7_gHh5RnBiDZ04/edit?usp=sharing).

## Getting Started With The Template!

Now that we got that done, we can get to the fun part!

Create a new project with
```
ask new --skill-name {my-skill-name} --template --url https://s3.amazonaws.com/ai-scholars-hackathon/templates.json
```
Select `Hackathon Starter Template` as the template.

Open this folder in Visual Studio Code and open the integrated terminal. To open the integrated terminal, select **view >> terminal**.

While at the root of the directory, type `cd lambda/custom && npm install` to install all of the project's dependencies.

Next, we are going to deploy this skill using the ASK Toolkit. Click the button on the bottom bar that says **Deploy**, select which **ASK profile** you'd like to use, and then select **all** as shown in the gif below.

![alt Text](https://s3.amazonaws.com/ai-scholars-hackathon/ask-toolkit-deploy.gif)

If you don't have the ASK Toolkit, use the command `ask deploy` while at the root of the project directory.

After you see the message saying the skill was successfully deployed, there are only two more steps before you can try it out!

1. Change the AWS Lambda runtime from Node.js 6.10 to Node.js 8.10. To do this, log in to the AWS Console, navigate to the Lambda section, click on your function, scroll down, and look for a section that looks like the gif below. This is required because we use features that were introduced after Node 6.10, like async/await.
![alt Text](https://s3.amazonaws.com/ai-scholars-hackathon/lambda-choose-runtime.gif)

2. Go into the **Test** tab in the [developer console](https://developer.amazon.com/), and make sure that the testing toggle is enabled.
![alt Text](https://s3.amazonaws.com/ai-scholars-hackathon/ask-toggle-test-enabled.png)

Now, it's ready to go! Launch the skill with `open hackathon starter`.

## About The Template

The template demonstrates the usage of many common Alexa features/patterns that you can use as a foundation for your skill. These features include:

* Usage of [SSML](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html) and [speechcons](https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-english-us.html) to give Alexa more personality
* Sending information to the Alexa companion mobile app via a [card](https://developer.amazon.com/docs/custom-skills/include-a-card-in-your-skills-response.html)
* Varying responses to give the skill a more human-like feel
* Making an asynchronous [API](https://www.programmableweb.com/apis/directory) call
* Playing an [audio clip](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html) in a response
* Using custom slots with synonyms, and retrieving the canonical values of the slots
* Controlling the session with `.withShouldEndSession()`
* Usage of pauses during the response for a more natural sound
* Separating handlers into separate files for more organized code
* Usage of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

The code is full of comments that point out when each of these different things are used.

## Modifying The Template

I'd highly recommend making all changes to the language model (i.e. intents, utterances, slots, etc.) in the developer console to minimize the chance of errors. After you build the model in the console, you can go into the terminal in VS Code and type `ask api get-model -p {ask-cli-profile} -s {skill-id} -l en-US > ./models/downloaded-model.json` from the root of the directory to pull the new language model. That command will pull your language model and store it in the file `models/downloaded-model.json`. You can then copy the contents of `models/downloaded-model.json` into `/models/en-US.json`.

You can change the code to reflect the changes in the language model.

## BONUS FEATURE: Bespoken
[Bespoken](https://bespoken.io/) offers a valuable tool called the [bespoken proxy](http://docs.bespoken.io/en/latest/commands/proxy/) that dramatically speeds up the time it takes to test/debug your code. The proxy allows you to run your Lambda code as a local service on your machine. In simple terms, this means no more having to re-deploy your code everytime you make a change.

This template makes it very easy to fire up the proxy. Just go to the debug panel, make sure **Bespoken Proxy** is selected, and click the green arrow like shown below.

![alt Text](https://s3.amazonaws.com/ai-scholars-hackathon/vscode-bespoken.png)

You'll see something like this appear in your debug console
```
Your public URL for accessing your local service:
https://better-lovecraft.bespoken.link

Your URL for viewing requests/responses sent to your service:
https://apps.bespoken.io/dashboard?id=better-lovecraft&key=43d2d235-4929-46b3-9a1d-48bfa2ea3074
Copy and paste this to your browser to view your transaction history and summary data.
```
Pay special attention to this URL `https://better-lovecraft.bespoken.link` **NOTE:** Yours will be different.

Now, go into the developer portal and click on endpoints. Click the HTTPS radio button and enter your unqiue URL in the `Default Region` area. Mine was `https://better-lovecraft.bespoken.link`. Then, in the dropdown box right below that select `My development endpoint is a subdomain of a domain that has a wildcard certificate from a certificate authority`. Click `Save Endpoints` and you're ready to get testing using the bespoken proxy!

You'll see the request/response JSON along with any `console.log()` statements in the debug console.

## Useful Commands For The ASK CLI

**Get the latest language model**
```
ask api get-model -p {ask-cli-profile} -s {skill-id} -l en-US > ./models/downloaded-model.json
```

**Get latest skill**
```
ask api get-skill -p {ask-cli-profile} -s {skill-id} > downloaded-skill.json
```

**NOTE:** You can leave out -p {ask-cli-profile} from either command. It will pull your default account.
