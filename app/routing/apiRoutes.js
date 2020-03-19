const path = require('path');
const friends = require('../data/friends.js');

// EXPORT ROUTES
module.exports = function (app) {
    // list friend entries route
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // add friend and calculate match route 
    app.post('/api/friends', function (req, res) {
        let userData = req.body;
        let userScore = userData.scores;
        let match;
        let image;
        let delta = 4 * friends.length + 1; // max difference plus 1 starting point        

        friends.forEach(friend => {
            let deltaTest = 0;
            friend.scores.forEach(function (value, index) {
                deltaTest += Math.abs(parseInt(req.body.scores[index]) - value)
            });
            if (deltaTest < delta && friend.name != req.body.name) { // best match without same name
                delta = deltaTest;
                match = friend.name;
                image = friend.photo;
            }
        });

        friends.push(userData); // add user entry to friends array
        res.json({ status: 'OK', match: match, image: image }); // respond with match
    });
};