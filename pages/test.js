import ConnectDB from '../db/ConnectDB'



import React from 'react'

const test = async() => {
  ConnectDB()
  const res = await fetch('http://localhost:3000/api/user')
  const {data} = await res.json()
  return (
    {data}
  )
}

export default test
