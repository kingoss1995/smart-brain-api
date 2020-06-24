const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "d9d096b1fe0d49049ff55e53e9b6d00c",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("bad request");
    });
};

const handleImageGet = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(404).json("unable to get entries");
      }
    });
};

module.exports = {
  handleImageGet,
  handleApiCall,
};
