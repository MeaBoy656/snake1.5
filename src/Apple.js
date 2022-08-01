import React from "react";

const Apple = (props) => {
  const applePosition = {
    gridColumn: props.appleLocation?.xPos,
    gridRow: props.appleLocation?.yPos,
  }
  return <div style={applePosition} className="apple"></div>;
};

export default Apple;
