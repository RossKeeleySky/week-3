const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express();
const port = 3005;
// get the instance of sequelize
const { connection } = require('../sequelize_rest_api/sequelize-connect');
// const routes = require("../sequelize_rest_api/routes/index.js");
const routes = require("../sequelize_rest_api/routes/index-router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: true }));
// support the parsing of incoming requests with json payloads
app.use(express.json());

// serve static assets from the public/ folder
app.use(express.static("./views/layouts/main"));

app.get("/", async (req, res) => {
    res.send("Hello World")
});

// this route returns HTML for all the restaurants
// app.get('/web/restaurants', async (req, res) => {
//     const restaurants = await Restaurant.findAll()
//     res.render('restaurants', { restaurants })
// })
// // this route returns HTML for a single restaurant
// app.get('/web/restaurants/:id', async (req, res) => {
//     const restaurant = await Restaurant.findByPk(req.params.id)
//     res.render('restaurant', { restaurant })
// })

async function start() {
    await connection.sync({
        logging: false, // don't log everything
        // force: true, // drop tables each time
    });
}

start()
.then(() => console.log('Sequelize connected'))
.catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})