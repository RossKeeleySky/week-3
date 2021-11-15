const express = require('express');
const router = express.Router();
const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
} = require('../sequelize-connect');

router.post('/', async (req, res) => {
    try {
    const menu = await Menu.create(req.body);
    
    // 201 = created a resource
    res.status(201).send(menu);
    } catch (e) {
    res.status(400).send(e.message);
    }
})

router.get('/', async (req, res) => {
    try {
    const menus = await Menu.findAll({});

    // 200 = success
    res.status(200).send(menus);
    } catch (e) {
    res.status(400).send(e.message);
    }
});
  
// Create an endpoint that will get a menu by ID (HTTP Method = get)
router.get('/:id', async (req, res) => {
    try {
        const menus = await Menu.findAll({
            where: req.params,
            include: [MenuItem]
        });

        res.status(200).send(menus);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Create an endpoint that will delete a menu by ID (HTTP Method = delete)
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

module.exports = router;