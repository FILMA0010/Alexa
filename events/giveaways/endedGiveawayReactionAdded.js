const Discord = require('discord.js');
module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Giveaway ended already!`)
            .setColor('#b50505')
            .setDescription(
              `Hey ${member.user} the giveaway that you reacted to has already ended :sob:\nBe quick next time!\n**[Go to Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** `
            )
            .setTimestamp(),
        ],
      })
      .catch((e) => {});
  },
};
