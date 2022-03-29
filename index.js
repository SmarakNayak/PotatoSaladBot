require('dotenv').config();
const ytdl = require('discord-ytdl-core');
const Keyv = require('keyv');
const moment = require('moment');
const random = require('@cspruit/serendipity').random;
const { Client, Intents } = require('discord.js');
const {
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');


// Presets
const defaultVolume = 1; // Percentage of 1
const defaultLength = 30; // In seconds
const defaultStart = 0; // In seconds

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,
                                      Intents.FLAGS.GUILD_MESSAGES,
                                      Intents.FLAGS.GUILD_MEMBERS,
                                      Intents.FLAGS.GUILD_PRESENCES,
                                      Intents.FLAGS.GUILD_VOICE_STATES] });

const store = new Keyv(`mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASS}@localhost:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB_NAME}`);
store.on('error', err => console.error('Keyv connection error:', err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async message => {
    const botCmd = '!salad';
    let reply = '';
    if (message.content.startsWith(botCmd)) {
        const command = message.content.substr(botCmd.length).trim();
        if (command) {
            if (command.startsWith('set')) {
                reply = setCommand(command, message.author.id);
            }
            if (command.startsWith('view')) {
                reply = await viewCommand(command, message.author.id);
            }
            if (command.startsWith('help')) {
                reply = helpCommand();
            }
            if (command.startsWith('clear')) {
                reply = clearCommand(message.author.id);
            }
        }
        message.reply(reply || randomWhatever());
    }
});
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    try{
        const oldChannel = client.channels.cache.get(oldMember.channelId)
        const newChannel = client.channels.cache.get(newMember.channelId)
        let oldChannelMembers;
        let newChannelMembers;
        if (oldChannel) oldChannelMembers = oldChannel.members;
        if (newChannel) newChannelMembers = newChannel.members;

        if (newChannelMembers !== oldChannelMembers && newChannelMembers && newMember.member.user.username !== "AJ_BOT") {
            console.log(`${newMember.member.user.username} has joined ${newChannel.name}.`);
            var song = await store.get(`${newMember.id}:url`);
            var vol = await store.get(`${newMember.id}:volume`);
            var len = await store.get(`${newMember.id}:length`);
            var start = await store.get(`${newMember.id}:start`);
            console.log(song, vol, len, start)
            if(!song) return;
            if(!vol) vol = defaultVolume;
            if(!len) len = defaultLength;
            if(!start) start = defaultStart;
            console.log(song, vol, len, start)

            const connection = await joinVoiceChannel({
                channelId: newChannel.id,
                guildId: newChannel.guild.id,
                adapterCreator: newChannel.guild.voiceAdapterCreator
            })
            const stream = await ytdl(song, {   filter: 'audioonly',
                                                opusEncoded: false,
                                                fmt: "mp3",
                                                seek: start});
            const resource = await createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = await createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                try{
                    connection.destroy()
                } catch (error) {
                    console.log(error)
                }                
            });

            player.on(AudioPlayerStatus.Playing, () => {
                try{
                    console.log("Stream started")
                    if(len !== -1) {
                        setTimeout(() => {
                            connection.destroy()
                        }, len * 1000);
                    }         
                } catch (error) {
                    console.log(error)
                }                           
            })

            // Use your indoor voice, Potato.
            // dispatcher.setVolume(vol || defaultVolume);
        }
    } catch(error) {
        console.log("ERROR CAUGHT: ",error)
    }
    
});

client.login(process.env.BOT_TOKEN);

function storeSet(id, url, length, volume, start) {
    if (url) store.set(`${id}:url`, url);
    if (length) store.set(`${id}:length`, length);
    if (volume) store.set(`${id}:volume`, volume);
    if (start) store.set(`${id}:start`, start);
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
        ':musical_note:',
        ':ok_hand: Got it.',
        ':ok_hand:'
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
    const r = random(failureStatements.length);
    return failureStatements[r];
}

