import React, { useState } from 'react'
import { Input, Button, message, Checkbox } from 'antd'
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons'
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
        time: new Date(),
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

  function deleteHandle(index) {
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

      <div style={{ margin: 50 }}>
        {list.map((item, index) => (
          <div
            key={index}
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: get(item, 'isDeleted') ? 'red' : 'black',
              textDecoration: get(item, 'isDeleted') ? 'line-through' : 'none',
              margin: 20,
              minHeight: 200,
              border: 'solid 1px rgba(0,0,0,0.2)',
              borderRadius: 10,
              padding: '10px 20px',
            }}
          >
            <div>
              <Checkbox
                onChange={(e) => checkChange(e, index)}
                checked={get(item, 'isChecked')}
                style={{ margin: '20 0 10' }}
              />
              {get(item, 'isDeleted') ? (
                <RedoOutlined
                  style={{ color: 'skyblue', marginLeft: 20 }}
                  onClick={() => deleteHandle(index)}
                />
              ) : (
                <DeleteOutlined
                  style={{ color: 'red', marginLeft: 20 }}
                  onClick={() => deleteHandle(index)}
                />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: 'solid 1px rgba(0,0,0,0.2)',
                borderTop: 'solid 1px rgba(0,0,0,0.2)',
                margin: '20px 0',
                padding: '10px 0',
              }}
            >
              <div
                style={{
                  marginRight: 100,
                }}
              >
                <div>
                  {index + 1}. {get(item, 'value')}
                </div>
                <div>过会儿再做</div>
              </div>

              <div>
                <div>{moment(get(item, 'time')).format('MMM')}</div>
                <div>{moment(get(item, 'time')).format('HH:mm:ss')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
