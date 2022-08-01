// import React, {useState} from "react";

// export function MoveSnakeHead({direction, setHeadPos, headPos}) {
//   switch (direction) {
//     case "down":
//       setHeadPos((prevPos) => {
//         if (headPos.yPos < 40 && headPos.yPos > 0) {
//           return {
//             ...prevPos,
//             yPos: prevPos.yPos + 1,
//           };
//         } else if (headPos.yPos > 39) {
//           return {
//             ...prevPos,
//             yPos: 1,
//           };
//         }
//       });
//       break;
//     case "up":
//       setHeadPos((prevPos) => {
//         if (headPos.yPos <= 40 && headPos.yPos > 1) {
//           return {
//             ...prevPos,
//             yPos: prevPos.yPos - 1,
//           };
//         } else if (headPos.yPos < 2) {
//           return {
//             ...prevPos,
//             yPos: 40,
//           };
//         }
//       });
//       break;
//     case "right":
//       setHeadPos((prevPos) => {
//         if (headPos.xPos < 40 && headPos.xPos > 0) {
//           return {
//             ...prevPos,
//             xPos: prevPos.xPos + 1,
//           };
//         } else if (headPos.xPos > 39) {
//           return {
//             ...prevPos,
//             xPos: 1,
//           };
//         }
//       });
//       break;
//     case "left":
//       setHeadPos((prevPos) => {
//         if (headPos.xPos <= 40 && headPos.xPos > 1) {
//           return {
//             ...prevPos,
//             xPos: prevPos.xPos - 1,
//           };
//         } else if (headPos.xPos < 2) {
//           return {
//             ...prevPos,
//             xPos: 40,
//           };
//         }
//       });
//       break;
//     default:
//       break;
//   }
// };