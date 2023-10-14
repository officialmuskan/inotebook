const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "QWERTYUIOPASDFGHJKLZXCVBNM"

//Create a user using:"post "/api/auth/". dont require auth
router.post('/create',[body('name', 'enter a valid name').notEmpty(),
body('email').isEmail(),
body('password').isLength({min: 5})]
,async (req, res)=>{
    let success = false;
        // if error retun them
    const result = validationResult(req);
    if (!result.isEmpty()) {
    return res.status(400).json({success, errors: result.array() });
    }
//  check whether with same email exists
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({success, error: "already"})
        }
        const salt = await bcrypt.genSalt(10);
        
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        success = true
        //   console.log(jwt_data)
        res.json({success, auth_token})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("eror occr")
    }
  
})

//authenticate required
router.post('/login',[
body('email').isEmail(),
body('password').exists()]
,async (req, res)=>{
        //error ayega
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                success = false
                return res.status(400).json({ errors: "Please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({ errors: "Please try to login with correct credentials"});
            }
            const data = {
                user:{
                    id:user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET)
            success = true
            //   console.log(jwt_data)
            res.json({auth_token, success})
        }
        catch(error){
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }

    }
)


//get user login details  login required

router.post('/getuser', fetchUser ,async (req, res)=>{
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password");
        res.send(user)
    } 
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})



module.exports = router