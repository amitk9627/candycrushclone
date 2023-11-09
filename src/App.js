import { useCallback, useEffect } from "react";
import { useState } from "react";

const width = 10;
const candyColors = [
  'blue',
  'green',
  'red',
  'yellow'
]

const App = () => {
  const [currColorArr, setCurrrColorArr] = useState([]);
  const [data, setData] = useState("")
  const [score, setScore] =useState(0);
console.log(score)
  const checkForColumnOfThree = (id) => {

    for (let i = 0; i <= 79; i++) {
      const columnThree = [i, i + width, i + width * 2];
      const decidedColor = currColorArr[id];
      if (columnThree.every((square) => currColorArr[square] === decidedColor)) {
        columnThree.forEach(square => currColorArr[square] = "")
      }
    }
  }
  const checkForColumnOfFour = (id) => {

    for (let i = 0; i <= 69; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currColorArr[id];
      if (columnFour.every((square) => currColorArr[square] === decidedColor)) {
        columnFour.forEach(square => currColorArr[square] = "")
      }
    }
  }
  const checkForRowOfFour = (id) => {

    for (let i = 0; i < 96; i++) {
      const RowFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currColorArr[id];
      const notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99]
      if (notValid.includes(id)) {
        continue;
      }
      if (RowFour.every((square) => currColorArr[square] === decidedColor)) {
        RowFour.forEach(square => currColorArr[square] = "")
      }
       moveIntoSquareBelow()
    }
   
  }
  const checkForRowOfThree = (id) => {

    for (let i = 0; i < 97; i++) {
      const RowThree = [i, i + 1, i + 2];
      const decidedColor = currColorArr[id];
      const notValid = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99]
      if (notValid.includes(i)) {
        continue;
      }
      if (RowThree.every((square) => currColorArr[square] === decidedColor)) {
        RowThree.forEach(square => currColorArr[square] = "")
      }
    }
    moveIntoSquareBelow();
  }
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 100 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currColorArr[i] === '') {
        setScore(score+1)
        let randomNo = Math.floor(Math.random() * candyColors.length);
        currColorArr[i] = candyColors[randomNo];
      }
      if (currColorArr[i + width] === "") {
        currColorArr[i + width] = currColorArr[i]
        currColorArr[i] = "";
      }else{
        let randomNo = Math.floor(Math.random() * candyColors.length);
        currColorArr[i] = candyColors[randomNo];
      }
    }
  }


  const handleClick = (e) => {
    setData(Number(e.target.getAttribute("data-id")))
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColors = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColors);
    }
    setCurrrColorArr(randomColorArrangement);
  }
  useEffect(() => {
    createBoard();

  }, [])
  useEffect(() => {
    let timer = ""

    if (data) {
      timer = setInterval(() => {
        checkForColumnOfFour(data);
        checkForColumnOfThree(data);
        checkForRowOfFour(data);
        checkForRowOfThree(data);
        moveIntoSquareBelow();
        setCurrrColorArr([...currColorArr]);
        setData("")
        moveIntoSquareBelow()
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [data, moveIntoSquareBelow])


  return (
    <div className="App">
      <div className="game">
        {
          currColorArr.map((currcandy, i) =>
            <img
              key={i}
              src=""
              alt={i}
              style={{ backgroundColor: currcandy }}
              data-id={i}

              onClick={handleClick}
            />
          )
        }
      </div>
      <div>
        <p>total :- {score}</p>
      </div>
    </div>
  );
}

export default App;
