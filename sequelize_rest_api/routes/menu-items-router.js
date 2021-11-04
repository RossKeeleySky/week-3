const express = require('express');
const router = express.Router();
const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
} = require('../sequelize-connect');

router.post('/api/menuitems', async (req, res) => {
    try {
    const menuItems = await MenuItem.create(req.body);
    
    // 201 = created a resource
    res.status(201).send(menuItems);
    } catch (e) {
    res.status(400).send(e.message);
    }
})

router.get('/api/menuitems', async (req, res) => {
    try {
    const menuItems = await MenuItem.findAll({});

    // 200 = success
    res.status(200).send(menuItems);
    } catch (e) {
    res.status(400).send(e.message);
    }
});

// Create an endpoint that will get a menu item by ID (HTTP Method = get)
router.get('/api/menuitems/:id', async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll({
            where: req.params
        });

        res.status(200).send(menuItems);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Create an endpoint that will delete a menu item by ID (HTTP Method = delete)
router.delete('/api/menuItems/:id', async (req, res) => {
    try {
        const menuItems = await MenuItem.destroy({
            where: req.params
        });

        const menuItemsUpdated = await MenuItem.findAll({});

        // 200 = success
        res.status(200).send(menuItemsUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
// Create an endpoint that will update a menu item by ID (HTTP Method = put)
router.put('/api/menuitems/:id', async (req, res) => {
    try {
        const menuItems = await MenuItem.update(req.body, {
            where: req.params
        });

        const menuItemUpdated = await MenuItem.findAll({
            where: req.params
        }); 

        // 200 = success
        res.status(200).send(menuItemUpdated);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;