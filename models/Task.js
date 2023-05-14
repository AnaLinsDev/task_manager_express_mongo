const mongoose = require("mongoose");

// schema ->  defines the name and type of the fields
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
    maxlength: [20, 'Name must have less than 21 characters']
  },
  completed: {
    type: Boolean,
    required: [true, 'Must provide a status'],
    default: false
  },
});

// model -> will 'connect' the schema and the name of the Collection
module.exports = mongoose.model("Task", TaskSchema);
