const express = require('express');
const server = express();

server.use(express.json());

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// In-memory storage for blog posts
const blogPosts = [];

// Retrieve all blog posts
server.get("/posts", (_request, response) => {
    response.send(blogPosts);
});

// Retrieve comments for a specific post
server.get("/posts/:id/comments", (request, response) => {
    const postIdentifier = Number.parseInt(request.params.id);
    const foundPost = blogPosts.find(item => item.id === postIdentifier);
    
    if (!foundPost) {
        return response.status(404).json({ message: "Post not found" });
    }
    
    response.json(foundPost.comments);
});

// Create a new blog post
server.post("/posts", (request, response) => {
    const newPost = {
        id: blogPosts.length + 1,
        title: request.body.title,
        content: request.body.content,
        comments: []
    };
    
    blogPosts.push(newPost);
    
    console.log(`New post created: ${JSON.stringify(newPost)}`);
    console.log(`All posts: ${JSON.stringify(blogPosts)}`);
    
    response.status(201).json(newPost);
});

// Add a comment to a specific post
server.post("/posts/:id/comments", (request, response) => {
    const postIdentifier = Number.parseInt(request.params.id);
    const foundPost = blogPosts.find(item => item.id === postIdentifier);
    
    if (!foundPost) {
        return response.status(404).end();
    }
    
    const newComment = {
        id: Date.now().toString(),
        content: request.body.content
    };
    
    foundPost.comments.push(newComment);
    response.status(201).json(newComment);
});