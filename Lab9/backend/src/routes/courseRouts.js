const express = require("express");
const routerInstance = express.Router();
const CourseModel = require("../models/Course");

// Fetch all courses from database
routerInstance.get('/', async (request, response) => {
  try {
    const allCourses = await CourseModel.find();
    response.json(allCourses);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching courses' });
  }
});

// Fetch a single course by its ID
routerInstance.get('/:id', async (request, response) => {
  try {
    const courseId = request.params.id;
    const foundCourse = await CourseModel.findById(courseId);
    
    if (!foundCourse) {
      return response.status(404).json({ message: 'Course not found' });
    }
    
    response.json(foundCourse);
  } catch (error) {
    response.status(404).json({ message: 'Course not found' });
  }
});

// Create a new course entry
routerInstance.post('/', async (request, response) => {
  try {
    const { title, description, instructorName, price, category } = request.body;
    
    if (!title || !description || !instructorName || !price || !category) {
      return response.status(400).json({ 
        message: 'Title, description, instructor name, price, and category are required' 
      });
    }
    
    const courseData = {
      title,
      description,
      instructorName,
      price,
      category
    };
    
    const createdCourse = new CourseModel(courseData);
    const savedCourse = await createdCourse.save();
    
    response.status(201).json(savedCourse);
  } catch (error) {
    response.status(500).json({ message: 'Error creating course' });
  }
});

// Update an existing course
routerInstance.put('/:id', async (request, response) => {
  try {
    const courseId = request.params.id;
    const existingCourse = await CourseModel.findById(courseId);
    
    if (!existingCourse) {
      return response.status(404).json({ message: 'Course not found' });
    }
    
    const { title, description, instructorName, price, category } = request.body;
    
    if (title) existingCourse.title = title;
    if (description) existingCourse.description = description;
    if (instructorName) existingCourse.instructorName = instructorName;
    if (price !== undefined) existingCourse.price = price;
    if (category) existingCourse.category = category;
    
    const updatedCourseData = await existingCourse.save();
    response.json(updatedCourseData);
  } catch (error) {
    response.status(500).json({ message: 'Error updating course' });
  }
});

// Remove a course from database
routerInstance.delete('/:id', async (request, response) => {
  try {
    const courseId = request.params.id;
    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
    
    if (!deletedCourse) {
      return response.status(404).json({ message: 'Course not found' });
    }
    
    response.status(204).send();
  } catch (error) {
    response.status(404).json({ message: 'Course not found' });
  }
});

module.exports = routerInstance;