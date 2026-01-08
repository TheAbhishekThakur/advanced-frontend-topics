/*

Password Strength Checker Component:

* Password length should be 6 to 32 characters.
* Strength = password length + character types.
* Max strength = 10
* If upper case letters are used, +1 strength.
* If lower case letters are used, +1 strength.
* If numbers are used, +1 strength.
* If special characters are used, +1 strength.
* If strength > 3 and strength <= 6, password is considered weak.
* If strength > 6 and strength <= 8, password is considered moderate.
* If strength > 8, password is considered strong.
* if password length < 3, password is considered 0.
*/

"use client";
import "./style.css";
import { useEffect, useState } from "react";

const hasNumber = /\d/;
const hasUpperCase = /[A-Z]/;
const hasLowerCase = /[a-z]/;
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

const PasswordStrengthChecker = () => {
  const [value, setValue] = useState("");
  const [strength, setStrength] = useState(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: "0%",
    backgroundColor: "transparent",
  });

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let strengthCount = 0;

    if (value.length > 3) {
      const strengthByLength = Math.min(Math.floor(value.length / 3), 6);
      let strengthByCharTypes = 0;

      if (hasNumber.test(value)) {
        strengthByCharTypes += 1;
      }
      if (hasUpperCase.test(value)) {
        strengthByCharTypes += 1;
      }
      if (hasLowerCase.test(value)) {
        strengthByCharTypes += 1;
      }
      if (hasSpecialChar.test(value)) {
        strengthByCharTypes += 1;
      }
      strengthCount = strengthByLength + strengthByCharTypes;
    } else {
      strengthCount = 0;
    }

    const updatedProgressBarStyles = { ...progressBarStyles };
    updatedProgressBarStyles.width = `${(strengthCount / 10) * 100}%`;

    if (strengthCount <= 3) {
      updatedProgressBarStyles.backgroundColor = "red";
    } else if (strengthCount > 3 && strengthCount <= 6) {
      updatedProgressBarStyles.backgroundColor = "orange";
    } else if (strengthCount > 6 && strengthCount <= 8) {
      updatedProgressBarStyles.backgroundColor = "yellow";
    } else {
      updatedProgressBarStyles.backgroundColor = "green";
    }

    setProgressBarStyles(updatedProgressBarStyles);
    setStrength(strengthCount);
  }, [value]);

  return (
    <div className="app">
      <div>
        <h1>Password Strength Checker Component</h1>
        <div>
          <input
            type="password"
            className="border rounded p-2 w-full"
            placeholder="Enter your password"
            value={value}
            onChange={inputHandler}
          />
          <div className="progress-container">
            <div className="progress-bar" style={progressBarStyles}></div>
          </div>
          <p className="text-center">
            Strength of your password (out of 10) is {strength}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
