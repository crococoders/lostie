import { Bot, Context } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_TOKEN || '');

const introductionMessage = `Hello! I'm a Telegram bot.
I'm powered by Cyclic, the next-generation serverless computing platform.

<b>Commands</b>
/yo - Be greeted by me
/effect [text] - Show a keyboard to apply text effects to [text]`;

const replyWithIntro = (ctx: Context) =>
  ctx.reply(introductionMessage, {
    parse_mode: 'HTML',
  });

bot.on('message', replyWithIntro);
bot.start();
