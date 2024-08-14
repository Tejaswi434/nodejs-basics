const express = require("express");
const routes=require('./routers/contactroute.js');
const errorhandler = require("./middleware/errorhandler.js");
const app = express();
const port = 5001 ;
const cors = require("cors");
app.use(express.json()); 
// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
app.use(cors());
// Create a connection to the database
const connection = mysql.createPool({
  host: 'localhost',    // Database host (usually 'localhost')
  user: 'root',         // Your database username
  password: 'M1racle@123', // Your database password
  database: 'Tejaswi'      // Your database name
});
// let connection;
// (async () => {
//     connection = await mysql.createPool({
//         host: 'localhost',    // Database host (usually 'localhost')
//         user: 'root',         // Your database username
//         password: 'M1racle@123', // Your database password
//         database: 'Tejaswi'      // Your database name
//     });
// })();

app.get("/allimages",async (request,response) =>{
   const query = `select * from images` ;
   
   try{
    const rows =  await connection.query(query);
   response.json(rows[0]);
  console.log(await connection.query(query));
   }
   catch(error ){
    response.json({error : "server issue"})
   }
})   

//////////////// path params

app.get("/imagepath/:id",async(req,res)=>{

  const {id} = req.params ;
  const query = `select * from images where id = ?`; 
  try{
    const result = await connection.query(query,[id]) ;

    res.json({"status" : "successs"})
  }
  catch( error){
 res.send("error");
  }
})

app.post("/imagepost", async (req,res)=>{ 

  const {url} = req.body;
  const data = `insert into images(url) values(?)` ; 
  try{
    const [ firstone]= await connection.execute(data,[url])
    console.log(firstone);
    
    if( firstone.affectedRows>0){
      res.status(200).json("success");
    }
    else{
      res.status(300);
    }

  
  } 

    catch(error) {
     
  res.json({error: "unable to connect"}).status(500);


    }
})


app.put("/imageupdate" , async(req,res)=>{
      const {url,id} = req.body;
      const data = `update images set url = ? where id=?`
      try{
      const [result]= await connection.execute(data,[url,id])
      res.json({"status":"success"}).status(200)
      }
      catch(error) {
        res.json({"error" : "data not  updated"})
      }
}) 


app.delete("/imagedelete" , async(req,res)=>{
  const {id} = req.body;
  const data = `delete from images where id = ?` ;
  try{
  const result = await connection.query(data,[id]); 
  res.json({"status":"succeded"})
  }
  catch(error){
    res.send("not working syntax error")
  }

})

app.listen(5001 ,() => {
  console.log('Server is running on port 5001');
});
