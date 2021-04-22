const express = require('express')
const app = express()
const port = 3000

const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://dbuser:abcd1234@bolierplate.d6lmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log('MongoDB Conneted...'))
.catch(err=>console.log(err));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})