//you get the email and hash, hash to compare and email to get all information ->
//if email same as the one entered from req.body email
const handleSignin = (req, res, db, bcrypt) => {
  //req.query includes ?name=Juan
  //req.body to request what was requested
  //req.header
  //req.params it console.log id:1127, it you include the # in the url
  //res.status(404).send("Error");

  const { email, password } = req.body;
  //checks if empty, null or Nan
  if (!email || !password) {
    return res.status(400).json("incorrect");
  }

  //get email and password(hash) where email same as entered from front-end
  db.select("email", "hash")
    .from("public.login")
    .where("email", "=", email)
    .then((data) => {
      //using bcrypt compare data.hash(password) with password
      const isValid = bcrypt.compareSync(password, data[0].hash);
      //if true return all user info such as name, email, entries..
      if (isValid) {
        return db
          .select("*")
          .from("public.users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })

          .catch((err) => res.status(400).json("unable to get user"));
        //else return wrong credentials
      } else {
        res.status(400).json("wrong credentials");
      }
    })

    .catch((err) => res.status(400).json("unable to credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
