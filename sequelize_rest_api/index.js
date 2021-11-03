// get the instance of sequelize
const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
} = require('../sequelize_crud/sequelize-connect');
const express = require('express');
const app = express();
const port = 3003;
  
  // support req.body parsing
app.use(express.json());
  
app.post('/api/restaurants', async (req, res) => {
    try {
    // create a row in the database using sequelize create method
    const restaurant = await Restaurant.create(req.body);
    
    // 201 = created a resource
    res.status(201).send(restaurant);
    } catch (e) {
    res.status(400).send(e.message);
    }
})

app.get('/api/restaurants', async (req, res) => {
    try {
    // create a row in the database using sequelize create method
    const restaurants = await Restaurant.findAll({});

    // 200 = success
    res.status(200).send(restaurants);
    } catch (e) {
    res.status(400).send(e.message);
    }
});
  
// 1. create an endpoint that will get a restaurant by ID (HTTP Method = get)
app.get('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: req.params
        });

        // 200 = success
        res.status(200).send(restaurants);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// 2. create an endpoint that will delete a restaurant by ID (HTTP Method = delete)
app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurants = await Restaurant.destroy({
            where: req.params
        });

        const restaurantsUpdated = await Restaurant.findAll({}); 

        // 200 = success
        res.status(200).send(restaurantsUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
// 3. create an endpoint that will update a restaurant by ID (HTTP Method = put)
app.put('/api/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.update(req.body, {
            where: req.params
        });

        const restaurantUpdated = await Restaurant.findAll({
            where: req.params
        }); 

        // 200 = success
        res.status(200).send(restaurantUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// 4. create a suite of menu and menu item routes that will CRUD each resource
app.post('/api/menus', async (req, res) => {
    try {
    const menu = await Menu.create(req.body);
    
    // 201 = created a resource
    res.status(201).send(menu);
    } catch (e) {
    res.status(400).send(e.message);
    }
})

app.get('/api/menus', async (req, res) => {
    try {
    const menus = await Menu.findAll({});

    // 200 = success
    res.status(200).send(menus);
    } catch (e) {
    res.status(400).send(e.message);
    }
});
  
// Create an endpoint that will get a menu by ID (HTTP Method = get)
app.get('/api/menus/:id', async (req, res) => {
    try {
        const menus = await Menu.findAll({
            where: req.params
        });

        res.status(200).send(menus);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Create an endpoint that will delete a menu by ID (HTTP Method = delete)
app.delete('/api/menus/:id', async (req, res) => {
    try {
        const menus = await Menu.destroy({
            where: req.params
        });

        const menusUpdated = await Menu.findAll({});

        // 200 = success
        res.status(200).send(menusUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
// Create an endpoint that will update a menu by ID (HTTP Method = put)
app.put('/api/menus/:id', async (req, res) => {
    try {
        const menu = await Menu.update(req.body, {
            where: req.params
        });

        const menuUpdated = await Menu.findAll({
            where: req.params
        }); 

        // 200 = success
        res.status(200).send(menuUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});






// 5. find a way to relate the menu items to the menu and the menu to the restaurant
app.post('/api/menuitems', async (req, res) => {
    try {
    const menuItems = await MenuItem.create(req.body);
    
    // 201 = created a resource
    res.status(201).send(menuItems);
    } catch (e) {
    res.status(400).send(e.message);
    }
})

app.get('/api/menuitems', async (req, res) => {
    try {
    const menuItems = await MenuItem.findAll({});

    // 200 = success
    res.status(200).send(menuItems);
    } catch (e) {
    res.status(400).send(e.message);
    }
});




// 6. use Sequelize validation to validate the data being sent (you'll do this in the model). Which status code would you send back?

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

app.listen(port, () => console.log(`Express server running on port ${port}`));