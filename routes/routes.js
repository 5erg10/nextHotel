let router = require('express').Router();

var sessionController = require('../controllers/sessionController');
var dataController = require('../controllers/dataController.js');

router.get('/', function (req, res) {
    res.send("message from API");
});

router.route('/users')
    .get(dataController.index);

router.route('/newUser')
    .post(dataController.new);    

router.get('/user/list', (req, res) => {
    res.json(sessionController.list().map(item => ({
        name: item
    })));
});

module.exports = router;