const asyncHandler = require("express-async-handler");
const eventValidated = require("../middleware/validated/eventValidated");
const Event = require("../models/Event");
// @desc
// @route
// @access public
// routes.route('/').post(createEvent);
const createEvent = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log("data post event: ", data);
  try {
    const valiData = await eventValidated.validate(data);
    const event = await Event.create(valiData);
    console.log("event: ", event.id);
    res.status(201).json({message: "Thêm event thành công"})
  } catch (err) {
    console.log("err: ", err);
    res.status(401)
    throw new Error('Có trường còn thiếu')
  }
});

// routes.route('/').get(getAllEvent);
const getAllEvent = asyncHandler(async (req, res) => {
  const events = await Event.find();
  if (!events) {
    res.status(404);
    throw new Error("Không tìm thấy sự kiện!");
  }
  let message = "Lấy tất cả sự kiện thành công";
  if (events.length < 1) {
    message = "Danh sách sự kiện rỗng!";
  }
  res.status(200).json({
    message,
    events: events,
  });
});
// routes.route('/pages/:pageInt').get(getPagaEvent);
const getPagaEvent = asyncHandler(async (req, res) => {
  try {
    const page = req.params.pageInt; // Lấy giá trị của trang từ yêu cầu POST
    const currP = 2;
    const options = {
      page,
      limit: currP,
      //   sort: { id: -1 }, // Sắp xếp theo id giảm dần, tương tự ORDER BY id DESC trong SQL
    };

    const query = {}; // Điều kiện truy vấn, có thể thêm điều kiện tại đây

    const result = await Event.paginate(query, options);
    // console.log(result);
    if (result.docs.length > 0) {
      res.status(200).json({
        result: true,
        events: result.docs,
      });
    } else {
      res.status(200).json({
        result: false,
        message: "Hết dữ liệu!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: false,
      message: "Lỗi trong quá trình xử lý!",
    });
    console.log(err);
  }
});
// routes.route('/:id').get(getEventById);
const getEventById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404);
      throw new Error("Không tồn tại sự kiện!");
    }
    res.status(200).json({
      message: "Lấy thông tin sự kiện thành công",
      event: event,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Lỗi khi dùng phương thức get!");
  }
});
// routes.route('/:id').put(updateEvent);
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404);
      throw new Error("Không tồn tại sự kiện!");
    }
    const data = req.body;
    try {
      let existed = await eventValidated.validate(event._doc);
      console.log("existed: ", existed);
      const dataUpdate = {
        ...existed,
        ...data,
      };
      console.log("dataUpdate: ", dataUpdate);
      const valiData = await eventValidated.validate(dataUpdate);
      const updated = await Event.findByIdAndUpdate(id, valiData, {
        new: true,
      });
      res.status(200).json({
        message: "Cập nhật sự kiện thành công",
      });
    } catch (err) {
      console.error("err: ", err);
      res.status(401);
      throw new Error("Có trường còn thiếu!");
    }
  } catch (err) {
    res.status(500);
    throw new Error("Lỗi khi dùng phương thức put!");
  }
});
// routes.route('/:id').delete(deleteEvent);
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404);
      throw new Error("Không tồn tại sự kiện!");
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({
      message: "Xóa sự kiện thành công",
    });
  } catch (err) {
    res.status(500);
    throw new Error("Lỗi khi dùng phương thức delete");
  }
});

module.exports = {
  createEvent,
  getAllEvent,
  getPagaEvent,
  getEventById,
  updateEvent,
  deleteEvent
};
