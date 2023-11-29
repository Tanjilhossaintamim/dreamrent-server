const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid !`,
      required: [true, "Please Give A Email !"],
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required !"],
  },
  is_owner: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
