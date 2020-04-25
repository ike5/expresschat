const express = require('express');
const moment = require('moment')
const uuid = require('uuid');
const router = express.Router();
const posts = require('../../Posts');

let date_ob = new Date();

// Gets All Posts
router.get('/', (req, res) => {
	res.json(posts);
});

// Gets Single Post
router.get('/:id', (req, res) => {
	const found = posts.some((post) => post.id === parseInt(req.params.id));

	if (found) {
		res.json(posts.filter((post) => post.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
	}
});

// Create Post
router.post('/', (req, res) => {

	let s = new Date().toLocaleString();
	console.log(s);

	const newPost = {
		id: uuid.v4(),
		date: s,
		name: req.body.name,
		postmessage: req.body.postmessage,
		status: 'active'
	};

	if (!newPost.name || !newPost.postmessage) {
		return res.status(400).json({ msg: 'Please include a name and post message' });
	}

	posts.push(newPost);
	res.redirect('/');
});

// Update Post
router.put('/:id', (req, res) => {
	const found = posts.some((post) => post.id === parseInt(req.params.id));

	if (found) {
		const updPost = req.body;
		posts.forEach((post) => {
			if (post.id === parseInt(req.params.id)) {
				post.name = updPost.name ? updPost.name : post.name;
				post.name = updPost.postmessage ? updPost.postmessage : post.postmessage;

				res.json({ msg: 'Post updated', post });
			}
		});
	} else {
		res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
	}
});

// Delete Post
router.delete('/:id', (req, res) => {
	const found = posts.some((post) => post.id === parseInt(req.params.id));

	if (found) {
		res.json({ msg: 'Post deleted', posts: posts.filter((post) => post.id !== parseInt(req.params.id)) });
	} else {
		res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
	}
});

module.exports = router;