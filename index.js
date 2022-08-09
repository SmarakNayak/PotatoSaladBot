require('dotenv').config();
const ytdl = require('discord-ytdl-core');
const Keyv = require('keyv');
const { KeyvFile } = require('keyv-file');
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
const fetch = require('node-fetch');

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

const store = new Keyv({store: new KeyvFile({filename: 'entryMusic.json'})});
store.on('error', err => console.error('Keyv connection error:', err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('messageCreate', async message => {
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

    const botAoeCmd = '!aoe';
    if (message.content.startsWith(botAoeCmd)) {
        const command = message.content.substr(botAoeCmd.length).trim();
        if (command) {
            if (command.startsWith('set')) {
                reply = setAoeCommand(command, message.author.id);
            }
            if (command.startsWith('view')) {
                reply = await viewAoeCommand(command, message.author.id);
            }
            if (command.startsWith('help')) {
                reply = helpAoeCommand();
            }
            if (command.startsWith('clear')) {
                reply = clearAoeCommand(message.author.id);
            }
            if (command.startsWith('last_match')) {
                reply = await getLastAoeMatchDetails(message.author.id)
            }
        }
        message.reply(reply || randomWhatever());
    }

    const botHackCmd = '!hack';
    if (message.content.startsWith(botHackCmd)) {
        const command = message.content.substr(botHackCmd.length).trim();
        if (command) {
            if (command.startsWith('bungie')) {
                reply = '0 day exploit found. Executing hack on Bungie APACHE v3.422.1 servers. ETA is 30m';
            }
        }
        if (command) {
            if (command.startsWith('kill')) {
                reply = 'Why u wanna kill me. AHHH HELppp';
                message.reply(reply || randomWhatever());
                throw new Error('Bot killed manually');
            }
        }
        message.reply(reply || randomWhatever());
    }

    const botPlayCmd = '!play';
    if (message.content.startsWith(botPlayCmd)) {
        const Guild = client.guilds.cache.get(message.guildId); // Getting the guild.
        const Member = Guild.members.cache.get(message.author.id); // Getting the member.
        const Channel = Member.voice.channel;
        const command = message.content.substr(botPlayCmd.length).trim();
        if (Channel) { // Checking if the member is connected to a VoiceChannel.
            if (command.startsWith('monday')) {                
                reply = 'Ho chi MAMA'
                playMusic(Channel, "https://www.youtube.com/watch?v=0Y4BgcEjwuw", 70, 15, 0.5)
            }
            if (command.startsWith('tuesday')) {                
                reply = 'I also love makonnen'
                playMusic(Channel, "https://www.youtube.com/watch?v=avFq9errZCk", 18, 17)
            }
            if (command.startsWith('wednesday')) {                
                reply = 'It is wednesday my dudes'
                playMusic(Channel, "https://youtu.be/PE8GlPpuLuY", 5, 15)
            }
            if (command.startsWith('friday')) {                
                reply = 'seriously.............'
                playMusic(Channel, "https://www.youtube.com/watch?v=kfVsfOSbJY0", 44, 5, 0.5)
            }
            if (command.startsWith('another')) {                
                reply = 'Another one.'
                playMusic(Channel, "https://www.youtube.com/watch?v=fYpx8oDMQBU", 5, 4)
            }
            if (command.startsWith('win')) {                
                reply = 'All we do is WIN YEAAAAAAAHHHHHH'
                playMusic(Channel, "https://www.youtube.com/watch?v=kkkdbasZMAE", 0, 12)
            }
            if (command.startsWith('uno')) {                
                reply = 'AYE ESPANYOL'
                playMusic(Channel, "https://www.youtube.com/watch?v=2fE-2Nhmnns", 13, 4)
            }
            if (command.startsWith('goteem')) {                
                reply = 'LADIES AND GENTEELMEN'
                playMusic(Channel, "https://www.youtube.com/watch?v=ckcDG1j5jWo", 13, 14, 0.5)
            }
            if (command.startsWith('8')) {                
                reply = 'All hail!'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 12, 4)
            }
            if (command.startsWith('10')) {                
                reply = 'Back to aoe'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 17, 3)
            }
            if (command.startsWith('11')) {                
                reply = 'HAHAHAHAHAHaaa!'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 20, 4)
            }
            if (command.startsWith('12')) {                
                reply = 'AH!'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 25, 2)
            }
            if (command.startsWith('14')) {                
                reply = 'Start the game already!'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 28, 2)
            }
            if (command.startsWith('15')) {                
                reply = 'Dont point that thang at me'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 30, 2)
            }
            if (command.startsWith('19')) {                
                reply = 'Long time no siege'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 37, 2)
            }
            if (command.startsWith('20')) {                
                reply = 'My granny'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 39, 2)
            }
            if (command.startsWith('22')) {                
                reply = 'Quit touching me'
                playMusic(Channel, "https://www.youtube.com/watch?v=b2bqGXdJN9o", 40, 2)
            }
            
        } else {
            // The member is not connected to a voice channel.
            reply = 'Join a voice channel first fam';
        };
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

        if (newChannelMembers !== oldChannelMembers && newChannelMembers && newMember.member.user.id !== client.user.id && oldChannel?.id!==newChannel?.id) {
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
            const resource = await createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
            resource.volume.setVolume(vol);
            const player = await createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                try{
                    connection.destroy()
                } catch (error) {
                    console.log("NOTE: ", error.message)
                }                
            });

            player.on(AudioPlayerStatus.Playing, () => {
                console.log("Stream started")
                if(len !== -1) {
                    setTimeout(() => {
                        try{                    
                            connection.destroy()
                        } catch (error) {
                            console.log("NOTE: ", error.message)
                        }
                    }, len * 1000);
                }
            })

            player.on('error', error => {
                console.log(`Audio error: ${error.message} with resource ${error.resource.metadata.title}`);
                console.log(error);
                try{
                    connection.destroy()
                } catch (e) {
                    console.log("NOTE: ", e.message)
                }
            });

            // Use your indoor voice, Potato.
            // dispatcher.setVolume(vol || defaultVolume);
        }
    } catch(error) {
        console.log("ERROR CAUGHT: ",error)
    }
    
});

