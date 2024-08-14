

// const getcontact=  (request,response)=>{response.send("success")}


// const createcontact=  (req,res)=>{
//     console.log("the body is : ",req.body);
//     const {name,email,city} = req.body;
//     if(!name || !email||!city){
//       res.status(400)
//       throw new Error("all fields are mandatory");
//     }
//       res.send("success")
    

    
//     }


const getcontacts=  (req,res)=>{connection.query('SELECT * FROM backend', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
    return;
  }
  res.json(results).send(results);
});}
// const deletecontact=  (req,res)=>{res.send(`data successfully added ${req.params.id}`)}




module.exports ={ getcontacts} ;