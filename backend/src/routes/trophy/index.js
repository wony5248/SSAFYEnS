const router = require("express").Router();

const trophy = require("../../service/trophyService");

router.post("/", (req, res) => {
  trophy
    .createTrophy(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/", (req, res) => {
  trophy
    .getTrophyAll(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/user", (req, res) => {
  trophy
    .getUserTrophyAll(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/user/:user_id", (req, res) => {
  trophy
    .getUserTrophiesById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/:trophy_id/user/:user_id", (req, res) => {
  trophy
    .createUserTrophyById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});


module.exports = router;
