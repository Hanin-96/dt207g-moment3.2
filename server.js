/*Webbtjänst med Express & Mongo DB*/

//Express
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());

//Koppla till MongoDb
mongoose.connect("mongodb+srv://haninfarhan96:databas2024.@dt207g.3u6adzt.mongodb.net/webbshopTest").then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Connection to database failed:" + error);
})

//Schema
const cvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Du måste lägga till namn"]
    },
    price: {
        type: Number,
        required: [true, "Du måste lägga till pris"]
    },
    description: {
        type: String,
        required: false
    }

});

const product = mongoose.model("clothes", cvSchema);



//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});

app.get("/api", async (req, res) => {
    res.json({ message: "Welcome to this API" });
});

/*...............................................Routing API....................................................*/

app.get("/clothes", async (req, res) => {
    try {
        let result = await product.find({}, {category: 0});

        return res.json(result);

    } catch (error) {
        return res.status(500).json(error);
    }
})

app.post("/clothes", async (req, res) => {
    try {
        let result = await product.create(req.body);

        return res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
})