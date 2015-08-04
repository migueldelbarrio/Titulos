var model = require('../models/models.js');

var randomstring = require("randomstring");


exports.load = function(req,res,next,titleId){
	model.Titulo.findById(titleId).then(function(title){

			if(title){ req.title = title;
						next();}
				else{ throw new Error('No existe titleId'+ titleId);}


	});



}


exports.admin_panel = function(req, res) {


		model.Curso.findAll().then(function(courses){


		res.render('admin', {cursos:courses});

	});
  
};

exports.get_titles = function(req,res){

	model.Titulo.findAll().then(function(titulos){


		res.render('titulos',{titulos:titulos});

	});



}


exports.create_dummy = function(req,res){

	model.Titulo.create({nombre:'Dummy', apellidos:'Dummy', dni:'Dummy', telefono:666666666, curso:'Dummy', horas:24}).then(function(titulos){


		res.redirect('/titles');

	});




}


exports.add_title = function(req,res){

		var coincidencia=true;
		var aleatorio= randomstring.generate(20);

		if(!req.body.dni.match(/^\d{8}[a-zA-Z]$/)){
			model.Curso.findAll().then(function(courses){


				res.render('admin', {cursos:courses, error_title:"DNI Incorrecto"});

			});
			//res.send('<h1>DNI incorrecto</h1><a href="/admin">Volver</a>');
			return;

		};

		model.Titulo.findOne({ where: { codigo: aleatorio } }).then(function(titulo){

			while(coincidencia){
					if(!titulo){
							coincidencia=false;
							console.log("El código generado NO existe")
							model.Titulo.create({nombre:req.body.n_alumno, apellidos:req.body.a_alumno, dni:req.body.dni, telefono:req.body.telefono, curso:req.body.curso, horas:req.body.horas, codigo:aleatorio, inicio: req.body.inicio, fin:req.body.fin}).then(function(titulos){
							
							res.redirect('/titles');

					});
					}else{console.log("El código generado ya existe"); coincidencia=true;}

			}
		});



}

exports.render = function(req,res){

res.render('render',{titulo:req.title});



}