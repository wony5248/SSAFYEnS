const router = require("express").Router();

const group = require("../../service/groupService");

router.post("/", (req, res) => {
  group
    .createGroup(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/namevalidation", (req, res) => {
  group
    .checkGroupName(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/:group_id", (req, res) => {
  group
    .getGroupById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/:group_id", (req, res) => {
  group
    .updateGroupById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/:group_id", (req, res) => {
  group
    .deleteGroupById(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/search", (req, res) => {
  group
    .getGroupBySearch(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;