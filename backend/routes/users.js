const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  const page = req.query.page;
  console.log("page: " + req.query.page);
  User.paginate({}, { offset: 10 * (page - 1), limit: 10 })

    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error: " + err));
});

//.then(function(result) {
//  // ...
//});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const usergender = req.body.usergender;
  const userage = Number(req.body.userage);

  const newUser = new User({ username, usergender, userage });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: +err"));
});

router.route("/:id").get((req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)

    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted boohoo."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;
      users.usergender = req.body.usergender;
      users.userage = Number(req.body.userage);
      users
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
