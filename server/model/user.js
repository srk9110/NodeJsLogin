const mongoose=require('mongoose');
// bcrypt암호화 라이브러리 (salt를 이용해 암호화)
const bcrypt=require('bcrypt');
//saltRounds : salt가 몇글자인지 설정 및 salt 생성
const saltRounds=10;
//jsonwebtoken (토큰생성)
const jwt=require('jsonwebtoken');

const userSchema=mongoose.Schema({
    name : {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //space 삭제
        unique: 1
    },
    password: {
        type: String,
        minlnegth: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, //1: admin 0:user
        default: 0
    },
    image: String,
    
    //유효성 검사
    token: {
        type: String
    },
    //토큰 유효기간
    tokenExp: {
        type: Number
    }
});

//pre: 유저 정보(비밀번호)를 암호화 하기 위한 mongoose의 기능
//index.js에서 user.save를 하기 전에 function을 진행하게 됨
//function 진행 후 next 파라미터를 통해 index.js의 user.save진행
userSchema.pre('save', function(next){
    
    //userSchema
    var user=this;

    //user가 password를 수정할때만 암호화 진행!
    if(user.isModified('password')){
        
        //비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
    
                //성공하면 user password를 hash값로 교체
                user.password=hash;
                next();
            })
        })
    } else {
        //비밀번호를 바꾸지 않을때는 그냥 user.js로 나가기
        next();
    }
});

//로그인 기능시 암호 비교
//Schema.methods.UserCustomfunction = fucntion(ddd,cb)
//=>mongoose 의 instance methods 속성 문법
//스키마 오브젝트에 사용자 정의 함수를 할당함
userSchema.methods.comparePassword=function(plainPassword, callback){
    //plainPassword: 1234 , 암호화된 비밀번호: hash값  을 비교해야함
    //plainPasword를 암호화해서 비교하면 됨(hash값 복호화는 안됨)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        //에러가 없고 (null), 매치된다 (isMatch==true)
        callback(null, isMatch);
    });
}

//로그인 성공 시 토큰 만들기
userSchema.methods.generateToken=function(callback){

    var user=this;
    console.log(user);

    //jsonwebtoken 을 이용해서 토큰을 생성하기
    //user._id + string(secretToken) = token
    var token=jwt.sign(user._id.toHexString(), 'secretToken');
    user.token=token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
    })
}

//토큰으로 유저찾기 위해 복호화
//Schema.methods.statics.findByToken = fucntion(ddd,cb)
//=>mongoose 의 statics 속성 문법
//스키마 오브젝트에 static 함수 할당 
userSchema.statics.findByToken=function(token, callback){
    var user = this;

    //토큰 decode (token - secretToken = user._id(decoded))
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 db에 있는 토큰이 일치하는 지 확인
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return callback(err);

            callback(null, user);
        });
    });

}

const User=mongoose.model('user',userSchema);

module.exports={User};