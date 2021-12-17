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
    // check if the clicked emoji is already active or not
    if (document.getElementById(v).style.scale === "1.5") {
      setMood("");
      document.getElementById(v).style.color = "#2375e0e8";
      document.getElementById(v).style.scale = "1";
    } else {
      setMood(v);
      elements.forEach((i) => {
        document.getElementById(i.name).style.color = "#2375e0e8";
        document.getElementById(i.name).style.scale = "1";
      });
      document.getElementById(v).style.color = "#ff6a00";
      document.getElementById(v).style.scale = "1.5";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.moodDesc}>
        {mood !== ""
          ? `${mood[0].toUpperCase()}${mood.slice(1)}`
          : "Pick Your Current Mood:"}
      </div>
      <div className={styles.iconsContainer}>
        {elements.map((elem) => (
          <FontAwesomeIcon
            key={elem.name}
            id={elem.name}
            title={elem.name}
            onClick={(e) => handleMoodChange(elem.name, e)}
            className={styles.icon}
            icon={elem.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodPicker;
