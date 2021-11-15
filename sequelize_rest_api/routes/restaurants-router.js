const express = require('express');
const router = express.Router();
const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
} = require('../sequelize-connect');
const { check, validationResult } = require("express-validator");

router.post('/', 
    [check("name").not().isEmpty().trim().escape()], 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // create a row in the database using sequelize create method
        const restaurant = await Restaurant.create(req.body);
        // 201 = created a resource
        res.status(201).send(restaurant);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: {
                id: req.params.id
            },  
            include: {
                model: Menu,
                include: {
                    model: MenuItem
                }
            }
        });

        // const restaurants = await Restaurant.findAll({
        //     where: req.params
        // });
        // const menus = await Menu.findAll({
        //     where: {
        //         RestaurantId: req.params.id,
                
        //     },
        //     include: [MenuItem],
        // });

        // 200 = success
        res.status(200).send({ restaurants });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// 2. create an endpoint that will delete a restaurant by ID (HTTP Method = delete)
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

module.exports = router;