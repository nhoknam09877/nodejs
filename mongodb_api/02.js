const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/hihi', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: { type: Date, default: Date.now } }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number,
    }
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.json());

app.post('/api/blogs', async (req, res) => {
    const { title, author, body, hidden, meta } = req.body;
    try {
        const newBlog = new Blog({ title, author, body, hidden, meta });
        const savedBlog = await newBlog.save();
        res.json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    const { title, author, body, hidden, meta } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, author, body, hidden, meta }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(deletedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/blogs/:id/comments', async (req, res) => {
    const { body } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        blog.comments.push({ body });
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/blogs/:blogId/comments/:commentId', async (req, res) => {
    const { body } = req.body;
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        const comment = blog.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.body = body;
        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
