const mongoose = require('mongoose');

const TodoSchema = ({
    task : String
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;