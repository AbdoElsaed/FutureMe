import { useState } from "react";
import styles from "../../styles/MoodPicker.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { faTired } from "@fortawesome/free-solid-svg-icons";
import { faMeh } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

const MoodPicker = ({ mood, setMood }) => {
  const elements = [
    { name: "happy", icon: faSmileBeam },
    { name: "sad", icon: faFrown },
    { name: "angry", icon: faAngry },
    { name: "tired", icon: faTired },
    { name: "meh", icon: faMeh },
  ];
  const handleMoodChange = (v, e) => {
    setMood(v);
    elements.forEach((i) => {
      document.getElementById(i.name).style.color = "#548ad1cb";
    });
    document.getElementById(v).style.color = "chocolate";
  };

  return (
    <div className={styles.container}>
      <div className={styles.moodDesc}>
        {mood !== "" ? `${mood[0].toUpperCase()}${mood.slice(1)}` : "Your current mood:"}
      </div>
      <div className={styles.iconsContainer}>
        {elements.map((elm) => (
          <FontAwesomeIcon
            key={elm.name}
            id={elm.name}
            title={elm.name}
            onClick={(e) => handleMoodChange(elm.name, e)}
            className={styles.icon}
            icon={elm.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodPicker;
