const createTokenUser = (user) => {
  return { name: user.name, id: user.id };
};

module.exports = createTokenUser;
