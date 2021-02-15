const Slack = require('slack-node')
const schedule = require('node-schedule')
const dotenv = require('dotenv')

dotenv.config()

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
