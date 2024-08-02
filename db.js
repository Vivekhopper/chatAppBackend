const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
function connection(){
    const mongoURI=process.env.mongoURI
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("db connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connection