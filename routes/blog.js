const express = require('express');
const router = express.Router();
const Blog = require('./model/Blog');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('blog', { title: 'Express' });
});

router.get('/all', (req, res, next) => {
  Blog.find()
    .then((blog) => {
      if (blog.length) {
        return res.status(200).json({ blog });
      } else {
        return res.status(200).json({ message: 'Blogs Are Empty' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/blogById/:id', (req, res, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        return res.status(200).json({ confirmation: 'Success', blog });
      } else {
        return res
          .status(404)
          .json({ confirmation: 'Failed', message: 'Not Found' });
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ confirmation: 'Failed', message: 'server error', err });
    });
});

router.post('/add-word', (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.subject ||
    !req.body.article
  ) {
    return res.status(504).json({ message: 'you must input all fields' });
  } else {
    let newBlog = new Blog();
    newBlog.title = req.body.title;
    newBlog.author = req.body.author;
    newBlog.subject = req.body.subject;
    newBlog.article = req.body.article;

    newBlog
      .save()
      .then((blog) => {
        return res.status(200).json({ blog });
      })
      .catch((err) => {
        res.json({ message: 'Blog not created', err });
      });
  }
});



module.exports = router;
