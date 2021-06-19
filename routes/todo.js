const { compareSync } = require('bcryptjs');
const express = require('express')
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
const Todo = require('../models/Todo');
const User = require('../models/User');


//CRUD Create Read Update Delete
//Read - Show all the todos
router.get('/',ensureAuthenticated, (req,res)=> {
    tasks = req.user.todo
    //tasks = [{"task":"Task1"},{"task":"Task2"},{"task":"Task3"}]
    res.render("todo/all",{
        todo:tasks,
})})


//Create
router.post('/add',ensureAuthenticated, (req,res)=> {
    task = req.body.task;
    todo = new Todo({task})
    req.user.todo.push(todo);
    req.user.save();
    tasks = req.user.todo
    res.render("todo/all",{
        todo:tasks,
    })
})

//Delete
router.get('/delete/:id',ensureAuthenticated, async (req,res)=>{
    id = req.params.id
    user = req.user
    const hello = await User.findOneAndUpdate({  _id:user.id },{ $pull:{  todo:{task: id} }  }, function(err,doc) {
        console.log(doc)
    })
    console.log(hello)
    tasks = user.todo
    res.render("todo/all",{
    todo:tasks,  
});
})

//Update
router.get('/update/:id',ensureAuthenticated, async(req,res)=>{
    id = req.params.id
    user = req.user
    const query = { _id : id }

    User.findOne({_id:user._id},{todo:{task: id}}).then(doc => {
        console.log(doc)
        console.log(doc.todo)
        item = doc.todo.id;
        item["name"] = "new name";
        doc.save();
      
        //sent respnse to client
      }).catch(err => {
        console.log('Oh! Dark' +err)
      });

    tasks = user.todo
    res.render("todo/all",{
    todo:tasks
    })
    
})
    
router.get('/update',(req,res)=>{
    res.send("In Update");
})





module.exports = router;