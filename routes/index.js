var express = require('express');

var router = express.Router();

var titleController = require('../controllers/title_controller');
var courseController = require('../controllers/course_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.param('titleId', titleController.load)
router.param('courseId', courseController.load)


router.get('/verify',titleController.verify);

router.get('/login',sessionController.index);
router.post('/login',sessionController.login);
router.get('/logout',sessionController.destroy);

router.get('/admin',sessionController.loginRequired);
router.get('/titles',sessionController.loginRequired);
router.get('/titles/*',sessionController.loginRequired);

router.get('/courses',sessionController.loginRequired);
router.get('/courses/:courseId(\\d+)/show', courseController.show)

router.get('/admin', titleController.admin_panel);
router.get('/titles', titleController.get_titles);
router.get('/titles/:titleId(\\d+)/render', titleController.render);

router.get('/dummy',sessionController.loginRequired, titleController.create_dummy);
router.put('/admin/add_title', titleController.add_title);

router.put('/admin/add_course', courseController.add_course);
router.get('/courses', courseController.get_courses);
//router.get('/admin/add_title', titleController.add_title);

module.exports = router;
