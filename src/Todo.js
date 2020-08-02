import React, { useState } from 'react'
import { Input, Button, message, Checkbox } from 'antd'
import moment from 'moment'
import { get } from 'lodash'

function Todo() {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])

  function inputChange(e) {
    setValue(e.target.value)
  }

  function addHandle() {
    if (value !== '') {
      list.push({
        value: value,
        isChecked: false,
        isDeleted: false,
        time: moment(new Date()).format('HH:mm:ss'),
      })
      setList([...list])
      setValue('')
    } else {
      message.info('请输入内容！')
    }
  }

  function checkChange(e, index) {
    list[index].isChecked = e.target.checked
    setList([...list])
  }

  function deleteHandle(e, index) {
    list[index].isDeleted = !list[index].isDeleted
    setList([...list])
  }

  console.log(list)

  return (
    <div>
      <Input
        style={{ width: 100, margin: 100 }}
        onChange={inputChange}
        value={value}
      />
      <Button onClick={addHandle}>增加</Button>

      <div>
        {list.map((item, index) => (
          <div
            key={index}
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: get(item, 'isDeleted') ? 'lightgray' : 'black',
              textDecoration: get(item, 'isDeleted') ? 'line-through' : 'none',
            }}
          >
            {index + 1}. {get(item, 'value')}
            <span style={{ fontSize: '12px' }}>{get(item, 'time')}</span>
            <Checkbox
              onChange={(e) => checkChange(e, index)}
              checked={get(item, 'isChecked')}
            />
            <Button onClick={(e) => deleteHandle(e, index)}>
              {get(item, 'isDeleted') ? '恢复' : '删除'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
