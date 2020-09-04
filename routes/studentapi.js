const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const {v1: uuidv1} = require('uuid');
const {render} = require('ejs');
const path = require('path');
const studentModel = require('../models/student'); 
const router = express.Router();

router.get('/add', function(req, res){
    res.render("addstudent");});

router.get('/', (req, res) => {
    studentModel.find({})
    .then((data) => {
        res.render('showstudent', {
            datas: data
        });
    })
    .catch(err => console.log(err));
});

router.get('/getInfo', (req, res) => {
    studentModel.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err));
});

router.get('/getInfo/:id', (req, res) => {
    studentModel.findById({_id: req.params.id})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err));
})

router.post('/postInfo', (req, res) => {
    let form = new formidable.IncomingForm(); 
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){ 
  
        var oldPath = files.image.path; 
        var newPath = 'uploads/' + uuidv1() + files.image.name ; 
      
        fs.rename(oldPath, newPath, function(err){ 
            if(err) 
                {
                    console.log(err);
                }
            else
            {
                const datas = {
                    name: fields.name,
                    section: fields.section,
                    rollno: fields.rollno,
                    image: newPath,
                    biography: fields.biography
                }
                const studentinfo = new studentModel(datas);
                studentinfo.save()
                .then((data) => {
                    res.redirect('/student/');
                    console.log(data);
                })
                .catch(err => console.log(err));

            }
            
        });
  }); 
    
});
 
router.get('/edit/:id', (req, res) => {
    studentModel.findById({ _id: req.params.id})
    .then((data) => {
        res.render('editstudent', {
            data: data
        })
    })
    .catch(err => console.log(err));
});

router.post('/edit/:id', (req, res) => {
    let form = new formidable.IncomingForm(); 
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){ 
  
        var oldPath = files.image.path; 
        var newPath = 'uploads/' + uuidv1() + files.image.name ; 
      
        fs.rename(oldPath, newPath, function(err){ 
            if(err) 
                {
                    console.log(err);
                }
            else
            {
                const datas = {
                    name: fields.name,
                    section: fields.section,
                    rollno: fields.rollno,
                    image: newPath,
                    biography: fields.biography
                }
                studentModel.findByIdAndUpdate(datas)
                .then((data) => {
                    res.redirect('/student/');
                })
                .catch(err => console.log(err));

            }
            
        });
  }); 
})

router.get('/delete/:id', (req, res) => {
    studentModel.findByIdAndDelete({_id: req.params.id})
    .then(() => {
        res.redirect('/student/');
    })
    .catch(err => console.log(err));
});

module.exports = router;