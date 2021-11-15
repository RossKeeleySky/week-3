const express = require('express');
// get the instance of sequelize
const { connection } = require('./sequelize-connect');
const app = express();
const routes = require("./routes/index-router.js");
const port = 3003;
  
app.use(express.urlencoded({ extended: true }));

// support req.body parsing
app.use(express.json());
app.use("/", routes);
  
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