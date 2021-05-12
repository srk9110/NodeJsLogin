const express = require('express')
const app = express()
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser =require("cookie-parser");
const config=require('./config/key');
const {User} = require("./model/user");
const {auth}=require("./middleware/auth");


//bodyparser 옵션
//application/x-www-form-urlencoded 이렇게 생긴 데이터를 가져와서 분석
app.use(bodyParser.urlencoded({Pextended: true}));
//application/json을 가져와서 분석
app.use(bodyParser.json());

//token을 쿠키에 저장하기 위한 cookieParser
app.use(cookieParser());

const mongoose =require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log('MongoDB Conneted...'))
.catch(err=>console.log(err));


app.get('/api/hello',(req,res)=>{
  res.send("안뇽");
});


app.get('/', (req, res) => {
  res.send('Hello World!333')
})

app.post('/api/users/register',(req, res)=>{

  //비밀번호 암호화
  //=>user.js


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

//login
app.post('/api/users/login',(req,res)=>{
  //요청된 email을 db에서 찾는다
  User.findOne({email: req.body.email},(err, userInfo)=>{
    if(!userInfo){
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다."
      })
    
      //요청된 email이 db에 있다면 비밀번호가 맞는지 확인
      //user.js에서 비교하고 isMatch(boolean) 리턴받음
    }
    userInfo.comparePassword(req.body.password, (err, isMatch)=>{
      console.log("req.body.password:"+req.body.password);
      if(!isMatch){
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다."
      })};

      //비밀번호가 맞다면 token을 생성
      //user.js에서 
      userInfo.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        
        //토큰을 쿠키에 저장한다
        res.cookie("x_auth",userInfo.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id});
      });
    });
    
  });
});

//유저인증
app.get('/api/users/auth',auth,(req,res)=>{

  //auth 미들웨어 통과 후 (auth: ture)
  res.status(200).json({
    _id:req.user_id,
    isAdmin: req.user.role===0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname:req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });

});


//로그아웃
app.get('/api/users/logout',auth,(req,res)=>{

  //토큰만 지우면 인증이 풀리기 때문에 로그아웃됨
  User.findOneAndUpdate(
    {_id:req.user._id}, //user._id로 유저찾기
    {token:""}, //토큰 지워주기 (mongoDB에서도 삭제)
    (err, user)=>{
      if(err) return res.json({
        success:false,
        err
      });
      return res.status(200).send({
        success:true
      });
    }); 

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