client.on('uncaughtException', function (err) {
  console.log("Unhandled discord exception:", err);
})

client.on('error', function (err) {
  console.log("Unhandled discord client error:", err);
})

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
        'Hey so this is awkward...',
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
            if ((volume > 0 && volume < 10001)) {
                success.push(`at ${volume}%`);
                storeSet(id, null, null, (volume / 100));
            } else if (volume>10000) {
                info = `You're a lunatic mate, people have work in the morning. Not setting the volume to that.\nhttps://tenor.com/view/stop-get-some-help-gif-8670192`;
            } else {
                info = `Sorry, but I couldn't tell what you wanted for volume for I am a simple bot and I only know how to count from 1 to 1000.`;
            }
        } else {
            info = `Sorry, but can't tell what you want for volume. You have to use a number from 0 to 10000. "Turn it up to 11" doesn't count.`;
        }
        
    }

    if (start) {
        console.log(start);
        console.log(Number.parseInt(start));
        if (Number.parseInt(start)) {
            success.push(`starting from ${start} seconds`);
            storeSet(id, null, null, null, Number.parseInt(start));
        } else if (Number.parseInt(start) === 0) {
            success.push(`starting from the beginning`);
            store.delete(`${id}:start`);
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

function storeAoeSet(id, profile_id) {
    if (profile_id) store.set(`${id}:profile_id`, profile_id);
}

function setAoeCommand(command, id) {
    let aoe_id;
    let success = [];
    let info;
    let fail;

    // Set URL
    const idMatch = command.match(/profile_id (\w*)%?\s?/);
    if (idMatch && idMatch.length && idMatch[1]) {
        aoe_id = idMatch[1];
    };

    if (!aoe_id) {
        return '';
    }

    if (aoe_id) {        
        if (Number.parseInt(aoe_id)) {
            success.push(`to <${aoe_id}>`);
            storeAoeSet(id, aoe_id);
        } else {
            info = `Sorry, your aoe profile id does not seem valid`;
        }
    }

    // Compose Message
    reply = success.length ? '\n' + getRandomSuccess() + '\n' + `I'll set your aoe profile_id ` + success.join(' ') + '.' : '';
    reply += fail ? '\n' + getRandomFailure() + '\n' + fail : '';
    reply += info ? '\n' + info : '';

    return reply;
}

async function viewAoeCommand(command, id) {
    const profile_id = await store.get(`${id}:profile_id`);
    if (!profile_id) return `I've got nothing for ya.`;
    let reply = '';
    reply += profile_id ? '\n' + '**profile_id**: ' + profile_id : '';
    try {
        const single_response = await fetch(`https://aoe2.net/api/nightbot/rank?profile_id=${profile_id}&leaderboard_id=3`)
        const multi_response = await fetch(`https://aoe2.net/api/nightbot/rank?profile_id=${profile_id}&leaderboard_id=4`)
        const single_data = await single_response.text();
        const multi_data = await multi_response.text();
        
        reply += '\n' + `**Single Player** ${single_data}`;
        reply += '\n' + `**Multi Player** ${multi_data}`;

    } catch(error) {
        reply += '\n' + 'Fetch failed with error:' + error.message
    }
    
    return reply;
}

function helpAoeCommand() {
    let reply = '';
    reply += '\n' + `:wave: Hey! I'm the Wololo Bot.`;
    reply += '\n' + `I give you insights about your aoe2de games.`;
    reply += '\n' + `You can get my attention with !aoe and then enter the command`;
    reply += '\n' + '**help**: View this message! You are here.';
    reply += '\n' + '**view**: View your profile_id';
    reply += '\n' + '**clear**: Clear your profile_id';
    reply += '\n' + '**set**: Set your profile_id';    
    reply += '\n' + 'Example: !aoe set profile_id 3010325';
    reply += '\n' + '**last_match**: Get details about your last match';
    reply += '\n' + 'You can find your profile_id in the address bar at https://www.aoe2insights.com/';

    return reply;
}

function clearAoeCommand(id) {
    store.delete(`${id}:profile_id`);

    return `Cleared out profile_id.`;
}

async function getLastAoeMatchDetails(id){
    let reply = '';
    const profile_id = await store.get(`${id}:profile_id`);
    if (!profile_id) return `Set your profile_id first you 🤡`;
    try {
        const response = await fetch(`https://aoe2.net/api/player/lastmatch?game=aoe2de&profile_id=${profile_id}`)
        const matchData = await response.json();
        const date = Date(matchData.last_match.started)
        reply += '\n' + `Player ${matchData.name} from ${matchData.country} played a game on ${date}`;
        reply += matchData.last_match.average_rating ? '\n' + `Avg rating was ${matchData.last_match.average_rating}` : '';
        reply += '\n' + `Map was ${convertMap(matchData.last_match.map_type)}`;
        reply += '\n' + `${matchData.last_match.num_players} players were in the game:`;

        matchData.last_match.players.map((player) => {
            reply += '\n' + `   **${player.name}**`;
            reply += player.won === true ? ' - **WON**   👑' : player.won === false ? ' - **LOST**   🤡' : ``;
            reply += '\n' + `Team Rating: ${player.rating}`;
            reply += player.country ? ` | Country: ${player.country}` : '';
            reply += ` | Civ: ${convertCiv(player.civ)}`;
            //reply += ` | CivAlpha: ${player.civ_alpha}`;
            reply += player.streak ? ` | WinStreak: ${player.streak}` :'';
            reply += player.wins ? ` | Wins: ${player.wins}` :'';
            reply += player.rating_change ? ` | Rating Change: ${player.rating_change}` :'';
            
        })
        reply += '\n' + `You can find more insights for the game at https://www.aoe2insights.com/match/${matchData.last_match.match_id}/analysis`;

    } catch(error) {
        reply += '\n' + 'Fetch failed with error:' + error.message
    }
    
    return reply;
}

function convertCiv(civ_id){
    const civ_mapping = [{"id":1,"string":"Britons"},{"id":2,"string":"Franks"},{"id":3,"string":"Goths"},{"id":4,"string":"Teutons"},{"id":5,"string":"Japanese"},{"id":6,"string":"Chinese"},{"id":7,"string":"Byzantines"},{"id":8,"string":"Persians"},{"id":9,"string":"Saracens"},{"id":10,"string":"Turks"},{"id":11,"string":"Vikings"},{"id":12,"string":"Mongols"},{"id":13,"string":"Celts"},{"id":14,"string":"Spanish"},{"id":15,"string":"Aztecs"},{"id":16,"string":"Mayans"},{"id":17,"string":"Huns"},{"id":18,"string":"Koreans"},{"id":19,"string":"Italians"},{"id":20,"string":"Hindustanis"},{"id":21,"string":"Incas"},{"id":22,"string":"Magyars"},{"id":23,"string":"Slavs"},{"id":24,"string":"Portuguese"},{"id":25,"string":"Ethiopians"},{"id":26,"string":"Malians"},{"id":27,"string":"Berbers"},{"id":28,"string":"Khmer"},{"id":29,"string":"Malay"},{"id":30,"string":"Burmese"},{"id":31,"string":"Vietnamese"},{"id":32,"string":"Bulgarians"},{"id":33,"string":"Tatars"},{"id":34,"string":"Cumans"},{"id":35,"string":"Lithuanians"},{"id":36,"string":"Burgundians"},{"id":37,"string":"Sicilians"},{"id":38,"string":"Poles"},{"id":39,"string":"Bohemians"},{"id":40,"string":"Dravidians"},{"id":41,"string":"Bengalis"},{"id":42,"string":"Gurjaras"},{"id":99,"string":"Indians"}]
    const civ_name = civ_mapping.filter(function (mapping) {
      return mapping.id === civ_id;
    });
    return(civ_name[0].string);
}

function convertMap(map_id){
    const map_mapping = [{"id":9,"string":"Arabia"},{"id":10,"string":"Archipelago"},{"id":11,"string":"Baltic"},{"id":12,"string":"Black Forest"},{"id":13,"string":"Coastal"},{"id":14,"string":"Continental"},{"id":15,"string":"Crater Lake"},{"id":16,"string":"Fortress"},{"id":17,"string":"Gold Rush"},{"id":18,"string":"Highland"},{"id":19,"string":"Islands"},{"id":20,"string":"Mediterranean"},{"id":21,"string":"Migration"},{"id":22,"string":"Rivers"},{"id":23,"string":"Team Islands"},{"id":24,"string":"Full Random"},{"id":25,"string":"Scandinavia"},{"id":26,"string":"Mongolia"},{"id":27,"string":"Yucatan"},{"id":28,"string":"Salt Marsh"},{"id":29,"string":"Arena"},{"id":31,"string":"Oasis"},{"id":32,"string":"Ghost Lake"},{"id":33,"string":"Nomad"},{"id":49,"string":"Iberia"},{"id":50,"string":"Britain"},{"id":51,"string":"Mideast"},{"id":52,"string":"Texas"},{"id":53,"string":"Italy"},{"id":54,"string":"Central America"},{"id":55,"string":"France"},{"id":56,"string":"Norse Lands"},{"id":57,"string":"Sea of Japan (East Sea)"},{"id":58,"string":"Byzantium"},{"id":59,"string":"Custom"},{"id":60,"string":"Random Land Map"},{"id":62,"string":"Random Real World Map"},{"id":63,"string":"Blind Random"},{"id":65,"string":"Random Special Map"},{"id":66,"string":"Random Special Map"},{"id":67,"string":"Acropolis"},{"id":68,"string":"Budapest"},{"id":69,"string":"Cenotes"},{"id":70,"string":"City of Lakes"},{"id":71,"string":"Golden Pit"},{"id":72,"string":"Hideout"},{"id":73,"string":"Hill Fort"},{"id":74,"string":"Lombardia"},{"id":75,"string":"Steppe"},{"id":76,"string":"Valley"},{"id":77,"string":"MegaRandom"},{"id":78,"string":"Hamburger"},{"id":79,"string":"CtR Random"},{"id":80,"string":"CtR Monsoon"},{"id":81,"string":"CtR Pyramid Descent"},{"id":82,"string":"CtR Spiral"},{"id":83,"string":"Kilimanjaro"},{"id":84,"string":"Mountain Pass"},{"id":85,"string":"Nile Delta"},{"id":86,"string":"Serengeti"},{"id":87,"string":"Socotra"},{"id":88,"string":"Amazon"},{"id":89,"string":"China"},{"id":90,"string":"Horn of Africa"},{"id":91,"string":"India"},{"id":92,"string":"Madagascar"},{"id":93,"string":"West Africa"},{"id":94,"string":"Bohemia"},{"id":95,"string":"Earth"},{"id":96,"string":"Canyons"},{"id":97,"string":"Enemy Archipelago"},{"id":98,"string":"Enemy Islands"},{"id":99,"string":"Far Out"},{"id":100,"string":"Front Line"},{"id":101,"string":"Inner Circle"},{"id":102,"string":"Motherland"},{"id":103,"string":"Open Plains"},{"id":104,"string":"Ring of Water"},{"id":105,"string":"Snakepit"},{"id":106,"string":"The Eye"},{"id":107,"string":"Australia"},{"id":108,"string":"Indochina"},{"id":109,"string":"Indonesia"},{"id":110,"string":"Strait of Malacca"},{"id":111,"string":"Philippines"},{"id":112,"string":"Bog Islands"},{"id":113,"string":"Mangrove Jungle"},{"id":114,"string":"Pacific Islands"},{"id":115,"string":"Sandbank"},{"id":116,"string":"Water Nomad"},{"id":117,"string":"Jungle Islands"},{"id":118,"string":"Holy Line"},{"id":119,"string":"Border Stones"},{"id":120,"string":"Yin Yang"},{"id":121,"string":"Jungle Lanes"},{"id":122,"string":"Alpine Lakes"},{"id":123,"string":"Bogland"},{"id":124,"string":"Mountain Ridge"},{"id":125,"string":"Ravines"},{"id":126,"string":"Wolf Hill"},{"id":132,"string":"Antarctica"},{"id":133,"string":"Aral Sea"},{"id":134,"string":"Black Sea"},{"id":135,"string":"Caucasus"},{"id":136,"string":"Caucasus"},{"id":137,"string":"Custom Map Pool"},{"id":138,"string":"Custom Map Pool"},{"id":139,"string":"Golden Swamp"},{"id":140,"string":"Four Lakes"},{"id":141,"string":"Land Nomad"},{"id":142,"string":"BR Battle On Ice"},{"id":143,"string":"BR El Dorado"},{"id":144,"string":"BR Fall of Axum"},{"id":145,"string":"BR Fall of Rome"},{"id":146,"string":"BR Majapahit Empire"},{"id":147,"string":"Amazon Tunnel"},{"id":148,"string":"Coastal Forest"},{"id":149,"string":"African Clearing"},{"id":150,"string":"Atacama"},{"id":151,"string":"Seize the Mountain"},{"id":152,"string":"Crater"},{"id":153,"string":"Crossroads"},{"id":154,"string":"Michi"},{"id":155,"string":"Team Moats"},{"id":156,"string":"Volcanic Island"},{"id":157,"string":"Acclivity"},{"id":158,"string":"Eruption"},{"id":159,"string":"Frigid Lake"},{"id":160,"string":"Greenland"},{"id":161,"string":"Lowland"},{"id":162,"string":"Marketplace"},{"id":163,"string":"Meadow"},{"id":164,"string":"Mountain Range"},{"id":165,"string":"Northern Isles"},{"id":166,"string":"Ring Fortress"},{"id":167,"string":"Runestones"},{"id":168,"string":"Aftermath"},{"id":169,"string":"Enclosed"},{"id":170,"string":"Haboob"},{"id":171,"string":"Kawasan"},{"id":172,"string":"Land Madness"},{"id":173,"string":"Sacred Springs"},{"id":174,"string":"Wade"}]

    const map_name = map_mapping.filter(function (mapping) {
      return mapping.id === map_id;
    });
    return(map_name[0].string);
}

async function playMusic(Channel, song, start = 0, len = -1, vol = 1){
    try{
        const connection = await joinVoiceChannel({
            channelId: Channel.id,
            guildId: Channel.guild.id,
            adapterCreator: Channel.guild.voiceAdapterCreator
        })
        const stream = await ytdl(song, {   filter: 'audioonly',
                                            opusEncoded: false,
                                            fmt: "mp3",
                                            seek: start});
        const resource = await createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
        resource.volume.setVolume(vol);
        const player = await createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            try{
                connection.destroy()
            } catch (error) {
                console.log("NOTE: ", error.message)
            }                
        });

        player.on(AudioPlayerStatus.Playing, () => {
            console.log("Stream started")
            if(len !== -1) {
                setTimeout(() => {
                    try{                    
                        connection.destroy()
                    } catch (error) {
                        console.log("NOTE: ", error.message)
                    }
                }, len * 1000);
            }
        });

        player.on('error', error => {
            console.log(`Audio error: ${error.message} with resource ${error.resource.metadata.title}`);
            console.log(error);
            try{
                connection.destroy()
            } catch (e) {
                console.log("NOTE: ", e.message)
            }
        });

    } catch(error) {
        console.log("Playing music failed:", error)
    }

}