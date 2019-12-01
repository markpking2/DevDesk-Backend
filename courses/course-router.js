const router = require('express').Router();
const Course = require('../data/mongo/courseModel');

const newCourse = new Course({
    name: 'Full Stack Web',
    description: 'Learn React, Node, Python, Data structures and algorithms, and much more.',
    units: [
        {
            number: 1,
            name: 'Web Fundamentals',
            description: 'Learn the fundamentals of web development.',
            weeks: [
                {
                    number: 1,
                    name: 'User Interface and Git',
                    description: 'The goal of this sprint is to build user interfaces and introduce git into our work flow. Concepts covered: Semantic HTML, box model, display types, layout techniques, flex box, basic terminal use, basic git use.',
                    days: [
                        {
                            number: 1,
                            name: 'User Interface I',
                            description: 'This module will explore the fundamentals of HTML and CSS.',
                            lectureUrl: 'https://youtu.be/4H6VrMM4U6k',
                            projectUrl: 'https://codepen.io/lambdaschool/pen/vaKejB',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Semantic HTML',
                                    url : 'https://youtu.be/mJkb00lk6rk'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

// newCourse
//   .save()
//   .then(item => console.log(item))
//   .catch(err => console.log(err));

router.get('/', async (req, res) => {
    const {course, unit, week, day} = req.query;

    try{
        if(!course && (unit || week || day)){
            throw 'No course query string provided'
        }else if((unit && isNaN(unit)) || (week && isNaN(week)) || (day && isNaN(day))){
            throw 'Invalid unit, week, or day';
        }
        if(course && unit && week && day){
            const [result] = await Course.aggregate([{$match: {'name': course, 'units.number': parseInt(unit)}}])
                .unwind('units')
                .replaceRoot('units')
                .match({'weeks.number': parseInt(week)})
                .unwind('weeks')
                .replaceRoot('weeks')
                .match({'days.number': parseInt(day)})
                .unwind('days')
                .replaceRoot('days');
            if(!result) throw 'No course found';
            res.status(200).json(result);
        }else if(course && unit && week){
            const [result] = await Course.aggregate([{$match: {'name': course, 'units.number': parseInt(unit)}}])
                .unwind('units')
                .replaceRoot('units')
                .match({'weeks.number': parseInt(week)})
                .unwind('weeks')
                .replaceRoot('weeks');
                if(!result) throw 'No course found';                
            res.status(200).json(result);            
        }else if(course && unit){
            const [result] = await Course.aggregate([{$match: {'name': course, 'units.number': parseInt(unit)}}])
                .unwind('units')
                .replaceRoot('units');
            if(!result) throw 'No course found';
            res.status(200).json(result);             
        }else if(course){
            const [result] = await Course.find({name: course});
            if(!result) throw 'No course found';
            res.status(200).json(result);
        }else{
            const [result] = await Course.find();
            res.status(200).json(result);
        }
    }catch(err){
        if(err === 'No course found'){
            res.status(404).json({message: `No course found with name '${course}'` });
        }else if(err === 'No course query string provided'){
            res.status(400).json({message: err});
        }else if(err === 'Invalid unit, week, or day'){
            res.status(400).json({message: 'Invalid query string. Unit, week, and day must be a number'});
        }else{
            console.log(err);
            res.status(500).json({message: 'Error retrieving course information'});
        }
        
    }
});

module.exports = router;