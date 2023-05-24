const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res){
    // Uses findOneAndUpdate() method on model
    User.findOneAndUpdate(
      {_id: req.params.userId },
      req.body,
      // Sets to true so updated document is returned; Otherwise original document will be returned
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },

  deleteUser(req, res){
    User.findOneAndDelete({ _id: req.params.userId }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },

  addFriend(req, res) {
    User.findOne({ _id: req.params.userId }, (err, result) => {
      if (result) {
        const newFriends = result.friends
        newFriends.push(req.params.friendId)
        console.log('new friends array',newFriends)
        User.findOneAndUpdate(
          {_id: result._id},
          {friends:newFriends},
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
  deleteFriend(req, res) {
    User.findOne({ _id: req.params.userId }, (err, result) => {
      if (result) {
        const friendsArry = result.friends
        for (let i = 0; i < result.friends.length; i++) {
          const element = result.friends[i];
          const friend2delete = element.valueOf()
          if(friend2delete == req.params.friendId){
            friendsArry.splice(i,1)
            User.findOneAndUpdate(
              {_id: result._id},
              {friends:friendsArry},
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
          }else{
            res.status(404).json({message:'couldnt find that friend'})
          } 
        }
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
};
