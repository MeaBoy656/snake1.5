import React, { useEffect, useState, useRef } from "react";
import Apple from "./Apple";
import Head from "./Head";
import Tail from "./Tail";
import Gameover from "./Gameover";
import { MoveSnakeHead } from "./MoveSnakeHead";

const Game = (props) => {
  const [headPos, setHeadPos] = useState({
    xPos: 20,
    yPos: 20,
  });
  const [tailPath, setTailPath] = useState([
    {
      xPos: 20,
      yPos: 20,
    },
  ]);

  const [tailLength, setTailLength] = useState(5);
  const [appleLocation, setAppleLocation] = useState({
    xPos: generateRandomPos(),
    yPos: generateRandomPos(),
  });

  // Snake movement

  const [direction, setDirection] = useState("Left");

  const isHeadOppositeDirection = (oppositeDirection, currentDirection) => {
    direction === oppositeDirection
      ? setDirection(oppositeDirection)
      : setDirection(currentDirection);
  };

  const changeDirection = (event) => {
    switch (event.key) {
      case "a":
        isHeadOppositeDirection("right", "left");
        break;
      case "d":
        isHeadOppositeDirection("left", "right");
        break;
      case "w":
        isHeadOppositeDirection("down", "up");
        break;
      case "s":
        isHeadOppositeDirection("up", "down");
        break;
      case "ArrowLeft":
        isHeadOppositeDirection("right", "left");
        break;
      case "ArrowRight":
        isHeadOppositeDirection("left", "right");
        break;
      case "ArrowUp":
        isHeadOppositeDirection("down", "up");
        break;
      case "ArrowDown":
        isHeadOppositeDirection("up", "down");
        break;
      default:
        break;
    }
    window.removeEventListener("keydown", changeDirection);
  };

  const moveSnakehead = () => {
    switch (direction) {
      case "down":
        setHeadPos((prevPos) => {
          if (headPos.yPos < 40 && headPos.yPos > 0) {
            return {
              ...prevPos,
              yPos: prevPos.yPos + 1,
            };
          } else if (headPos.yPos > 39) {
            return {
              ...prevPos,
              yPos: 1,
            };
          }
        });
        break;
      case "up":
        setHeadPos((prevPos) => {
          if (headPos.yPos <= 40 && headPos.yPos > 1) {
            return {
              ...prevPos,
              yPos: prevPos.yPos - 1,
            };
          } else if (headPos.yPos < 2) {
            return {
              ...prevPos,
              yPos: 40,
            };
          }
        });
        break;
      case "right":
        setHeadPos((prevPos) => {
          if (headPos.xPos < 40 && headPos.xPos > 0) {
            return {
              ...prevPos,
              xPos: prevPos.xPos + 1,
            };
          } else if (headPos.xPos > 39) {
            return {
              ...prevPos,
              xPos: 1,
            };
          }
        });
        break;
      case "left":
        setHeadPos((prevPos) => {
          if (headPos.xPos <= 40 && headPos.xPos > 1) {
            return {
              ...prevPos,
              xPos: prevPos.xPos - 1,
            };
          } else if (headPos.xPos < 2) {
            return {
              ...prevPos,
              xPos: 40,
            };
          }
        });
        break;
      default:
        break;
    }
  };

  function generateRandomPos() {
    return Math.round(Math.random() * (40 - 1) + 1);
  }

  const hasSnakeDied = () => {
    for (let i = 0; i < tailPath.length - 1; i++) {
      if (
        tailPath[i]?.xPos === tailPath[tailLength - 1]?.xPos &&
        tailPath[i]?.yPos === tailPath[tailLength - 1]?.yPos
      ) {
        return true;
      }
    }
    return false;
  };

  const autoPilot = () => {
    if (headPos.xPos < appleLocation.xPos) {
      for (const key in tailPath) {
        const element = tailPath[key];
        if (
          headPos.xPos + 1 === element.xPos &&
          headPos.yPos === element.yPos &&
          direction === "right"
        ) {
          console.log("about to collide");
          setTimeout(() => isHeadOppositeDirection("down", "up"), 2);
        } else {
          setTimeout(() => isHeadOppositeDirection("left", "right") , 1);
        }
      }
    } else if (headPos.xPos > appleLocation.xPos) {
      for (const key in tailPath) {
        const element = tailPath[key];
        if (
          headPos.xPos - 1 === element.xPos &&
          headPos.yPos === element.yPos &&
          direction === "left"
        ) {
          console.log("about to collide");
          setTimeout(() => isHeadOppositeDirection("up", "down"), 2);
        } else {
          setTimeout(() => isHeadOppositeDirection("right", "left"), 1);
        }
      }
    } else if (headPos.xPos === appleLocation.xPos) {
      if (headPos.yPos > appleLocation.yPos) {
        for (const key in tailPath) {
          const element = tailPath[key];
          if (
            headPos.yPos - 1 === element.yPos &&
            direction === "up"
          ) {
            console.log("about to collide");
            setTimeout(() => isHeadOppositeDirection("right", "left"), 2);
          } else {
            setTimeout(() => isHeadOppositeDirection("down", "up"), 1)
          }
        }
      } else if (headPos.yPos < appleLocation.yPos) {
        for (const key in tailPath) {
          const element = tailPath[key];
          if (
            headPos.yPos + 1 === element.yPos &&
            direction === "down"
          ) {
            console.log("about to collide");
            setTimeout(() => isHeadOppositeDirection("right", "left"), 2);
          } else {
            setTimeout(() => isHeadOppositeDirection("up", "down"), 1)
          }
        }

      }
    }
  };

  // Snake's speed & controlls set
  const [timerForMovment, setTimerForMovment] = useState();

  useEffect(() => {
    !props.gameover && window.addEventListener("keydown", changeDirection);
    clearTimeout(timerForMovment)
    let speed = 100 / (tailLength / 20);
    setTimerForMovment(setTimeout(moveSnakehead, speed > 100 ? 100 : speed));
    return () => {
      clearTimeout(timerForMovment);
      window.removeEventListener("keydown", changeDirection);
    };
  }, [headPos, direction, props.gameover]);

  useEffect(() => {
    // autoPilot();
  }, [appleLocation, props.gameover, headPos]);

  // Generate new Apple location after eaten

  useEffect(() => {
    if (
      appleLocation.xPos === headPos.xPos &&
      appleLocation.yPos === headPos.yPos
    ) {
      setAppleLocation({
        xPos: generateRandomPos(),
        yPos: generateRandomPos(),
      });
      setTailLength((prevTailLength) => prevTailLength + 1);
    }
  }, [headPos, direction]);

  // Set the path for the snake tail to follow

  useEffect(() => {
    setTailPath(() => {
      let array = tailPath;
      array.push(headPos);
      tailPath.length > tailLength && array.shift();
      return [...array];
    });
    hasSnakeDied() &&
      setTailPath((prevTailPath) => {
        return prevTailPath.filter(
          (position) => position !== tailPath[tailLength - 1]
        );
      });
    hasSnakeDied() && setDirection();
  }, [headPos]);

  const didMountRef = useRef(false);

  // if snake eats himslef, game over

  useEffect(() => {
    if (didMountRef.current) {
      props.setGameover(true);
      return window.removeEventListener("keydown", changeDirection);
    }
    didMountRef.current = true;
  }, [hasSnakeDied()]);

  // set record
  useEffect(() => {
    if (tailLength - 5 > localStorage.getItem("record")) {
      localStorage.setItem("record", tailLength - 5);
    }
  }, [tailLength]);

  const resetGame = () => {
    setDirection();
    setHeadPos({ xPos: 20, yPos: 20 });
    setTailPath([{ xPos: 20, yPos: 20 }]);
    setTailLength(5);
    props.setGameover(false);
  };

  return (
    <>
      <div className="app-container">
        <div className="scoreboard">
          {!props.gameover && (
            <>
              <h1 className="currentScore">Score: {tailLength - 5}</h1>
              <h1 className="currentScore">
                Record: {localStorage.getItem("record")}
              </h1>
            </>
          )}
        </div>
        {props.gameover && (
          <Gameover
            resetGame={resetGame}
            score={tailLength - 5}
            record={localStorage.getItem("record")}
          />
        )}
        <div className="game-container">
          <Head xHeadPos={headPos.xPos} yHeadPos={headPos.yPos} />
          {tailPath?.map((tailBlock, index) => {
            tailBlock = null;
            return (
              <Tail
                key={index}
                headPos={headPos}
                tailPath={tailPath}
                index={index}
              />
            );
          })}
          <Apple appleLocation={appleLocation} />
        </div>
      </div>
    </>
  );
};

export default Game;
