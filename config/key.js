//개발환경이 develope이면 dev.js export
//production(배포)일땐 prod export
//process.env.NODE_ENV : 환경변수
if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod');
} else {
    module.exports=require('./dev');
}