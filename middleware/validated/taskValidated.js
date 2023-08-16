const yup = require("yup");

const taskSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  time: yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required(),
  }),
  user_id: yup.string().required(),
  member: yup.array().of(yup.string()),
  process: yup.array().of(
    yup.object().shape({
      user_id: yup.string().required(),
      current_process: yup.string().required(),
      description: yup.string().required(),
      updateAt: yup.date().required(),
    })
  ),
  type: yup.number().required(),
});

module.exports = taskSchema;
