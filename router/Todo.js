const app = require("express");
const list = require("../schema/SchemaType");
const router = app.Router();

router.get("/", async (req, res) => {
  res.json(await list.find());
});

router.post("/", async (req, res) => {
  try {
    const req_list = await list(req.body).save();
    res.status(201).json({
      success: true,
      req_list,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", id, async (req, res) => {
  try {
    if (res.item === null) {
      res.json({
        success: false,
        message: "already removed",
      });
    } else {
      const del = await list.deleteOne(res.item._id);
      res.status(200).json({
        sucess: true,
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.todo !== undefined) {
    list.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      (err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            Error: err,
          });
        }
        if (result) {
          res.status(200).json({
            success: true,
            update: result,
          });
        }
      }
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

async function id(req, res, next) {
  const specific = await list.findById(req.params.id);
  console.log("specific", specific);
  res.item = specific;
  next();
}

module.exports = router;
