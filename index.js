require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

// Presets
const defaultVolume = 0.1; // Percentage of 1
const defaultTimer = 5; // In seconds

const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', message => {
    const botCmd = '!salad';
    if (message.content.startsWith(botCmd)) {
        const command = message.content.substr(botCmd.length).trim();
        message.reply(command || 'OwO');
    }
});
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    if (newMember.voiceChannel) {
        const voiceChannel = newMember.voiceChannel;
        const connection = await voiceChannel.join();
        console.log(newMember.displayName + ' joined ' + newMember.voiceChannel.name);
        const stream = ytdl('https://www.youtube.com/watch?v=v1K4EAXe2oo');
        const dispatcher = connection.playStream(stream);
        // Use your indoor voice, Potato.
        dispatcher.setVolume(defaultVolume);
        setTimeout(() => {
            dispatcher.end();
            voiceChannel.leave();
        }, defaultTimer * 1000);
    } else {
        oldMember.voiceChannel.leave();
        console.log(newMember.displayName + ' disconnected from ' + oldMember.voiceChannel.name);
    }
});

client.login(process.env.BOT_TOKEN);