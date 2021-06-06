const { Schema, model } = require("mongoose");

// creates new schema called UserSchema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: string,
      required: true,
      trim: true,
      unique: true,
      validate: email,
    },
    thoughts: [],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating a duplicate of _id as 'id'
    id: false,
  }
);

// gets a total count of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
