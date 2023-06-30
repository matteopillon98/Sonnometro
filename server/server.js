const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const TelegramBot = require("node-telegram-bot-api");

const botToken = "6237272691:AAG8QimxSfpDpNpYR8mDX1MLNDAF-nTirOc";
const bot = new TelegramBot(botToken, { polling: false });

app.use(cors()); // Abilita le richieste CORS per tutte le rotte

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

const os = require("os");

// Ottieni l'indirizzo IP del server
const networkInterfaces = os.networkInterfaces();
const addresses = [];
for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.internal) {
      addresses.push(iface.address);
    }
  }
}

// Avvio del server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server ${addresses[0]} avviato sulla porta ${port}`);
});
