const express = require("express");
// const { restaurantModel } = require("../sequelize_crud/models/models");
// const { Restaurant } = require("../sequelize_crud/sequelize-connect");
const {
  connection,
  Restaurant,
  Menu,
  MenuItem,
} = require("./sequelize-connect");

const app = express();
// const routes = require("../sequelize_rest_api/routes/index-router.js");
const routes = require("../sequelize_rest_api/routes/index-router");
const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static("../sequelize_rest_api/database"));
app.use("/", routes);

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
  
  // app.get("/restaurants", async (req, res) => {
  //   try {
  //     // create a row in the database using sequelize create method
  //     const theRestaurant = await Restaurant.create({
  //       name: 'Pizza Hut',
  //       imagelink: 'http://domain.myimagelink.jpg',
  //     });
      
  //     const restaurants = await Restaurant.findAll({});
      
  //     // 200 = success
  //     res.status(200).send(restaurants);
  //   } catch (e) {
  //     res.status(400).send(e.message);
  //   }
  // });

  /**
 * Synchronize all models with db
 */
async function start() {
  await connection.sync({
      logging: false, // don't log everything
      // force: true, // drop tables each time
  });
}

  // run start and log any errors
start()
.then(() => console.log('Sequelize connected'))
.catch((e) => console.log(`Caught error: ${e}`));
  
  app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
  });