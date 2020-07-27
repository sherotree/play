import React, { useState } from 'react'
import './App.css'
import { Button } from 'antd'

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('GAMING...')
  const [historySteps, setHistorySteps] = useState([Array(9).fill(null)])
  const [currentArr, setCurrentArr] = useState(Array(9).fill(null))
  const list = Array(count + 1).fill(0)
  const arr = historySteps[count]
  const [resultList, setResultList] = useState([])
  const [highlightCell, setHighlightCell] = useState([])

  function handleReset() {
    setCount(0)
    setStatus('GAMING...')
    setHistorySteps([Array(9).fill(null)])
    setCurrentArr(Array(9).fill(null))
    resultList.push((count % 2 ? 'X' : 'O') + '  Reset')
    setResultList([...resultList])
    setHighlightCell([])
  }

  function handleClick(index) {
    if (arr[index] || status !== 'GAMING...') {
      return
    }

    console.log(count)

    const tempArr = [...arr]
    tempArr[index] = count % 2 ? 'X' : 'O'

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

    let flag = true
    for (let i = 0; i < hash.length; i++) {
      const temp = hash[i]
      if (
        tempArr[temp[0]] &&
        tempArr[temp[0]] === tempArr[temp[1]] &&
        tempArr[temp[1]] === tempArr[temp[2]]
      ) {
        setStatus(tempArr[temp[0]] + '  WIN')
        resultList.push(tempArr[temp[0]] + '  WIN')
        flag = false
        break
      }
    }
    const midArr = []
    for (let i = 0; i < hash.length; i++) {
      const temp = hash[i]

      if (
        tempArr[temp[0]] &&
        tempArr[temp[0]] === tempArr[temp[1]] &&
        tempArr[temp[1]] === tempArr[temp[2]]
      ) {
        for (let j = 0; j < 3; j++) {
          if (!midArr.includes(temp[j])) {
            midArr.push(temp[j])
          }
        }
        console.log(midArr, '=====')

        setHighlightCell(midArr)
      }
    }

    if (count === 8 && flag) {
      resultList.push('X and O are equal!')
      setResultList([...resultList])
    }

    setResultList([...resultList])
    historySteps.push([...tempArr])
    setCount(count + 1)
    setHistorySteps([...historySteps])
    setCurrentArr([...tempArr])
  }

  console.log(highlightCell, '-----')
  return (
    <div className="wrapper">
      <div>{status}</div>
      <button onClick={handleReset}>重置</button>
      <div className="flexBox">
        <div className="chess">
          {[
            currentArr.slice(0, 3),
            currentArr.slice(3, 6),
            currentArr.slice(6, 9),
          ].map((x, i) => (
            <div key={i}>
              <div className="rows">
                {x.map((item, index) => (
                  <div
                    className="box"
                    key={index}
                    onClick={() => handleClick(index + i * 3)}
                    style={{
                      color:
                        currentArr.toString() ===
                          historySteps[historySteps.length - 1].toString() &&
                        highlightCell.includes(index + i * 3)
                          ? 'red'
                          : 'black',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="historyList">
          {list.map((item, index) => (
            <div key={index + item} style={{}}>
              <Button
                type="primary"
                style={{ margin: '5px 20px' }}
                onClick={() => {
                  setCurrentArr(historySteps[index])
                }}
              >
                第{index}步
              </Button>
            </div>
          ))}
        </div>
        <div>
          <ul>
            {resultList.map((item, index) => (
              <li key={index} style={{ width: 200 }}>
                {index + 1}:{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
