require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db')
const app = express();
const http = require('http');
const server = http.createServer(app);
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 3300
const router = require('./routes')
const models = require('./models')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
    await sequelize.authenticate()
    await sequelize.sync()
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()