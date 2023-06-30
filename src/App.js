import { useState } from "react";
import "./App.css";
import Slider from "@mui/material/Slider";
import NightsStayIcon from "@mui/icons-material/NightsStay";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function App() {
  const [sonno, setSonno] = useState(0);

  const onSonnoChange = (event, value) => {
    setSonno(value);
    saveSonno(value); // Chiamata alla funzione per salvare i dati
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
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">
        Benvenuto/a in Sonnometro
      </h1>
      <label className="text-center">Quanto sonno hai?</label>

      <div className="w-1/2 flex flex-row gap-4 items-center">
        <NightsStayIcon className="w-20" />
        <Slider
          defaultValue={0}
          value={sonno}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={onSonnoChange}
          marks={marks}
          step={10}
          color="secondary"
        />
      </div>
      <h2 className="text-center">
        Hai impostato un livello di sonno pari a {sonno}
      </h2>
    </div>
  );
}

export default App;
