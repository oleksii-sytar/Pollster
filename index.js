const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = '/'; // Prefix for bot commands

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Ignore messages from other bots or not starting with the prefix
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  // Split the command and arguments
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'poll') {
    // Get the poll question and options from the arguments
    const question = args[0];
    const options = args.slice(1);

    // Create the poll embed message
    const pollEmbed = new Discord.MessageEmbed()
      .setTitle(question)
      .setDescription(options.map((option, index) => `${index + 1}. ${option}`).join('\n'));

    // Send the poll message and add reactions for each option
    message.channel.send(pollEmbed).then(sentMessage => {
      for (let i = 0; i < options.length; i++) {
        sentMessage.react(`${i + 1}\uFE0F\u20E3`);
      }
    });
  } else if (command === 'survey') {
    // Get the survey question and options from the arguments
    const question = args[0];
    const options = args.slice(1);

    // Create the survey embed message
    const surveyEmbed = new Discord.MessageEmbed()
      .setTitle(question)
      .setDescription(options.map((option, index) => `${index + 1}. ${option}`).join('\n'));

    // Send the survey message and add reactions for each option
    message.channel.send(surveyEmbed).then(sentMessage => {
      for (let i = 0; i < options.length; i++) {
        sentMessage.react(`${i + 1}\uFE0F\u20E3`);
      }
    });
  }
});

client.login(process.env.BOT_TOKEN);
