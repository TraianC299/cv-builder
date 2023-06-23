import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

const gigolo = () => {
const [list, setList] = useState([

  { id: 1, name: 'shoes' }, 
  { id: 2, name: 'hat' },
  { id: 3, name: 'socks' }
])


  return (
    <ReactSortable
      list={list}
      setList={setList}
    >
      {list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      
    </ReactSortable>
  )
}

export default gigolo