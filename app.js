import Discord from "discord.js";

import { loginId } from "./env.js";
import { words, emoji, f } from "./words.js";

const client = new Discord.Client();

const getEmoji = (emojiId) => {
    return client.emojis.cache.find((emoji) => emoji.id == emojiId);
};

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    if (msg.author.id == client.user.id) return;
    if (words.some((word) => msg.content.toUpperCase().indexOf(word) !== -1)) {
        msg.react(getEmoji(emoji[0]));
    }
});

client.on("messageDelete", (msg) => {
    if (words.some((word) => msg.content.toUpperCase().indexOf(word) !== -1)) {
        msg.reply(`${f}「今メッセージ消したよねぇ！？」`);
        console.log(`Deleted Message | ${new Date()} | ${msg}`);
    }
});

client.login(loginId);
