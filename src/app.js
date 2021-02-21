const { SlackAdapter } = require('botbuilder-adapter-slack');
const Slack = require('slack-node')
const schedule = require('node-schedule')
const dotenv = require('dotenv')

dotenv.config()

/*
    Example of sending message to specific channel
*/
const slack = new Slack(`${process.env.BOT_TOKEN}`);
const send = async(message) => {
    slack.api('chat.postMessage', {
        username: `${process.env.BOT_DISPLAY_NAME}`,
        text: message,
        channel: `${process.env.BOT_TARGET_CHANNEL}`,
        icon_emoji: `${process.env.BOT_ICON_EMOJI}`
    }, function(err, response) {
        console.log('send error')
        console.log(response)
    })
}

send('First message')

/*
    Example of reply in BotApp with Botkit
*/
const controller = botkit.slackbot({
    debug: false,
    log: true
})

const botScope = [
    'direct_message',
    'direct_mention',
    'menton'
]

controller.hears(['test'], botScope, (bot, message) => {
    bot.reply(message, 'test reply message')
});

controller.spawn({
    token: `${BOT_TOKEN}`
}).startRTM();