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

    let cvId = req.params.cvId;

    try {
        //Hitta specifik cv utifrån id
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

//Update - Uppdatera cv från databasen
app.put("/cv/:cvId", async (req, res) => {

    try {
        let cvId = req.params.cvId;

        //Deklarerar nya variabler
        const jobTitle = req.body.job_title;
        const companyName = req.body.company_name;
        const location = req.body.location;
        const description = req.body.description;

        if (jobTitle && companyName && location && description && cvId) {

            //Skickar in nytt objekt med nya värden som ersätter gamla
            const updateFields = {
                job_title: jobTitle,
                company_name: companyName,
                location: location,
                description: description
            };

            //Uppdaterar specifik cv utifrån id och lägger in det nya objekt
            let result = await cv.updateOne({ _id: cvId }, { $set: updateFields });

            console.log(result, updateFields);
            return res.json(result);


        } else {
            return res.status(404).json({ message: "CV finns inte i databasen" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});