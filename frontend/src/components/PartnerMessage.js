import "../styles/PartnerMessage.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = "AIzaSyCP062q296wGvTMRHD0B5TNMuR44VFRQNc";
const PartnerMessage = (props) => {
  const [translatedText, setTranslatedText] = useState("");
  const sanitizeTranslation = (text) => {
    return text.replace("&#39;", "'");
  };

  const translateText = () => {
    if (!translatedText) {
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
          const newlang = sanitizeTranslation(
            response.data.data.translations[0].translatedText
          );
          setTranslatedText(newlang);
        })
        .catch((err) => {
          console.log("rest api error", err);
        });
    } else {
      setTranslatedText("");
    }
  };
  return (
    <div className="partner-message" onClick={translateText}>
      {/* <div>
        <span id="translate" class="material-icons material-icons-outlined">
          translate
        </span>
      </div> */}
      <p>{props.message}</p>
      {translatedText && <p className="translate">{translatedText}</p>}
    </div>
  );
};

export default PartnerMessage;
