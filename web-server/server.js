const express = require("express");
const { check, validationResult } = require("express-validator");
const { restaurantModel } = require("../sequelize_crud/models/models");
const { Restaurant } = require("../sequelize_crud/sequelize-connect");

const app = express();
const port = 3002;

app.use(express.static("public"));
app.use(express.static("../sequelize_crud/database"));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

app.get("/flipcoin", (req, res) => {
    let flip = (Math.floor(Math.random() * 2) == 0);
    let result = "";
    if (flip == 1) {
        result = "heads";
    } else result = "tails";
    res.send(result);
});

// app.get("/restaurants", (req, res) => {
//     console.log(Restaurant);
//     res.send(req.params);
// });

app.get("/restaurants", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const theRestaurant = await Restaurant.create({
        name: 'Pizza Hut',
        imagelink: 'http://domain.myimagelink.jpg',
      });
      
      const restaurants = await Restaurant.findAll({});

      // 200 = success
      res.status(200).send(restaurants);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });