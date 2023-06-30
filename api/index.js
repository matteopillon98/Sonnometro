const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const TelegramBot = require("node-telegram-bot-api");

const botToken = "6237272691:AAG8QimxSfpDpNpYR8mDX1MLNDAF-nTirOc";
const bot = new TelegramBot(botToken, { polling: false });

// Middleware per il parsing del corpo della richiesta
app.use(bodyParser.json());

const chatId = "286242051"; // L'ID della chat a cui desideri inviare il messaggio

// Rotta per la ricezione dei dati del sonno
app.post("/api/sonno", (req, res) => {
  const sonno = req.body.sonno;
  const message = "Livello di sonno impostato: " + sonno;
  console.log("Dati del sonno ricevuti:", sonno);
  bot
    .sendMessage(chatId, message)
    .then(() => {
      console.log("Messaggio inviato con successo a Telegram");
    })
    .catch((error) => {
      console.error("Errore durante l invio del messaggio a Telegram:", error);
    });

  // Puoi effettuare qui eventuali operazioni con i dati ricevuti

  res.send("Dati del sonno ricevuti con successo!");
});

// Avvio del server
app.listen(port, () => {});