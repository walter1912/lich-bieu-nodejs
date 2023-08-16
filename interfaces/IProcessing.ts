import { Types } from "mongoose";

export default interface Processing {
  user_id: Types.ObjectId;
  // %
  current_process: string;
  description: string;
  updateAt: Date;
}
