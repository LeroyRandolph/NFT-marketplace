import { useEffect, useState } from 'react'

let g_setData, g_setIsLoading

async function fetchData() {
  g_setIsLoading(true)
  await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Process: 'GetData',
      Table: 'TABLE_USER',
      Columns: 'username',
      Conditions: 'username = \'test6\'',
      Values: null,
      Orderby: null,
      Ordersort: null,
      Extra: null,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      g_setData(data)
      g_setIsLoading(false)
    })
}

function Page() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(async () => {
    g_setData = setData
    g_setIsLoading = setIsLoading
  }, [])

  if (isLoading) {
    return <p>Loading....</p>
  }
  if (!data) {
    return (
      <div>
        <button onClick={fetchData}>Click Here to FETCH DATA</button>
      </div>
    )
  }

  return (
    <div>
      <p>Status: {data.Status}</p>
      <p>Message: {data.Message}</p>
      <p>SQL Statement: {data.SQL}</p>
      <br></br>
      <p>Current Sample:</p>
      <h1>All Data in MarketPlace with ASC Ordering</h1>
      <br></br>
      <p>
        Results: <br></br>
      </p>
      {data.Results.map((item) => (
        <>
          <p>email: {item.email}</p>
          <p>Username: {item.username}</p>
          <p>SALT: {item.SALT}</p>
          <p>ID: {item.USER_ID}</p>
          <p>CollectionID: {item.Collection_ID}</p>
          <p>--------------------------------</p>
        </>
      ))}
    </div>
  )
}

export default Page
