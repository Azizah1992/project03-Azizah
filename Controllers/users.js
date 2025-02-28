const users = require("../Models/Users")


//controller have function  +  CRUD 

const getAllUsers = (req, res) => {
  users.find().then(data => res.json(data))
}

const userRegester = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    users
      .create({
        username: req.body.username,
        password: hash,
      })
      .then(() => res.json({ msg: "app run" }))
  })
}

const userLogin = (req, res) => {
  users.findOne({ username: req.body.username }).then(user => {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ username: user.username, id: user._id }, mySecret)
        res.json({ msg: "User logged in", token: token })
      } else {
        res.json({ msg: "wrong password" }) // this function check the correction of login infromation then generate token 
      }
    })
  })
}


const userVerify = (req, res) => {
  jwt.verify(req.body.token, mySecret, function (err, decoded) {
    if (decoded) {
      res.json({ msg: `hello ${decoded.id}` })
    } else {
      res.json({ msg: "wrong token" }) //authentication 
    }
  })
}


module.exports = { getAllUsers, userRegester, userLogin, userVerify }
