const router = require('express').Router();
const jwt =require("jsonwebtoken");
const employeeDATA = require('../model/employee')
router.get('/employeelist',async(req,res)=>{
    try {
        let data = await employeeDATA.find()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
router.get('/employeelist/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let data = await employeeDATA.findById(id)
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
router.post('/employeelist',async(req,res)=>{
    try {
        console.log(req.body)
        const { name, location, position ,salary } = req.body;
        const employee = await employeeDATA({ name, location, position, salary });
        jwt.verify(req.body.token,"ict",(error,decoded)=>{
            if (decoded && decoded.email) {
                
                employee.save()  ;
                res.json({message:"Created Succesfully"});
                
            } else {
                res.json({message:"Unauthorised User"});
                
            }
    
           })
        
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})
router.put('/employeelist/:id',async(req,res)=>{
    try {
       id = req.params.id
       let updateData = {$set:req.body}
       const updated = await employeeDATA.findByIdAndUpdate(id, updateData)
        res.json({message:"Updated successfully"})
    } catch (error) {
        // console.log(error)
        res.send('error')
    }
})
router.delete('/employeelist/:id',async(req,res)=>{
    try {
        let id = req.params.id
       const updated = await employeeDATA.findByIdAndDelete(id)
       res.json({message:"Deleted successfully"})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
})
module.exports = router