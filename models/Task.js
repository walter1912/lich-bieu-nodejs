import { Schema, model } from "mongoose";
const { processingSchema } = require("./Event");
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    time: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    user_id: { type: Types.ObjectId, required: true },
    member: [{ type: Types.ObjectId }],
    process: [processingSchema], // Sử dụng schema của Processing ở đây
    type: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
const Task = mongoose.model("Task", taskSchema);

taskSchema.plugin(mongoosePaginate);
Task.paginate().then({});

export default Task;
