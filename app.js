const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 8000
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./dbConfig')

const corsOptions = {
    origin: 'http://localhost:5173'
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/students', require('./routes/studentRoutes'));
app.use('/institutes', require('./routes/instituteRoute'));
app.use('/grades', require('./routes/gradeRoutes'));
app.use('/subjects', require('./routes/subjectRoutes'));
app.use('/exams', require('./routes/examRoutes'));
app.use('/questions', require('./routes/questionRoutes'));

app.listen(PORT,()=>console.log(`Server Running on ${PORT}`));
connectDB()
    .then(()=>{
        console.log('Connected to Mongo DB')
    })
    .catch(err =>console.log(err))