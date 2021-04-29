const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const {User} = require("./model/user");
const config=require('./config/key');


//bodyparser 옵션
//application/x-www-form-urlencoded 이렇게 생긴 데이터를 가져와서 분석
app.use(bodyParser.urlencoded({Pextended: true}));
//application/json을 가져와서 분석
app.use(bodyParser.json());

const mongoose =require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log('MongoDB Conneted...'))
.catch(err=>console.log(err));



app.get('/', (req, res) => {
  res.send('Hello World!333')
})

app.post('/register',(req, res)=>{

  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user=new User(req.body);

  //save : mongoDB 메서드 , req에서 오는 정보들(body)를 저장함
  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})