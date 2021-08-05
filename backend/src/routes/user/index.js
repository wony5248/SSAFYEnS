const router = require("express").Router();

const user = require("../../service/userService");

router.post("/", (req, res) => {
  user
    .createUser(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/id", (req, res) => {
  user
    .findId(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/password", (req, res) => {
  user
    .validatePasswordRenew(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});


router.put("/password", (req, res) => {
  user
    .updatePassword(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/login", (req, res) => {
  user
    .login(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/logout", (req, res) => {
  user
    .logout(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/all", (req, res) => {
  user
    .getUserAll(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/:user_id", (req, res) => {
  user
    .getUserById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/:user_id", (req, res) => {
  user
    .updateUserById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/:user_id", (req, res) => {
  user
    .deleteUserById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});



module.exports = router;
