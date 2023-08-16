const { Schema, model, Types } = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const processingSchema = new Schema({
  user_id: { type: Types.ObjectId, required: true },
  current_process: { type: String, required: true },
  description: { type: String, required: true },
  updateAt: { type: Date, required: true },
});

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
taskSchema.plugin(mongoosePaginate);
const Task = model("Task", taskSchema);

Task.paginate().then({});

module.exports = Task;
