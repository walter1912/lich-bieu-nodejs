# PHÂN TÍCH THIẾT KẾ

    I. Models
        1. Event
        có các trường:
         - name : tên của sự kiện
         - time : thời gian diễn ra sự kiện, từ thời gian nào tới thời gian nào
         - user_id : 1 người tạo sự kiện
         - member : 1 hoặc nhiều người tham gia sự kiện
         - description : mô tả chi tiết sự kiện
         - process : list object:
                        - user_id: người thực hiện
                        - current_process: tiến trình sau khi thực hiện 
                        - description: việc mà user_id mới làm thêm
                        - updateAt: thời gian cập nhật
         - tag : các thẻ mà sự kiện đc gắn
         - type: loại sự kiện: 1 - khẩn cấp/ 2 - quan trọng/ 3 - cả 1 và 2
         - createAt: thời gian tạo
         - updateAt: thời gian cập nhật

        2. Task
         - name: tên task
         - description: mô tả chi tiết task
         - time: thời gian bắt đầu và thời gian deadline
         - user_id : người tạo task
         - member: 1 hoặc nhiều người phải hoàn thành task
         - process : list object:
                        - user_id: người thực hiện
                        - current_process: tiến trình sau khi thực hiện 
                        - description: việc mà user_id mới làm thêm
                        - updateAt: thời gian cập nhật
         - type: loại task: 1 - khẩn cấp/ 2 - quan trọng/ 3 - cả 1 và 2
         - createAt: thời gian tạo
         - updateAt: thời gian cập nhật
        
        3. Reminder
         - task_id: id sự kiện 
         - time_reminder: thời gian nhắc nhở 
         - message: lời nhắc nhở 
         - createAt: thời gian tạo
         - updateAt: thời gian cập nhật

