import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
   codigo: Number,
   rating: Number, 
   comentario: String
  }
);

const Comment = mongoose.models.Comment|| mongoose.model("Comment", commentSchema);

export default Comment;