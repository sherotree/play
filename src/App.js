import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('GAMING...')
  const [historySteps, setHistorySteps] = useState([Array(9).fill(null)])
  const [currentArr, setCurrentArr] = useState(Array(9).fill(null))
  const list = Array(count + 1).fill(0)
  const arr = historySteps[count]

  function handleReset() {
    setCount(0)
    setStatus('GAMING...')
    setHistorySteps([Array(9).fill(null)])
    setCurrentArr(Array(9).fill(null))
  }

  function handleClick(index) {
    if (arr[index] || status !== 'GAMING...') {
      return
    }

    const temp = [...arr]
    temp[index] = count % 2 ? 'X' : 'O'

    historySteps.push([...temp])
    setCount(count + 1)
    setHistorySteps([...historySteps])
    setCurrentArr([...temp])

    const hash = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < hash.length; i++) {
      if (
        arr[hash[i][0]] &&
        arr[hash[i][0]] === arr[hash[i][1]] &&
        arr[hash[i][1]] === arr[hash[i][2]]
      ) {
        setStatus(arr[hash[i][0]])
      }
    }
  }

  return (
    <div className="wrapper">
      <div>{status}</div>
      <button onClick={handleReset}>重置</button>
      <div className="flexBox">
        <div className="chess">
          <div className="rows">
            {currentArr.slice(0, 3).map((item, index) => (
              <div
                className="box"
                key={index}
                onClick={() => handleClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="rows">
            {currentArr.slice(3, 6).map((item, index) => (
              <div
                className="box"
                key={index}
                onClick={() => handleClick(index + 3)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="rows">
            {currentArr.slice(6, 9).map((item, index) => (
              <div
                className="box"
                key={index}
                onClick={() => handleClick(index + 6)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="historyList">
          <ul>
            {list.map((item, index) => (
              <li key={index + item}>
                <button
                  onClick={() => {
                    setCurrentArr(historySteps[index])
                  }}
                >
                  第{index}步
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
