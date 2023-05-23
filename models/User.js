const { Schema, model } = require('mongoose');

function validateEmail(email){
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email)
}
// Schema to create User model
const userSchema = new Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true
    }, 
    email:{
      type:String,
      required:true,
      unique:true,
      validate:{
        validator:validateEmail,
        message: 'Please enter in a correct email'
      }
    } ,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property friendCount that gets user's number of friends
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `friend Count: ${this.friends.length}`;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
