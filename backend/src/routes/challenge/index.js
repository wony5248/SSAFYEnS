const router = require("express").Router();

const challenge = require("../../service/challengeService");

router.get("/", (req, res) => {
  challenge
    .getAllChallenge(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/", (req, res) => {
  challenge
    .createChallenge(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/:challenge_id", (req, res) => {
  challenge
    .getChallengeById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/:challenge_id/schedule/:schedule_id", (req, res) => {
  challenge
    .createChallengeScheduleFK(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});


module.exports = router;
