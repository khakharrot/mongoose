const express= require("express")
const router=express.Router()
const User= require("../Model/model")

//list of all the users
router.get("/",async (req,res)=>{
    const persons=await User.find()
    res.send({msg:"users found",persons})
})

// find one from a certain food
router.get("/oneFood", async(req,res)=>{
    const {food}=req.body
    const theFoodie= await User.findOne({food})
    res.send({msg:"the foodie is",theFoodie})
}) 

// search by id
router.get ("/byid/:personId", async(req,res)=>{
    const {personId}=req.params
    const userId= await User.findById({_id:personId })
    res.send({msg:"the person is",userId})
}) 

//  search by id and edit 
router.get ("/edit/:personId", async(req,res)=>{
    const food= "hamburger"
    const {personId}=req.params
    User.findById({_id:personId }, (err,data)=>{
    data.favoriteFoods.push(food)
    data.save()
    })
    res.send({msg:"User modified"})      
}) 

// update age

router.put ("/editAge/:personName", async(req,res)=>{
    const{personName}=req.params
    const edited= await User.findOneAndUpdate({name:personName},{$set:req.body})
    res.send({msg:"age modified",edited})
})

// delete by id

router.delete("/delete/:personId", async(req,res)=>{
    const {personId}=req.params
    const deleted= await User.findByIdAndDelete ({_id:personId})
    res.send({msg:"user deleted",deleted})
})

// delete all "Mary"

router.delete ("/deleteAll",async(req,res)=>{
    const nameToDelete="Mary"
    const deleteAll= await User.deleteMany({name:nameToDelete})
    res.send({msg:"users deleted",nameToDelete})
})



module.exports=router