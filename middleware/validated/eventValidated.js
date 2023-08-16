const yup = require('yup');

// Định nghĩa schema Yup dựa trên interface IEvent
const eventSchema = yup.object().shape({
  name: yup.string().required(),
  time: yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required()
  }).required(),
  user_id: yup.string().required(),
  member: yup.array().of(yup.string()),
  description: yup.string().required(),
  process: yup.array().of(
    yup.object().shape({
      user_id: yup.string().required(),
      current_process: yup.string().required(),
      description: yup.string().required(),
      updateAt: yup.date().required()
    })
  ),
  tag: yup.string().required(),
  type: yup.number().required()
});

module.exports = eventSchema;