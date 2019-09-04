const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    userage: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      minlength: 1
    },
    usergender: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);

module.exports = User;
