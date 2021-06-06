// path to Thought and user models
const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "User",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   get 1 thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "user",
        select: "__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   create a thought
  creatThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message:
              "THERE ISNT ANY USER WITH THAT USERNAME! WHAT ARE YOU DOING?!",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  //   add a reaction
  addReaction({ params, body }, res) {
    Thought.findOneandUpdate(
      { _id: params.thoughtId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "THERE IS NO THOUGHT WITH THAT ID! WHAT ARE YOU DOING?!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  //   delete a reaction!
  deleteReaction({ params }, res) {
    Thought.findOneandDelete(
      { _id: params.thoughtId },
      { $pull: { reactions: { ractionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};
