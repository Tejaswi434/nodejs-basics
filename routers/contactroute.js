const express= require("express");
const router = express.Router(); 
const {getcontacts,createcontact,getcontact,deletecontact}= require("../controllers/contactcontrollers");

 
// router.route ("/:id").delete(deletecontact).get(getcontact);
router.route("/s").get(getcontacts)


module.exports =  router; 