function randomWhatever() {
    const whatevergifs = [
        'https://tenor.com/view/kermit-gif-10378766',
        'https://tenor.com/view/umm-confused-wtf-blinking-okay-gif-7513882',
        'https://tenor.com/view/funny-face-who-me-gif-13094581',
        'https://tenor.com/view/awkward-simpsons-weirdo-gif-5331952',
        `https://tenor.com/view/awkward-blonde-child-can-you-not-why-gif-4950390`,
        'https://tenor.com/view/embarrassed-spongebob-em-gif-4355239',
        'https://tenor.com/view/the-simpsons-homer-simpson-good-bye-bye-hide-gif-4983317',
        'https://tenor.com/view/shit-hide-run-cat-embarrassed-gif-10009816',
        `https://tenor.com/view/penguin-hide-you-didnt-see-anything-penguins-of-madagascar-gif-15123878`,
        `https://tenor.com/view/what-do-you-want-awkward-stare-really-gif-14351563`,
        `https://tenor.com/view/hello-yes-hello-dog-here-gif-10652207`,
        `https://tenor.com/view/sure-john-cena-gif-5783187`,
        'OwO',
        'https://tenor.com/view/owo-delet-this-gif-12781064',
        'https://tenor.com/view/fabulous-gif-9282197',
        'https://tenor.com/view/dog-uwuw-zoom-in-happy-gif-12094646',
        'https://tenor.com/view/cat-peek-aboo-kitty-white-cat-cute-cat-gif-14227402',
        'https://tenor.com/view/ludicolo-gif-13599271',
        'https://tenor.com/view/salad-cat-gif-5526742',
        'https://tenor.com/view/potato-gif-9783276',
        'https://tenor.com/view/why-would-yous-say-something-so-controversial-controversial-gif-15274636',
        'https://tenor.com/view/hide-hiding-nope-embarrassed-ashamed-gif-3481570',
        'https://tenor.com/view/box-hide-face-asian-girl-gif-4641619',
        'https://tenor.com/view/meangirls-embarrassed-hiding-gif-5094641',
        'https://tenor.com/view/hiding-gif-10030312',
        'https://tenor.com/view/antelope-deer-slide-nope-bye-gif-14557765',
        'https://tenor.com/view/animal-cat-camera-funny-cute-gif-12929257'
    ];
    const r = random(whatevergifs.length);
    return whatevergifs[r];
}

function setCommand(command, id) {
    let url;
    let length;
    let volume;
    let start;
    let success = [];
    let info;
    let fail;

    // Set URL
    const urlMatch = command.match(/url (.*?)(\s|$)/);
    const startMatch = command.match(/start (\w*)%?\s?/);
    const lengthMatch = command.match(/length (\w*)%?\s?/);
    const volMatch = command.match(/volume (\w*)%?\s?/);
    if (urlMatch && urlMatch.length && urlMatch[1]) {
        url = urlMatch[1];
    };
    if (lengthMatch && lengthMatch.length && lengthMatch[1]) {
        length = lengthMatch[1];
    }
    if (volMatch && volMatch.length && volMatch[1]) {
        volume = volMatch[1];
    }
    if (startMatch && startMatch.length && startMatch[1]) {
        start = startMatch[1];
    }

    if (!url && !length && !volume && !start) {
        return '';
    }

    if (url) {
        success.push(`to <${url}>`);
        storeSet(id, url);
    }

    if (length) {
        if (Number.parseInt(length)) {
            success.push(`for ${length} seconds`);
            storeSet(id, null, Number.parseInt(length));
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

    if (start) {
        if (Number.parseInt(start)) {
            success.push(`starting from ${start} seconds`);
            storeSet(id, null, null, null, Number.parseInt(start));
        } else {
            info = `Sorry, I can't tell what you want for start. I only understand numbers`;
        }
    }

    // Compose Message
    reply = success.length ? '\n' + getRandomSuccess() + '\n' + `I'll set your current song ` + success.join(' ') + '.' : '';
    reply += fail ? '\n' + getRandomFailure() + '\n' + fail : '';
    reply += info ? '\n' + info : '';

    return reply;
}

async function viewCommand(command, id) {
    const url = await store.get(`${id}:url`);
    const vol = await store.get(`${id}:volume`);
    const len = await store.get(`${id}:length`);
    const start = await store.get(`${id}:start`);
    if (!url && !vol && !len && !start) return `I've got nothing for ya.`;
    let reply = '';
    reply += url ? '\n' + '**Url**: ' + url : '';
    reply += len ? '\n' + '**Length**: ' + len + ' seconds' : '';
    reply += vol ? '\n' + '**Volume**: ' + Math.floor(vol * 100) + '%' : '';
    reply += start ? '\n' + '**Start**: ' + start + ' seconds' : '';

    return reply;
}

function helpCommand() {
    let reply = '';
    reply += '\n' + `:wave: Hey! I'm Potato Salad Bot.`;
    reply += '\n' + `I play sound clips when you enter a chat.`;
    reply += '\n' + `You can get my attention with !salad and then enter the command`;
    reply += '\n' + '**help**: View this message! You are here.';
    reply += '\n' + '**view**: View what I have on record for you.';
    reply += '\n' + '**clear**: Clear what I have on record';
    reply += '\n' + '**set**: Set the url, volume, length and start time of the sound clip you want to play';
    reply += '\n' + 'Example: !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    reply += '\n' + 'Example: !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ start 30 ';
    reply += '\n' + 'Example: !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ length full volume 50';
    reply += '\n' + 'Example: !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ start 30 length 25 volume 50';
    reply += '\n' + `If you leave out the length, volume and start and it'll set it to default.`;
    reply += '\n' + 'Set length to "full" or "all" if you want to play the entire clip. (This will show as -1 seconds in View)';
    reply += '\n' + `You can also DM me if you don't want your selection to show on the server`;

    return reply;
}

function clearCommand(id) {
    store.delete(`${id}:url`);
    store.delete(`${id}:length`);
    store.delete(`${id}:volume`);
    store.delete(`${id}:start`);

    return `Cleared out info. I won't play anything when you join a chat.`;
}