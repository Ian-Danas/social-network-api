const { Schema, model,ObjectId  } = require('mongoose');


const reactionSchema = new Schema({
  reactionId: { 
    type: ObjectId, 
    default: new ObjectId()
  },
  reactionBody: {
    type:String,
    required:true,
    maxLength:280
  },
  username:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: Boolean,
      default: false,
    },
    reactions:[reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
