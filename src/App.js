import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [arr, setArr] = useState(Array(9).fill(null))
  const [status, setStatus] = useState('GAMING...')

  function handleReset() {
    setArr(Array(9).fill(null))
    setCount(0)
    setStatus('GAMING...')
  }

  function handleClick(index) {
    if (arr[index] || status !== 'GAMING...') {
      return
    }

    arr[index] = count % 2 ? 'X' : 'O'
    setCount(count + 1)
    setArr([...arr])

    //行相等
    if (arr[0] && arr[0] === arr[1] && arr[1] === arr[2]) {
      setStatus(arr[0] + '  WIN')
    }

    if (arr[3] && arr[3] === arr[4] && arr[4] === arr[5]) {
      setStatus(arr[3] + '  WIN')
    }

    if (arr[6] && arr[6] === arr[7] && arr[7] === arr[8]) {
      setStatus(arr[6] + '  WIN')
    }

    //列相等
    if (arr[0] && arr[0] === arr[3] && arr[3] === arr[6]) {
      setStatus(arr[0] + '  WIN')
    }

    if (arr[1] && arr[1] === arr[4] && arr[4] === arr[7]) {
      setStatus(arr[1] + '  WIN')
    }

    if (arr[2] && arr[2] === arr[5] && arr[5] === arr[8]) {
      setStatus(arr[2] + '  WIN')
    }

    //对角相等
    if (arr[0] && arr[0] === arr[4] && arr[4] === arr[8]) {
      setStatus(arr[0] + '  WIN')
    }

    if (arr[2] && arr[2] === arr[4] && arr[4] === arr[6]) {
      setStatus(arr[2] + '  WIN')
    }
  }

  return (
    <div className="wrapper">
      <div>{status}</div>
      <button onClick={handleReset}>重置</button>
      <div className="rows">
        {arr.slice(0, 3).map((item, index) => (
          <div className="box" key={index} onClick={() => handleClick(index)}>
            {item}
          </div>
        ))}
      </div>
      <div className="rows">
        {arr.slice(3, 6).map((item, index) => (
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
        {arr.slice(6, 9).map((item, index) => (
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
  )
}

export default App
