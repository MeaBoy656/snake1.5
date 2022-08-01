import React from "react";

const Head = (props) => {
  const headPosition = {
    gridColumn: props.xHeadPos,
    gridRow: props.yHeadPos,
  };

  return <div style={headPosition} className="snakeHead"></div>;
};

export default Head;
