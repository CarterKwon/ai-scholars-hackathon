# AI Scholars Hackathon Starter Template

## Introduction

These instructions will get a new Alexa project set up on your machine. The template provides functioning code samples that will serve as a foundation for further development. Please direct any questions you have to the [ASU Alexa Slack](http://links.asu.edu/asualexaslack).

## Prerequisites

These instructions assume that you have the following:

* [Amazon Developer Account](https://developer.amazon.com/)
* [AWS Account](https://aws.amazon.com/) (you can use your own AWS account, or an [AWS Educate Starter Account](https://www.awseducate.com/signin/SiteLogin))
* Install [Node.js](https://nodejs.org/en/) - install v8.10
* **If you have your own AWS Account:** [Create a user](http://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) (save the .csv file with your AWS Access Key ID & AWS Secret Access Key)
* **If you're using an AWS Educate Starter Account:** Click on **Acount Details** to get your `aws_access_key_id`, `aws_secret_access_key`, and `aws_session_token`
* [Configure](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) AWS on your local machine. You'll want to use `us-east-1` as the default region name, and `json` as the default output format.

```
aws configure
```
------
**If you're using an AWS Educate Starter Account:** you will also need to run this command after you replace the placeholder value `default_session_token` with your unique session token.
```
aws configure set aws_session_token default_session_token
```
------
* Install [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
```
npm install -g ask-cli
```
* [Initialize](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#init-command) ASK CLI with
```
ask init
```
* Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Install [ASK Toolkit for VS Code](https://marketplace.visualstudio.com/items?itemName=ask-toolkit.alexa-skills-kit-toolkit)
* Recommended, but not necessary: [AWS](https://marketplace.visualstudio.com/items?itemName=mark-tucker.aws-cli-configure) and [ASK](https://marketplace.visualstudio.com/items?itemName=mark-tucker.ask-cli-configure) configuration helpers

## Getting Started With The Template!

Now that we got that done, we can get to the fun part!

Create a new project with
```
ask new --skill-name {my-skill-name} --template --url https://s3.amazonaws.com/ai-scholars-hackathon/templates.json
```
Select `Hackathon Starter Template` as the template.

Open this folder in Visual Studio Code and open the integrated terminal. To open the integrated terminal, select **view >> terminal**.

While at the root of the directory, type `cd lambda/custom && npm install` to install all of the project's dependencies.

Next, we are going to deploy this skill using the ASK Toolkit. Click the button on the bottom bar that says **Deploy**, select which ASK profile you'd like to use, and then select **all** as shown in the gif below.

![Alt Text](https://s3.amazonaws.com/ai-scholars-hackathon/ask-toolkit-deploy.gif)

If you don't have the ASK Toolkit, use the command `ask deploy` while at the root of the project directory.

After you see the message saying the skill was successfully deployed, you can log into your [Amazon Developer Account](https://developer.amazon.com/) and try it out!

## Useful Commands

**Get the latest language model**
```
ask api get-model -p {ask-cli-profile} -s {skill-id} -l en-US > ./models/downloaded-model.json
```

**Get latest skill**
```
ask api get-skill -p {ask-cli-profile} -s {skill-id} > downloaded-skill.json
```

**NOTE:** You can leave out -p {ask-cli-profile} from either command. It will pull your default account.
