import { Types } from "mongoose";
import Processing from "./IProcessing";


export default interface IEvent {
  name: string;
  time: {
    start: Date;
    end: Date;
  };
  user_id: Types.ObjectId;
  member: Array<Types.ObjectId>;
  description: string;
  process: Array<Processing>;
  tag: string,
//    loại sự kiện: 1 - khẩn cấp/ 2 - quan trọng/ 3 - cả 1 và 2
  type: number
}
