import ConnectDB from '../../db/ConnectDB'

ConnectDB()

export default async (req, res) => {
  
  res.json({ test: 'test' })
}
