# Potato Salad Bot
A Discord bot that plays intro music when someone joins the chat

## To add to your Discord server
- Have Admin permissions to the server you want to add
- Go to this link to invite the bot: https://discordapp.com/oauth2/authorize?client_id=659972684641206292&permissions=3145728&scope=bot
- _Note_: The connect and speak permissions are required for PSB to join your voice chat and announce your presence.

## How To Use
- Use ```!salad``` to get the server's attention. (It may look at you funny if you don't give it a command.)

### Commands
- **help** - View commands
- **view** - View what PSB has on record for your user
- **clear** - Clear what PSB has on record for your user
- **set**
    - **(url: url string)**: Url to play when you enter a voice channel. If length and volume are not specified, it'll play at 20% for 30 seconds by default.
    - **(length: number | "full")**: Number of seconds. Enter "full" or "all" to play the whole thing.
    - **(volume: number 1-100)**: Volume percentage. Note that youtube is _very_ loud and anything past 30% usually drowns out anyone in voice chat. Don't be a jerk.
    
    - Example:
        - !salad set url !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ length 5 vol 15% (Plays that url for 5 seconds at 15%)
        - !salad set url https://www.youtube.com/watch?v=dQw4w9WgXcQ (Plays url at 20% for 30 seconds or whatever is already been defined)
        - !salad set volume 30 (Sets the current song to play at 30%)
        - !salad set length full (Plays the entire clip)

## ...Potato Salad?
[The Joke](https://www.reddit.com/r/potatosalad/)

## Credits
- Potato Salad's icon image is from Wikimedia commons: TreblRebl at English Wikipedia [CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)]