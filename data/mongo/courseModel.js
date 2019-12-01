const mongoose = require('mongoose');

const PrepVideoSchema = new mongoose.Schema({
    number: Number,
    name: String,
    url: String
})

const DaysSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    lectureUrl: {
        type: String,
    },
    projectUrl: {
        type: String,
    },
    prepVideos: [PrepVideoSchema]
})

const WeekSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    days: [DaysSchema]
})

const UnitSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    weeks: [WeekSchema]
})

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    units: [UnitSchema]
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;