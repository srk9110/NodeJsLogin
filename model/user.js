const mongoose=require('mongoose');

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

const User=mongoose.model('User',userSchema);

module.exports={user};