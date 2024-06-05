const { StatusCodes } = require("http-status-codes");
const customError = require("../error");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { createTokenUser, createJWT } = require("../utils");
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError.BadRequestError("Please provide email and password");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new customError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new customError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  const token = createJWT({
    payload: tokenUser,
  });
  console.log(token);
  res
    .status(StatusCodes.OK)
    .json({ name: user.name, id: user.id, token: token });
};

const checkUser = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const { userId } = isTokenValid(token);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new customError.UnauthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json({ token });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const existUser = await prisma.user.findUnique({
    where: { email },
  });
  console.log(existUser);
  if (existUser) {
    throw new customError.BadRequest("User username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;

  const user = await prisma.user.create({ data: { ...req.body } });

  res.status(StatusCodes.CREATED).json({ user: user });
};

module.exports = { login, checkUser, signUp };
