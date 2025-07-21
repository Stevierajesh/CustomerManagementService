const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const express = require('express');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 7777;

// MongoDB connection URI
const uri = 'mongodb+srv://stevieisrajesh:06242005@trentweb.5yfn5.mongodb.net/?retryWrites=true&w=majority&appName=TrentWEB';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



// Middleware ADD ALLOWED ORIGINS HERE.
// const allowedOrigins = ["http://localhost:3000", "http://localhost:5500", "http://localhost:8080", "http://localhost:7777", "http://localhost:5501", "http://127.0.0.1:5501"];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS Policy: Not allowed by CORS"));
//     }
//   }
// }));// Enable CORS for all origins


app.use(cors({})); // Enable CORS for all origins

app.use(express.json()); // Parse incoming JSON payloads

// Connect to MongoDB

async function connectToMongoDB() {
  console.log("Connecting to MongoDB...");
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
app.get("/Appointment/:appointmentId", async (req, res) => {
  try {
      const db = client.db("TrentWeb");
      const { appointmentId } = req.params;

      // Validate the ID before querying MongoDB
      if (!ObjectId.isValid(appointmentId)) {
          return res.status(400).json({ error: "Invalid appointment ID" });
      }

      // Find the appointment by its `_id`
      const appointment = await db.collection("Appointments").findOne({ _id: new ObjectId(appointmentId) });

      if (!appointment) {
          return res.status(404).json({ error: "Appointment not found" });
      }

      res.json(appointment);
  } catch (error) {
      console.error("Error fetching appointment details:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// Fetch appointments from the database
async function fetchAppointments() {
  try {
    const database = client.db('TrentWeb'); // Use the correct database name
    const collection = database.collection('Appointments'); // Use the correct collection name
    const appointments = await collection
      .find({}, { projection: { Email: 1, FirstName: 1, LastName: 1, Service: 1, CarMakeAndModel: 1, _id: 1, Phone: 1, appointmentDate: 1, appointmentTime: 1} })
      .toArray();
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

// Fetch services from the database
async function fetchServices() {
  try {
    const database = client.db('TrentWeb'); // Use the correct database name
    const collection = database.collection('Services'); // Use the correct collection name
    const services = await collection
      .find({}, { projection: { Description: 1, ServicePrice: 1, ServiceCategory: 1, Visibility: 1 } })
      .toArray();
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

// Add a new service to the database
app.post('/services', async (req, res) => {
  try {
    const { ServiceCategory, ServicePrice, Description, Visibility } = req.body;

    // Validate required fields
    if (!ServiceCategory || !ServicePrice || !Description || !Visibility) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    // Prepare the new service object
    const newService = { ServiceCategory, ServicePrice, Description, Visibility };
    console.log('Adding New Service:', newService);

    // Insert into MongoDB
    const database = client.db('TrentWeb'); // Use the correct database name
    const result = await database.collection('Services').insertOne(newService);

    res.status(201).send({ message: 'Service added successfully', serviceId: result.insertedId });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).send({ error: 'Failed to add service' });
  }
});
//Delte a service from the database
app.delete('/services', async (req, res) => {
  try {
    const { ServiceCategory } = req.body;

    // Validate input
    if (!ServiceCategory) {
      return res.status(400).send({ error: 'ServiceCategory is required' });
    }

    // Connect to MongoDB and delete the entry
    const database = client.db('TrentWeb');
    const result = await database.collection('Services').deleteOne({ ServiceCategory });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'No service found with the specified category' });
    }

    // res.status(200).send({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    // res.status(500).send({ error: 'Failed to delete service' });
  }
});


// Get all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await fetchAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).send('Error fetching appointments');
  }
});

// Get all services
app.get('/services', async (req, res) => {
  try {
    const services = await fetchServices();
    res.json(services);
  } catch (error) {
    res.status(500).send('Error fetching services');
  }
});
// Apply rate limiting to appointment booking endpoint


app.delete("/appointments/:AppointmentID", async (req, res) => {
  try {
    const { AppointmentID } = req.params; // Get from URL parameters

    // Validate input
    if (!AppointmentID) {
      return res.status(400).json({ error: "AppointmentID is required" });
    }

    // Convert AppointmentID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(AppointmentID);
    } catch (error) {
      return res.status(400).json({ error: "Invalid AppointmentID format" });
    }

    // Connect to MongoDB and delete the appointment
    const database = client.db("TrentWeb");
    const result = await database.collection("Appointments").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No appointment found with the specified ID" });
    }

    return res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ error: "Failed to delete appointment" });
  }
});

app.post('/appointments', async (req, res) => {
  try {

    const database = client.db("TrentWeb");
    const squareSignature = req.headers["x-square-signature"];
    if (squareSignature && req.body.type && req.body.data) {
      console.log("📥 Square Webhook Received");
      const event = req.body;
      const data = event.data.object;

      // Handle New Square Appointment
      if (event.type === "booking.created") {
        const newSquareAppointment = {
          Appointment: "Square Booking",
          Email: data.customer_details.email_address,
          Service: data.service_variation_id,
          Notes: data.notes || "No additional notes",
          CarType: "Unknown",
          CarMakeAndModel: "Unknown",
          PetHair: false,
          SeatsShampooed: false,
          FirstName: data.customer_details.given_name,
          LastName: data.customer_details.family_name,
          Phone: data.customer_details.phone_number || "N/A",
          appointmentDate: data.start_at.split("T")[0], // Extract date
          appointmentTime: data.start_at.split("T")[1].slice(0, 5), // Extract time (HH:MM)
          paymentStatus: "Pending",
          status: "CREATED",
        };

        console.log("Adding New Square Appointment:", newSquareAppointment);

        const result = await database.collection("Appointments").insertOne(newSquareAppointment);
        return res.status(201).send({ message: "Square appointment added successfully", appointmentId: result.insertedId });
      }

      // Handle Square Appointment Updates (Completion)
      if (event.type === "booking.updated" && data.status === "COMPLETED") {
        const updatedAppointment = await database.collection("Appointments").findOneAndUpdate(
          { Email: data.customer_details.email_address, appointmentDate: data.start_at.split("T")[0] },
          { $set: { status: "COMPLETED", paymentStatus: "Paid" } },
          { returnDocument: "after" }
        );

        console.log("✅ Square Appointment Completed:", updatedAppointment.value);
        return res.status(200).send({ message: "Square appointment updated successfully" });
      }
    } else {
    const {
      Appointment,
      Email,
      Service,
      Notes,
      CarType,
      CarMakeAndModel,
      PetHair,
      SeatsShampooed,
      FirstName,
      LastName,
      Phone,
      appointmentDate,
      appointmentTime
    } = req.body;

    // Validate required fields
    if (!FirstName || !LastName || !appointmentDate || !appointmentTime || !Service || !Email || !Phone) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Prepare the appointment object
    const newAppointment = {
      Appointment: Appointment || "No Title",
      Email,
      Service,
      Notes: Notes || "No additional notes",
      CarType,
      CarMakeAndModel,
      PetHair: PetHair || false,
      SeatsShampooed: SeatsShampooed || false,
      FirstName,
      LastName,
      Phone,
      appointmentDate,
      appointmentTime,
    };

    console.log("Adding New Appointment:", newAppointment);
  
    // Insert into MongoDB
    const database = client.db("TrentWeb");
    const result = await database.collection("Appointments").insertOne(newAppointment);
    res.status(201).send({ message: "Appointment added successfully", appointmentId: result.insertedId });
  }
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).send({ error: "Failed to add appointment" });
  }
});



// Start the server and connect to MongoDB
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToMongoDB();
});
