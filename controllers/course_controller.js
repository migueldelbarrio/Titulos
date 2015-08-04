var model = require('../models/models.js');


exports.get_courses = function(req,res){

	model.Curso.findAll().then(function(courses){

		res.render('cursos',{cursos:courses});

	});
}



exports.add_course = function(req,res){


	model.Curso.create({nombre:req.body.nombre, temario:req.body.temario}).then(function(){


		res.redirect('/courses');

	});



}