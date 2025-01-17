import React from "react";

const PasswordStrengthMeter = ({ password }) => {
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsNumber = /\d/.test(password);
  const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  let score=0
   
  function CalculateScore(){
    let calculateScore=0;
    if(containsUppercase){
      calculateScore++
    }
    if(containsLowercase){
      calculateScore++
    }
    if(containsNumber){
      calculateScore++
    }
    if(containsSpecialChar){
      calculateScore++
    }
    if(password?.length>7){
      calculateScore++
    }
    score=calculateScore;
  }
  CalculateScore()

  const num = (score*2)*10;

  const funcProgressColor = () => {
    if (num > 85 && num===100) {
      return "#00b500"; 
    } else if (num >= 75 && num <= 85) {
      return "#66ff66"; 
    } 
    else if (num >= 55 && num<=75) {
      return "#BFAC05"; 
    } 
    else if (num >= 35 && num<=55) {
      return "#FFC0C0"; 
    } else {  
      return "#EA1111"
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  return (
    <>
      <div className="progress" style={{ height: "7px",marginTop: "5px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
