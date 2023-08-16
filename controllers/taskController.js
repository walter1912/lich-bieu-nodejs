const asyncHandler = require("express-async-handler");
const taskSchema = require("../middleware/validated/taskValidated");
const Task = require("../models/Task");

// routes.route('/').post(createTask);
const createTask = asyncHandler(async (req, res) => {
  const data = req.body;
  try {
    const valiData = await taskSchema.validate(data);
    const task = await Task.create(valiData);
    console.log("task: ", task.id);
    res.status(201).json({ message: "Thêm task thành công" });
  } catch (err) {
    console.error("err: ", err);
    res.status(401);
    throw new Error("Có trường còn thiếu");
  }
});
// routes.route('/').get(getAllTask);
const getAllTask = asyncHandler(async (req, res) => {
    try {
        const tasks =await Task.find();
        if (!tasks) {
            res.status(404);
            throw new Error("Không tìm thấy nhiệm vụ!");
          }
          let message = "Lấy tất cả nhiệm vụ thành công";
          if (tasks.length < 1) {
            message = "Danh sách nhiệm vụ rỗng!";
          }
          res.status(200).json({
            message,
            tasks: tasks,
          });
    } catch (err) {
        res.status(500)
        throw new Error('Lỗi khi thực hiện phương thức get')
    }
})
// routes.route('/pages/:pageInt').get(getPagaTask);
const getPagaTask = asyncHandler(async (req, res) => {
    try {
      const page = req.params.pageInt; // Lấy giá trị của trang từ yêu cầu POST
      const currP = 2;
      const options = {
        page,
        limit: currP,
        //   sort: { id: -1 }, // Sắp xếp theo id giảm dần, tương tự ORDER BY id DESC trong SQL
      };
  
      const query = {}; // Điều kiện truy vấn, có thể thêm điều kiện tại đây
  
      const result = await Task.paginate(query, options);
      // console.log(result);
      if (result.docs.length > 0) {
        res.status(200).json({
          result: true,
          tasks: result.docs,
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
// routes.route('/:id').get(getTaskById);
const getTaskById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        res.status(404);
        throw new Error("Không tồn tại nhiệm vụ!");
      }
      res.status(200).json({
        message: "Lấy thông tin nhiệm vụ thành công",
        task: task,
      });
    } catch (err) {
      res.status(500);
      throw new Error("Lỗi khi dùng phương thức get!");
    }
  });
// routes.route('/:id').put(updateTask);
const updateTask = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        res.status(404);
        throw new Error("Không tồn tại nhiệm vụ!");
      }
      const data = req.body;
      try {
        let existed = await taskSchema.validate(task._doc);
        console.log("existed: ", existed);
        const dataUpdate = {
          ...existed,
          ...data,
        };
        console.log("dataUpdate: ", dataUpdate);
        const valiData = await taskSchema.validate(dataUpdate);
        const updated = await Task.findByIdAndUpdate(id, valiData, {
          new: true,
        });
        res.status(200).json({
          message: "Cập nhật nhiệm vụ thành công",
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
// routes.route('/:id').delete(deleteTask);
const deleteTask = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        res.status(404);
        throw new Error("Không tồn tại nhiệm vụ!");
      }
      await Task.findByIdAndDelete(id);
      res.status(200).json({
        message: "Xóa nhiệm vụ thành công",
      });
    } catch (err) {
      res.status(500);
      throw new Error("Lỗi khi dùng phương thức delete");
    }
  });

module.exports = {
    createTask,
    getAllTask,
    getPagaTask,
    getTaskById,
    updateTask,
    deleteTask
}