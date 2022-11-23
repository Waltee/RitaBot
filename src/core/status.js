// -----------------
// Global variables
// Currently Broken
// -----------------

// Codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]

const auth = require("./auth");

// ------------------
// Update Bot Status
// ------------------

// eslint-disable-next-line consistent-return
module.exports = function run (bot, status, config, writable = true)
{

   const activevar = [
      `twitch.tv/walteewartooth | Best Treasure Islands!`,
      `Best Treasure Islands! | twitch.tv/walteewartooth`,
      "twitch.tv/walteewartooth | Best Treasure Islands!",
      `twitch.tv/walteewartooth | Best Treasure Islands!`,
      "Best Treasure Islands! | twitch.tv/walteewartooth",
      `v.${config.version} | twitch.tv/walteewartooth`,
      `twitch.tv/walteewartooth | Best Treasure Islands!`
   ];
   const statusvar = [
      "PLAYING",
      "WATCHING",
      "LISTENING",
      "WATCHING",
      "WATCHING",
      "PLAYING",
      "WATCHING"
   ];
   const statusMap =
   {
      "busy" ()
      {

         bot.setPresence({
            "status": "dnd"
         });

      },

      "free" ()
      {

         bot.setPresence({
            "status": "online"
         });

      },

      "online" ()
      {

         // Run this on stratup
         bot.setPresence({
            "activities": {
               "name": activevar[0]
            },
            "status": "online"

         });
         setInterval(
            // Every 20 seconds generate a random number and update status to that
            function res ()
            {

               const actID = Math.floor(Math.random() * 6);
               bot.setPresence({

                  "activities": {
                     "name": activevar[actID],
                     "type": statusvar[actID]
                  },
                  "status": "online"
               });

            },
            auth.time.short
         );

      }
   };

   if (Object.prototype.hasOwnProperty.call(
      status && statusMap,
      status
   ) && writable)
   {

      return statusMap[status]();

   }

};
