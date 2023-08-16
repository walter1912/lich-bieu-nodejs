import { Types } from "mongoose";
import Processing from "./IProcessing";

export default interface ITask {
  name: string;
  description: string;
  time: {
    start: Date;
    end: Date;
  };
  user_id: Types.ObjectId;
  member: Array<Types.ObjectId>;
  process: Array<Processing>;
  // loại task: 1 - khẩn cấp/ 2 - quan trọng/ 3 - cả 1 và 2
  type: number;
}
