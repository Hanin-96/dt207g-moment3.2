/*Webbtjänst med Express & Mongo DB*/

//Express
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT || 3000;


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());

//Koppla till MongoDb
mongoose.connect(process.env.MONGODB_URl).then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Connection to database failed:" + error);
})

//Schema
const cvSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: [true, "Du måste lägga till Jobb titel"]
    },
    company_name: {
        type: String,
        required: [true, "Du måste lägga till Företag"]
    },
    location: {
        type: String,
        required: [true, "Du måste lägga till Ort"]
    },
    description: {
        type: String,
        required: false
    }

});

const cv = mongoose.model("cv", cvSchema);



//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});

app.get("/api", async (req, res) => {
    res.json({ message: "Welcome to this API" });
});

/*...............................................Routing API....................................................*/

app.get("/cv", async (req, res) => {
    try {
        let result = await cv.find({}, {cv_id: 0});

        return res.json(result);

    } catch (error) {
        return res.status(500).json(error);
    }
})

app.post("/cv", async (req, res) => {
    try {
        let result = await cv.create(req.body);

        return res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
})