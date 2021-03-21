const { SlackAdapter } = require('botbuilder-adapter-slack');
const Slack = require('slack-node')
const schedule = require('node-schedule')
const dotenv = require('dotenv');
const { Botkit } = require('botkit');
const JiraApi = require('jira-client')

dotenv.config()

/*
    Example of sending message to specific channel
*/
const slack = new Slack(`${process.env.BOT_TOKEN}`);
slack.setWebhook(`${process.env.WEBHOOK_URL}`);

const sendByAPI = async(message) => {
    slack.api('chat.postMessage', {
        username: `${process.env.BOT_DISPLAY_NAME}`,
        text: message,
        channel: `${process.env.BOT_TARGET_CHANNEL}`,
        icon_emoji: `${process.env.BOT_ICON_EMOJI}`
    }, function(err, response) {
        if (err!=null) console.log('err =' + err)

        console.log(response)
    })
}

const sendByWebhook = async(message) => {
    slack.webhook({
        text: message,
        attachments:[
          {
            fallback: "Link Address: <https://www.google.com|Google>",
            pretext: "Link Address: <https://www.google.com|Google>",
            color: "#00FFFF",
            fields:[
              {
                title: "Notice",
                value: "Please, click the link above.",
                short:false
              }
            ]
          }
        ]
    }, function(err, response){
        console.log(response);
    });   
}

sendByAPI('First message by API - slack node')
sendByWebhook('First message by Webhook')

var jira = new JiraApi({
  protocol: `${process.env.JIRA_PROTOCOL}`,
  host: `${process.env.JIRA_HOST}`,
  username: ``,
  password: ``,
  apiVersion: ``,
  strictSSL: true
});

var serverInfo = jira.getServerInfo().then(function(serverInfo) {
  console.log(serverInfo);
}).catch(function(err) {
  console.error(err);
});