const { Schema, model } = require("mongoose");
const moment = require("moment");
const ReactionSchema = require("./Reaction");

// creates a new schema called ThoughtSchema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    //   uses moment to capture and display the current date and time
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating a duplicate of _id as 'id'
    id: false,
  }
);

// gets a total of ractions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
