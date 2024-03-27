const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  if (!email || !name || !password) {
    return res.status(400).json("incorrect");
  }

  console.log("Starting registration process...");

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("public.login")
      .returning("email")
      .then((loginEmail) => {
        console.log("Inserted into login table:", loginEmail);

        return trx("public.users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            console.log("Inserted into users table:", user);
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch((error) => {
        console.error("Error in transaction:", error);
        trx.rollback();
        res.status(400).json("unable to register");
      });
  }).catch((err) => {
    console.error("Error starting transaction:", err);
    res.status(400).json("unable to register");
  });
};

module.exports = {
  handleRegister: handleRegister,
};
