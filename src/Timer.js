import React, { useState, useEffect } from 'react'
import moment from 'moment'

function Timer() {
  const [time, setTime] = useState(moment(new Date()))

  useEffect(() => {
    setInterval(() => setTime(moment(new Date())), 1000)
  }, [])

  return <div>{time.format('YYYY年MM月DD日 HH:mm:ss')}</div>
}

export default Timer
