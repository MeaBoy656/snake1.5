import React from "react";

const Tail = (props) => {
  const tailPosition = {
    gridColumn: props.tailPath[props.index]?.xPos,
    gridRow: props.tailPath[props.index]?.yPos,
  };

  return <div style={tailPosition} className="snakeTail"></div>;
};

export default Tail;
