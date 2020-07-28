import React, { useState } from 'react'
import moment from 'moment'

function Timer() {
  const [time, setTime] = useState(
    moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss'),
  )

  setInterval(
    () => setTime(moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss')),
    1000,
  )

  console.log(time)
  return <div>{time}</div>
}

export default Timer
