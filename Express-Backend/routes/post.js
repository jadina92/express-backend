var express = require('express');
var router = express.Router();
var posts = require('../utils/posts')

// blog home page
router.get('/post', (req, res) => {
    // render `home.ejs` with the list of posts
    res.render('home.ejs', { posts: posts })
})
// blog post
router.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]
    // render the `post.ejs` template with the post content
    res.render('post.ejs', {
        author: post.author,
        title: post.title,
        body: post.body
    })
});

module.exports = router;