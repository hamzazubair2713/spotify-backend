module.exports = {
  comparePassword: (plainPassword, hashedPassword) =>
    bcryptjs.compareSync(plainPassword, hashedPassword),
  hashPassword: (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const passwordHashed = bcryptjs.hashSync(password, salt);
    return passwordHashed;
  },
};
