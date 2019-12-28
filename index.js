require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const Keyv = require('keyv');

// Presets
const defaultVolume = 0.1; // Percentage of 1
const defaultLength = 30; // In seconds

const client = new Discord.Client();
const store = new Keyv();
store.on('error', err => console.error('Keyv connection error:', err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async message => {
    const botCmd = '!salad';
    const helpCmd = 'help';
    let reply = '';
    if (message.content.startsWith(botCmd)) {
        const command = message.content.substr(botCmd.length).trim();
        if (command) {
            reply = setCommand(command, message.author.id);
        }

        message.reply(reply || 'OwO');
    }
});
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    const song = await store.get(`${newMember.id}:url`);
    const vol = await store.get(`${newMember.id}:volume`);
    const len = await store.get(`${newMember.id}:length`);
    if (!song) return;
    if (newMember.voiceChannel) {
        const voiceChannel = newMember.voiceChannel;
        const connection = await voiceChannel.join();
        const stream = ytdl(song);
        const dispatcher = connection.playStream(stream);
        // Use your indoor voice, Potato.
        dispatcher.setVolume(vol || defaultVolume);
        if (len !== -1) {
            setTimeout(() => {
                dispatcher.end();
                voiceChannel.leave();
            }, (len || defaultLength) * 1000);
        }
    } else {
        oldMember.voiceChannel.leave();
        console.log(newMember.displayName + ' disconnected from ' + oldMember.voiceChannel.name);
    }
});

client.login(process.env.BOT_TOKEN);

function storeSet(id, url, length, volume) {
    if (url) store.set(`${id}:url`, url);
    if (length) store.set(`${id}:length`, length);
    if (volume) store.set(`${id}:volume`, volume);
}

function getRandomSuccess() {
    const successStatements = [
        'POTATO POWERS ACTIVATE!',
        ':trumpet::trumpet::trumpet:',
        ':trumpet::trumpet::trumpet:AND HIS NAME IS JOHN CENA:trumpet::trumpet::trumpet:',
        'Aight I got chu.',
        'Eyyyyyyy.',
        'Aight.',
        ':kissing_heart:',
        ':kissing_heart: I got chu fam.',
        ':thumbsup:',
        'kay.',
        'Sounds good.',
        'An excellent choice, my dear sir and/or/nor madam.',
        'Look ma, no AI!',
        'Potato Potato Potato!',
        'Can anything be a salad if it is a collection of things? Am I a salad because I collect music?',
        ':sparkles: POTATO POWERS MAKEUP :sparkles:',
        'Yo pass the aux cord.',
        'But is it a banger?',
        'Ugh fine, but I am going to complain about it the whole time. (jk imma bot)',
        ':musical_note:'
    ];
    const r = Math.floor(Math.random() * (successStatements.length));
    return successStatements[r];
}

function getRandomFailure() {
    const failureStatements = [
        'POTATO POWERS...uh, deactivate.',
        'whomp whomp.',
        'Hey so this is awkard...',
        'Sad face.',
        `Wait this isn't AI at all! This is just a bunch of If statments in a trenchcoat!`,
        ':broken_heart:',
        '...wat.',
        ':thumbsdown:',
        `Sorry, I can't do that Dave`,
        `:musical_note: I tried so hard and got so far, but in the end it doesn't even matter... :musical_note:`,
        `:musical_note: All around me are familiar faces... :musical_note:`,
        `:musical_note: Hello darkness my old friend... :musical_note:`
    ];
    const r = Math.floor(Math.random() * (failureStatements.length));
    return failureStatements[r];
}

function setCommand(command, id) {
    let url;
    let length;
    let volume;
    let success = [];
    let info;
    let fail;

    // Set URL
    const urlMatch = command.match(/url (.*)\s?/);
    const lengthMatch = command.match(/length (\w*)%?\s?/);
    const volMatch = command.match(/(volume|vol) (\w*)%\s?/);
    if (urlMatch && urlMatch.length && urlMatch[1]) {
        url = urlMatch[1];
    };
    if (lengthMatch && lengthMatch.length && lengthMatch[1]) {
        length = lengthMatch[1];
    }
    if (volMatch && volMatch.length && volMatch[2]) {
        volume = volMatch[2];
    }

    if (!url && !length && !volume) {
        return '';
    }

    if (url) {
        success.push(`to ${url}`);
        storeSet(id, url);
    }

    if (length) {
        if (Number.parseInt(length)) {
            success.push(`for ${length} seconds`);
            storeSet(id, null, length);
        } else if (length === 'full' || length === 'all') {
            success.push(`for the whole song`);
            storeSet(id, null, -1);
        } else {
            info = `Sorry, I can't tell what you want for length. I only understand numbers or "all" or "full".`;
        }
    }

    if (volume) {
        if (Number.parseInt(volume)) {
            if ((volume > 0 && volume < 101)) {
                success.push(`at ${volume}%`);
                storeSet(id, null, null, (volume / 100));
            } else {
                info = `Sorry, but I couldn't tell what you wanted for volume for I am a simple bot and I only know how to count from 1 to 100.`;
            }
        } else {
            info = `Sorry, but can't tell what you want for volume. You have to use a number from 0 to 100. "Turn it up to 11" doesn't count.`;
        }
        
    }

    // Compose Message
    reply = success.length ? '\n' + getRandomSuccess() + '\n' + `I'll set your current song ` + success.join(' ') + '.' : '';
    reply += fail ? '\n' + getRandomFailure() + '\n' + fail : '';
    reply += info ? '\n' + info : '';

    return reply;
}