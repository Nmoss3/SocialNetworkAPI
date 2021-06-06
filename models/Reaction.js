const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// creates a new Schema called ReactionSchema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: string,
      required: true,
    },
    // uses moment to capture and display current time
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal = moment(createdAtVal).format(
        "MMM DD, YYYY [at] hh:mm a"
      )),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating a duplicate of _id as 'id'
    id: false,
  }
);

module.exports = ReactionSchema;
