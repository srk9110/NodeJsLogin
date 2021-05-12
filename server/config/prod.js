//개발환경이 production(배포)일 때
//heroke 서비스를 이용하여 몽고디비를 관리하게 되는데 
//heroke에서 MONGO_URI를 가져옴
module.exports={
    mongoURI:process.env.MONGO_URI
}