const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: "HS256",
    });
    console.log({ payload });
    const { id } = payload;
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new UnauthenticatedError("Authentication invalid");
    }
    req.user = {
      userId: payload.id,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
