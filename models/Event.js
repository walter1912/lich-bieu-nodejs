const { Schema, model, Types } = require("mongoose");
// const IEvent = require("../interfaces/IEvent");
// const Processing = require("../interfaces/IProcessing");
const mongoosePaginate = require("mongoose-paginate-v2");

// Tạo schema
const processingSchema = new Schema({
  user_id: { type: Types.ObjectId, required: true },
  current_process: { type: String, required: true },
  description: { type: String, required: true },
  updateAt: { type: Date, required: true },
});

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    time: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    user_id: { type: Types.ObjectId, required: true },
    member: [{ type: Types.ObjectId }],
    description: { type: String, required: true },
    process: [processingSchema], // Chỉ định kiểu Processing của bạn
    tag: { type: String, required: true },
    type: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
eventSchema.plugin(mongoosePaginate);
const Event = model("Event", eventSchema);
Event.paginate().then({});

module.exports = Event;
