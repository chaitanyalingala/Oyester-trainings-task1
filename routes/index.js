const express = require('express')
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

//Welcome Page
router.get('/', (req,res) => res.render("welcome"))
//DashBoard Handle
router.get('/dashboard', ensureAuthenticated ,(req,res) => 
    res.render("dashboard",{
        name:req.user.name
}))

router.get('/q1',(req,res) =>{
    res.render("Q/q1")
})
router.get('/q2',(req,res) =>{
    res.render("Q/q2")
})
    
module.exports = router;