/*Webbtjänst med Express & Mongo DB*/

//Express
const express = require("express");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());



//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});

app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

/*...............................................Routing API....................................................*/