const express = require('express');
const router = express.Router();

let appointments = [];

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// Create appointment
router.post('/', (req, res) => {
  const { doctor, date, time } = req.body;

  const newAppointment = {
    id: appointments.length + 1,
    doctor,
    date,
    time,
    status: "pending"
  };

  appointments.push(newAppointment);

  res.json({
    message: "Appointment booked successfully",
    appointment: newAppointment
  });
});

module.exports = router;
