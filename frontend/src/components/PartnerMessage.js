import "../styles/PartnerMessage.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = "AIzaSyCP062q296wGvTMRHD0B5TNMuR44VFRQNc";
const PartnerMessage = (props) => {
  const [translatedText, setTranslatedText] = useState("");

  const translateText = () => {
    axios
      .post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: props.message,
            target: "en",
            key: "AIzaSyCP062q296wGvTMRHD0B5TNMuR44VFRQNc",
          },
        }
      )
      .then((response) => {
        setTranslatedText(response.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log("rest api error", err);
      });
  };
  return (
    <div className="partner-message" onClick={translateText}>
      <p>{props.message}</p>
      {translatedText && <p className="translate">{translatedText}</p>}
    </div>
  );
};

export default PartnerMessage;
