import { useState } from "react";
import "./App.css";
import Slider from "@mui/material/Slider";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import BedIcon from "@mui/icons-material/Bed";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function App() {
  const [sonno, setSonno] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showSleepAlert, setShowSpleepAlert] = useState(false);

  const rangeStart = 50;
  const rangeEnd = 100;
  const probabilityStart = 0.16; // 16%
  const probabilityEnd = 1.0; // 100%

  const onSonnoChange = (event, value) => {
    setSonno(value);
  };

  const onButtonClick = () => {
    saveSonno(sonno, calculateProbability(sonno)); // Chiamata alla funzione per salvare i dati
    setShowAlert(true);
    if (sonno >= 50) {
      setShowSpleepAlert(true);
    }
  };

  const calculateProbability = (value) => {
    if (value <= rangeStart) {
      return 0; // La probabilità è 0 per valori inferiori al rangeStart
    } else if (value >= rangeEnd) {
      return probabilityEnd; // La probabilità è 100% per valori superiori o uguali al rangeEnd
    } else {
      const range = rangeEnd - rangeStart;
      const probabilityRange = probabilityEnd - probabilityStart;
      const normalizedValue = (value - rangeStart) / range;
      const interpolatedProbability =
        probabilityStart + normalizedValue * probabilityRange;
      return interpolatedProbability;
    }
  };

  const saveSonno = (value, prob) => {
    fetch("https://sonnometro-q35n.vercel.app/api/sonno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sonno: value, prob: prob }),
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
    <div className="flex justify-center items-center h-screen bg-blue-600 text-white">
      <div className="flex flex-col gap-4 m-6 p-6 justify-items-center">
        <div className="flex items-center justify-around gap-2 ">
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
        {showSleepAlert && (
          <Alert severity="error" onClose={() => setShowSpleepAlert(false)}>
            Probabilità di prendere sonno al:{" "}
            {calculateProbability(sonno) * 100} %
          </Alert>
        )}
        <Button
          variant="contained"
          color="secondary"
          endIcon={<BedIcon />}
          onClick={onButtonClick}
        >
          Invia
        </Button>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Sonno inviato con successo!
          </Alert>
        )}
      </div>
    </div>
  );
}

//          style={{ color: "purple", background: "#D7B9D5" }}

export default App;
