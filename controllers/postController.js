const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");
const customError = require("../error");

const prisma = new PrismaClient();
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  console.log(req.user);
  if (!title || !content || !userId) {
    throw new customError.BadRequest(`Post Required Data`);
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      user_id: userId,
    },
  });
  res.status(StatusCodes.CREATED).json({ post });
};

const getAllPost = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 5;

  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / pageSize);
  let page = parseInt(req.query.page) || 1;
  page = page > totalPages ? totalPages : page;

  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    include: { user: true },
    take: pageSize,
  });

  res.status(StatusCodes.OK).json({ posts, totalPages, totalPosts });
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { user: true },
  });
  if (!post) {
    throw new customError.BadRequest(`Post not Found`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const checkPost = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!checkPost) {
    throw new customError.BadRequest(`Post not Found`);
  }
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
    },
  });
  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const checkPost = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!checkPost) {
    throw new customError.BadRequest(`Post not Found`);
  }
  await prisma.post.delete({
    where: { id: parseInt(id) },
  });
  res.status(StatusCodes.OK).end();
};

module.exports = { createPost, getAllPost, getPost, deletePost, updatePost };
