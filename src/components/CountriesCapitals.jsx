import React from "react";
import { useState } from "react";

function getAllLabels(data) {
  const countries = Object.keys(data);
  const cities = countries.map((country) => data[country]);
  const allLabels = countries.concat(cities);
  shuffleArray(allLabels);
  return allLabels;
}

//copy pasted from google
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default function CountryCapitalGame({ data }) {
  const [shuffledArray, setShuffledArray] = useState(getAllLabels(data));
  const [firstPushed, setFirstPushed] = useState(null);
  const [secondPushed, setSecondPushed] = useState(null);
  const [mismatch, setMismatch] = useState(false);

  const selectItem = (label) => {
    if (firstPushed == null || mismatch) {
      setMismatch(false);
      setSecondPushed(null);
      console.log("Pick 1st as", label);
      setFirstPushed(label);
    } else if (secondPushed == null) {
      console.log("Pick 2nd as", label);
      // prevent push the same button twice
      if (label === firstPushed) return;

      setSecondPushed(label); //async?

      //check if he/she found the right combination

      if (
        //If secondPushed is country, then firstPushed is city
        data[label] === firstPushed ||
        // If secondPushed is city, then firstPushed should be country
        data[firstPushed] === label
      ) {
        console.log("removing...");
        setShuffledArray(
          [...shuffledArray].filter((l) => l !== firstPushed && l !== label)
        );
        setFirstPushed(null);
        setSecondPushed(null);
      } else {
        //paint red
        setMismatch(true);
        // setTimeout(function () {
        //   setMismatch(false);
        //   setFirstPushed(null);
        //   setSecondPushed(null);
        // }, 1000);
      }
    }
  };

  return (
    <div>
      {shuffledArray.length === 0
        ? "Congratulations"
        : shuffledArray.map((label) => (
            <button
              key={label}
              onClick={() => selectItem(label)}
              style={{
                margin: "5px",
                fontSize: "1.3em",
                backgroundColor:
                  firstPushed === label || secondPushed === label
                    ? mismatch
                      ? "red"
                      : "blue"
                    : "lightGrey",
              }}
            >
              {label}
            </button>
          ))}
    </div>
  );
}
