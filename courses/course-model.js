const Course = require('../data/mongo/courseModel');

module.exports = {
    findCourses,
    findCourse,
    findUnit,
    findWeek,
    findDay
}

function findCourses(){
    return Course.find();
}

function findCourse(course){
    return Course.find({name: course});
}

function findUnit(course, unit){
    return Course.aggregate([{$match: {'name': course}}])
        .unwind('units')
        .match({'units.number': parseInt(unit)})
        .replaceRoot('units');
}

function findWeek(course, unit, week){
    return Course.aggregate([{$match: {'name': course}}])
        .unwind('units')
        .match({'units.number': parseInt(unit)})
        .replaceRoot('units')
        .unwind('weeks')
        .match({'weeks.number': parseInt(week)})
        .replaceRoot('weeks');
}

function findDay(course, unit, week, day){
    return Course.aggregate([{$match: {'name': course}}])
        .unwind('units')
        .match({'units.number': parseInt(unit)})
        .replaceRoot('units')
        .unwind('weeks')
        .match({'weeks.number': parseInt(week)})
        .replaceRoot('weeks')
        .unwind('days')
        .match({'days.number': parseInt(day)})
        .replaceRoot('days');
}