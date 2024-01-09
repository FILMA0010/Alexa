const Discord = require("discord.js");
const config = require('../../config.json');
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("<:verified:1188899777413394462> Entry Approved!")
    .setDescription(
      `- Your entry to the Giveaway has been approved! \n [Go to Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})`
    )
    .setFooter({ text: config.copyright })
    .setTimestamp()
   let denied =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("<:admin:1188605135211991130> Entry Denied | Database Entry Not Found & Returned!")
    .setDescription(
      `- Your entry to the Giveaway has been denied! Review the requirements again and try again \n [Go to Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})`
    )
    .setFooter({ text: config.copyright })

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }
