import { useState } from "react";
import "./App.css";
import Slider from "@mui/material/Slider";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function App() {
  const [sonno, setSonno] = useState(0);

  const onSonnoChange = (event, value) => {
    setSonno(value);
  };

  const onButtonClick = () => {
    saveSonno(sonno); // Chiamata alla funzione per salvare i dati
  };

  const saveSonno = (value) => {
    fetch("https://sonnometro-q35n.vercel.app/api/sonno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sonno: value }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore durante la richiesta POST");
        }
      })
      .then((data) => {
        console.log("Dati salvati con successo:", data);
      })
      .catch((error) => {
        console.error(
          "Si è verificato un errore durante il salvataggio dei dati:",
          error
        );
      });
  };

  const marks = [
    {
      value: 0,
      label: "Sveglia",
    },

    {
      value: 100,
      label: "Ghiro",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="flex flex-col gap-4 m-6 p-6 border-2 border-gray-400 rounded-lg justify-items-center">
        <div className="flex items-center gap-2">
          <NightsStayIcon />
          <h1 className="text-center text-xl font-bold">
            Benvenuto/a in Sonnometro
          </h1>
        </div>

        <label className="text-center mb-4">Quanto sonno hai?</label>

        <Slider
          defaultValue={0}
          value={sonno}
          aria-label="Default"
          onChange={onSonnoChange}
          valueLabelDisplay="on"
          step={10}
          color="secondary"
        />

        <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          onClick={onButtonClick}
        >
          Invia
        </Button>
      </div>
    </div>
  );
}

export default App;
