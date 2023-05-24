# social-network-api

## Table of Contents
[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Contributing](#Contributing)

[Tests](#Tests)


[Questions](#Questions)


## Description <a id = "Description"></a>
This product serves as a backend server that creates routes for a social media platform. These routes allow for creating a user,updating user info, deleting user. For the users there is also the ability to add and remove friends. Users also have thougts and thoughts and have reactions. These thoughts can be updated and deleted. Thoughts can be added or removed.
## Installation <a id = "Installation"></a>
To run this application the user should first clone the repository. From there they should install the dependencies by running "npm i" in the terminal. Once all the dependencies have been run the server can be run through "node index.js" which will start up the server.

## Usage <a id = "Usage"></a>
To see the data that is returned up each route the user should follow the following route guide in insomnia or another route hitting software
- GET "http://localhost:3001/api/users/" to get all the users
- GET "http://localhost:3001/api/users/:id" to get users by id 
- POST "http://localhost:3001/api/users/" to create a users 
- PUT "http://localhost:3001/api/users/:id" to update entry at that id
- DELETE "http://localhost:3001/api/users/:id" to delete users at that id
- POST http://localhost:3001/api/users/:userID/friends/:friendId to add a friend to the user
- Delete http://localhost:3001/api/users/:userID/friends/:friendId to delete a friend from the user

The same routes can be ran by swapping out users for thoughts or reactions. the friends routes will not apply to thoughts or reactions. The only routes provided for reactions is the create that takes a thought as a parameter and the delete which takes a thought id and a reaction id to delete that reaction from the thought.
 
Link to deployed github repo: https://github.com/Ian-Danas/social-network-api
Link to video demo: https://drive.google.com/file/d/1ojxsGF1O4ktuSjCRn0UxisneStx_iE7Z/view
## Contributing <a id = "Contributing"></a>
Ian Danas
## Tests <a id = "Tests"></a>
N/A

## Questions <a id = "Questions"></a>
if you have an additional questions about the project reach out to me at the github username or the email below

 github: https://github.com/Ian-Danas

 Email: ianmdanas@gmail.com

## Credits
used for email validation: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
used for date manipulation getter: https://stackoverflow.com/questions/70724966/how-to-use-getter-or-setter-with-mongoose-timestamps
Code in the routing folders was adapted from this in class activity 23 from unit 18-NoSQL




























