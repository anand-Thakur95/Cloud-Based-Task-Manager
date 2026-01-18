import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import UserRouter from "./route/User.router.js"

const app = express()
const port = 3000
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/hy', (req, res) => {
  res.send('Hello World! gest')
});

app.use('/api/user', UserRouter)

mongoose.connect('mongodb+srv://satul95060_db_user:Anand$mango@cluster0.lubwwkb.mongodb.net/')
.then(()=> console.log("Database connected successfully"))
.catch(err => console.error('Database connection failed:', err));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
