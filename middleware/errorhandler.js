



const errorhandler = (err,req,res,next) =>{
    console.log("hi i am into errorhandler")
   const status = (res.status|| 500 );
   res.json({message :err.message })
}
module.exports = errorhandler