var express = require('express');

var router = express.Router();

var titleController = require('../controllers/title_controller');
var courseController = require('../controllers/course_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.param('titleId', titleController.load)

router.get('/admin', titleController.admin_panel);
router.get('/titles', titleController.get_titles);
router.get('/titles/:titleId(\\d+)/render', titleController.render);

router.get('/dummy', titleController.create_dummy);
router.put('/admin/add_title', titleController.add_title);

router.put('/admin/add_course', courseController.add_course);
router.get('/courses', courseController.get_courses);
//router.get('/admin/add_title', titleController.add_title);

module.exports = router;
