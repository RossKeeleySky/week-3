const {sequelize} = require("./sequelize_index");
const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
  } = require('./sequelize-connect');
const { hasUncaughtExceptionCaptureCallback } = require("process");

describe("Restaurant", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test("can create a restaurant", async () => {
        const restaurant = await Restaurant.create({ name: "Pizza Hut", image: 'http://domain.myimagelink.jpg' });
        hasUncaughtExceptionCaptureCallback(restaurant.id).toBe(1);
    })
})