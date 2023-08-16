const asyncHandler = require("express-async-handler");

const Question = require("../models/Question");

// @desc get question
// @route POST api/question/page
// @access public
const getPagination = asyncHandler(async (req, res) => {
  try {
    const page = req.params.pageInt; // Lấy giá trị của trang từ yêu cầu POST
    const currP = 2;
    const options = {
      page,
      limit: currP,
      //   sort: { id: -1 }, // Sắp xếp theo id giảm dần, tương tự ORDER BY id DESC trong SQL
    };

    const query = {}; // Điều kiện truy vấn, có thể thêm điều kiện tại đây

    const result = await Question.paginate(query, options);
    // console.log(result);
    if (result.docs.length > 0) {
      res.status(200).json({
        result: true,
        questions: result.docs,
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

module.exports = {
  getPagination,
};
