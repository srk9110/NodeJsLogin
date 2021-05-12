const {User} = require("../model/user");

let auth = (req, res, next)=>{

    //인증처리

    //1. 클라이언트 쿠키에서 토큰을 가져온 후
    let token=req.cookies.x_auth;

    //2. 토큰을 복호화해서 유저를 찾는다
    User.findByToken(token,(err, user)=>{
        if(err) throw err;

        //클라이언트에 유저가 없음
        if(!user) return res.json({
            isAuth: false,
            error: true
        });

        //index.js에서 사용할 수 있도록 넣어줌
        req.token=token;
        req.user=user;
        //할거 다 했으면 index로 돌아가야함
        next();
    });

    //3. 유저가 있으면 인증 ok

    //4. 유저가 없으면 인증 x
}

module.exports={auth};