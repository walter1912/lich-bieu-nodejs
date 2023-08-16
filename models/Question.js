const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
/*
 `id` int(11) NOT NULL,
  `id_nv` int(11) NOT NULL,
  `name` text NOT NULL,
  `phone` int(11) NOT NULL,
  `question` text CHARACTER SET utf8 NOT NULL,
  `answer` text CHARACTER SET utf8 NOT NULL,
  `time` int(11) NOT NULL,
  `active` int(11) NOT NULL
*/
const questionSchema = mongoose.Schema(
  {
    id_nv: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Thiếu id của nhân viên"],
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
questionSchema.plugin(mongoosePaginate);
const Question = mongoose.model("Question", questionSchema);
Question.paginate().then({});
module.exports = Question;
