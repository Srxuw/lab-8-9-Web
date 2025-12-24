const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  if (!courses) return res.status(500).json({ message: 'Error fetching courses' });
  
  res.json(courses);
});

// GET course by ID
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  
  res.json(course);
});

// POST create new course
router.post('/', async (req, res) => {
  const { title, description, instructorName, price, category } = req.body;
  if (!title || !description || !instructorName || !price || !category) {
    return res.status(400).json({ message: 'Title, description, instructor name, price, and category are required' });
  }
  const newCourse = new Course({
    title, description, instructorName, price, category, });
  const savedCourse = await newCourse.save();
  if (!savedCourse) return res.status(500).json({ message: 'Error creating course' });
  
  res.status(201).json(savedCourse);
});

// PUT update course
router.put('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  
  const { title, description, instructorName, price, category } = req.body;
  if (title) course.title = title;
  if (description) course.description = description;
  if (instructorName) course.instructorName = instructorName;
  if (price !== undefined) course.price = price;
  if (category) course.category = category;
  const updatedCourse = await course.save();
  if (!updatedCourse) return res.status(500).json({ message: 'Error updating course' });
  
  res.json(updatedCourse);
});

// DELETE course
router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  
  res.status(204).send();
});

module.exports = router;
