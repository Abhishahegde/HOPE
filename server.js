const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS to handle cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patient_monitoring', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB:", error));

// Define schema for steps data with a 'steps' field of type Number
const stepsSchema = new mongoose.Schema({
    steps: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define schema for calories intake data with a 'calories' field of type Number
const caloriesIntakeSchema = new mongoose.Schema({
    calories: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define schema for calories burned data with a 'calories' field of type Number
const caloriesBurnedSchema = new mongoose.Schema({
    calories: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define schema for medical history data
const medicalHistorySchema = new mongoose.Schema({
    condition: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Create models for each schema
const Steps = mongoose.model('Steps', stepsSchema);
const CaloriesIntake = mongoose.model('CaloriesIntake', caloriesIntakeSchema);
const CaloriesBurned = mongoose.model('CaloriesBurned', caloriesBurnedSchema);
const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle steps data submission from steps.html
app.post('/api/steps', async (req, res) => {
    console.log("Received steps data:", req.body);
    try {
        const newStepsEntry = new Steps({ steps: req.body.steps });
        await newStepsEntry.save();
        console.log("Steps data saved successfully:", newStepsEntry);
        res.status(200).send('Steps data saved successfully');
    } catch (err) {
        console.error("Error saving steps data:", err);
        res.status(500).send('Error saving steps data');
    }
});

// Route to handle calories intake data submission from calories.html
app.post('/api/calories', async (req, res) => {
    console.log("Received calories intake data:", req.body);
    try {
        const newCaloriesIntakeEntry = new CaloriesIntake({ calories: req.body.calories });
        await newCaloriesIntakeEntry.save();
        console.log("Calories intake data saved successfully:", newCaloriesIntakeEntry);
        res.status(200).send('Calories intake data saved successfully');
    } catch (err) {
        console.error("Error saving calories intake data:", err);
        res.status(500).send('Error saving calories intake data');
    }
});

// Route to handle calories burned data submission from calories_burned.html
app.post('/api/calories-burned', async (req, res) => {
    console.log("Received calories burned data:", req.body);
    try {
        const newCaloriesBurnedEntry = new CaloriesBurned({ calories: req.body.calories });
        await newCaloriesBurnedEntry.save();
        console.log("Calories burned data saved successfully:", newCaloriesBurnedEntry);
        res.status(200).send('Calories burned data saved successfully');
    } catch (err) {
        console.error("Error saving calories burned data:", err);
        res.status(500).send('Error saving calories burned data');
    }
});

// Route to handle medical history data submission from medical-history.html
app.post('/api/medical-history', async (req, res) => {
    console.log("Received medical history data:", req.body);
    try {
        const newMedicalHistoryEntry = new MedicalHistory({
            condition: req.body.condition,
            treatment: req.body.treatment,
            date: req.body.date
        });
        await newMedicalHistoryEntry.save();
        console.log("Medical history data saved successfully:", newMedicalHistoryEntry);
        res.status(200).json({ message: 'Medical history data saved successfully' });
    } catch (err) {
        console.error("Error saving medical history data:", err);
        res.status(500).json({ message: 'Error saving medical history data' });
    }
});

// Route to get all steps entries from the database
app.get('/api/steps', async (req, res) => {
    try {
        const stepsEntries = await Steps.find().sort({ date: -1 }); // Sort by date, descending
        res.status(200).json(stepsEntries); // Send steps entries as JSON response
    } catch (err) {
        console.error("Error fetching steps data:", err);
        res.status(500).send('Error fetching steps data');
    }
});

// Route to get all calories intake entries from the database
app.get('/api/calories', async (req, res) => {
    try {
        const caloriesEntries = await CaloriesIntake.find().sort({ date: -1 });
        res.status(200).json(caloriesEntries);
    } catch (err) {
        console.error("Error fetching calories intake data:", err);
        res.status(500).send('Error fetching calories intake data');
    }
});

// Route to get all calories burned entries from the database
app.get('/api/calories-burned', async (req, res) => {
    try {
        const caloriesBurnedEntries = await CaloriesBurned.find().sort({ date: -1 });
        res.status(200).json(caloriesBurnedEntries);
    } catch (err) {
        console.error("Error fetching calories burned data:", err);
        res.status(500).send('Error fetching calories burned data');
    }
});

// Route to get all medical history entries from the database
app.get('/api/medical-history', async (req, res) => {
    try {
        const medicalHistoryEntries = await MedicalHistory.find().sort({ date: -1 });
        res.status(200).json(medicalHistoryEntries);
    } catch (err) {
        console.error("Error fetching medical history data:", err);
        res.status(500).send('Error fetching medical history data');
    }
});

// Route to get steps entries within a date range
app.get('/api/steps/range', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send("Start date and end date are required.");
    }

    try {
        const stepsEntries = await Steps.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: -1 });

        res.status(200).json(stepsEntries); // Send filtered steps entries as JSON response
    } catch (err) {
        console.error("Error fetching steps data in date range:", err);
        res.status(500).send('Error fetching steps data in date range');
    }
});

// Route to get calories intake entries within a date range
app.get('/api/calories/range', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send("Start date and end date are required.");
    }

    try {
        const caloriesEntries = await CaloriesIntake.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: -1 });

        res.status(200).json(caloriesEntries); // Send filtered calories intake entries as JSON response
    } catch (err) {
        console.error("Error fetching calories intake data in date range:", err);
        res.status(500).send('Error fetching calories intake data in date range');
    }
});

// Route to get calories burned entries within a date range
app.get('/api/calories-burned/range', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send("Start date and end date are required.");
    }

    try {
        const caloriesBurnedEntries = await CaloriesBurned.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: -1 });

        res.status(200).json(caloriesBurnedEntries); // Send filtered calories burned entries as JSON response
    } catch (err) {
        console.error("Error fetching calories burned data in date range:", err);
        res.status(500).send('Error fetching calories burned data in date range');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
