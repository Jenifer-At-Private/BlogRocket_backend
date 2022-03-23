const formidable = require("formidable");
const fs = require("fs");

const { Blog } = require("../model/blog");

const getBlogs = (req, res) => {
  Blog.find()
    .exec()
    .then(
      (data) => {
        return res.json(data);
      },
      (err) => {
        return res.json({ error: "Cannot fetch data" });
      }
    );
};

const newBlog = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log(file);
    if (err) {
      return res.json({ error: "Cannot parse form" });
    }

    const post = new Blog(fields);

    if (file.image) {
      post.image.data = fs.readFileSync(file.image.filepath);
      post.image.contentType = file.image.type;
    }

    post.userId = req.user;

    post.save().then(
      (data) => {
        return res.json(data);
      },
      (err) => {
        return res.json({ error: "Cannot post data" });
      }
    );
  });

  // return res.json({ success: true });
};

const updateBlog = (req, res) => {
  const { postId } = req.params;

  Blog.findOneAndUpdate({ _id: postId }, req.body).exec((err, post) => {
    if (err) {
      return res.json({ error: "Cannot update data" });
    }

    return res.json({ message: "Data updated successfully" });
  });
};

module.exports = { getBlogs, newBlog, updateBlog };
