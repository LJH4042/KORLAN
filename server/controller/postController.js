const asynchHandler = require("express-async-handler");
const Post = require("../model/postModel");

//Get all post, /post
const getPost = asynchHandler(async (req, res) => {
  const post = await Post.find();
  res.status(200).send(post);
});

//Post add post, /post/add
const addPost = asynchHandler(async (req, res) => {
  const { category, title, body, date } = req.body;
  const post = await Post.create({ category, title, body, date });
  res.status(201).json({ message: "등록되었습니다." });
});

//Get detail post, /post/:id
const detailPost = asynchHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).send(post);
});

//Delete delete post, /post/:id
const deletePost = asynchHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "삭제되었습니다." });
});

//Put update post, /post/:id/update
const updatePost = asynchHandler(async (req, res) => {
  const { category, title, body } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { category, title, body },
    { new: true }
  );
  res.status(200).json({ message: "수정되었습니다." });
});

module.exports = { getPost, addPost, detailPost, deletePost, updatePost };
