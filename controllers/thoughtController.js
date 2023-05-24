const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the Thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId },
      req.body,
      // Sets to true so updated document is returned; Otherwise original document will be returned
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message:err});
        }
      }
    );
  },

  deleteThought(req, res){
    Thought.findOneAndDelete({ _id: req.params.thoughtId }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
  createReaction(req, res){
    Thought.findOne({ _id: req.params.thoughtId }, (err, result) => {
      if (result) {
        const reactionObj = {
          reactionBody:req.body.reactionBody,
          username:req.body.username
        }
        const newReactions = result.reactions
        newReactions.push(reactionObj)
        Thought.findOneAndUpdate(
          {_id: result._id},
          {reactions:newReactions},
          { new: true },
          (err, result) => {
            if (result) {
              res.status(200).json(result);
              console.log(`Updated: ${result}`);
            } else {
              console.log('Uh Oh, something went wrong');
              console.log(err)
              res.status(500).json({ message: err });
            }
          }
        );
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
  deleteReaction(req, res) {
    Thought.findById(req.params.thoughtId , (err, result) => {
      if (result) {
        const reactionsArry = result.reactions
        for (let i = 0; i < result.reactions.length; i++) {
          const element = result.reactions[i].reactionId;
          console.log('element',element)
          const reaction2delete = element.valueOf()
          if(reaction2delete == req.params.reactionId){
            reactionsArry.splice(i,1)
            Thought.findOneAndUpdate(
              {_id: result._id},
              {reactions:reactionsArry},
              { new: true },
              (err, result) => {
                if (result) {
                  res.status(200).json(result);
                  console.log(`Updated: ${result}`);
                } else {
                  console.log('Uh Oh, something went wrong');
                  console.log(err)
                  res.status(500).json({ message: err });
                }
              }
            );
          }//else{
          //   res.status(404).json({message:'couldnt find that friend'})
          // } 
        }
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: err });
      }
    });
  },
};
