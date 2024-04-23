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
});

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

//Get - Hämta alla cv i databasen
app.get("/cv", async (req, res) => {
    try {
        let result = await cv.find({});

        return res.json(result);

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Get - Hämtar specifikt cv i databasen
app.get("/cv/:cvId", async (req, res) => {

    let cvId = req.params.cvId

    try {
        let result = await cv.findOne({ _id: cvId });

        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "CV finns inte i databasen" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});


//Post - Lägga till cv i databasen
app.post("/cv", async (req, res) => {
    try {
        let result = await cv.create(req.body);

        return res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
});

//Delete - Ta bort cv från databasen
app.delete("/cv/:cvId", async (req, res) => {
    let cvId = req.params.cvId;

    try {
        const result = await cv.deleteOne({ _id: cvId });

        if (result.deletedCount > 0) {
            return res.json({ message: "CV är borttagen" });
        } else {
            return res.status(404).json({ message: "CV finns inte i databasen" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Något gick fel" + error });
    }
});

