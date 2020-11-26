const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express();

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Koneksi ke MongoDB berhasil')
})
app.get('/',()=>{
    console.log('hi')
})

app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Berjalan pada port ${port}`);
})
