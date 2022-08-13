const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
      },

    description: {
        type: String,
        maxLength: 500
      },

    status: {
        type: String,
        enum: ['To do', 'Doing', 'Done'],
        required: true,
      },
    dueDate: {
        type: Date,
        default: Date.now
      }
},
      {
        timestamps: true,
    })

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;