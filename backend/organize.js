app.post('/appointments', async (req, res) => {
  try {
    const database = client.db("TrentWeb");
    const squareSignature = req.headers["x-square-signature"]; // Check if it's from Square

    // ✅ Handle Square Webhook Requests
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
      // ✅ Handle Manual CRM Appointments
      console.log("📝 Manual CRM Appointment Received");

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
    console.error("❌ Error adding appointment:", error);
    res.status(500).send({ error: "Failed to add appointment" });
  }
});