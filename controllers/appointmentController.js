// backend/controllers/appointmentController.js
// backend/controllers/appointmentController.js

let appointments = [
  {
    id: 1, patientId: 1, doctorId: 1,
    patientName: "John Doe",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2025-03-10", time: "9:00 AM",
    reason: "Regular checkup",
    status: "confirmed",
    fee: 150,
    createdAt: "2025-03-01T10:00:00Z"
  },
  {
    id: 2, patientId: 1, doctorId: 2,
    patientName: "John Doe",
    doctorName: "Dr. Mark Lee",
    specialty: "Neurology",
    date: "2025-03-15", time: "2:00 PM",
    reason: "Headache evaluation",
    status: "pending",
    fee: 180,
    createdAt: "2025-03-02T14:00:00Z"
  },
  {
    id: 3, patientId: 1, doctorId: 3,
    patientName: "John Doe",
    doctorName: "Dr. Priya Patel",
    specialty: "Pediatrics",
    date: "2025-02-20", time: "11:00 AM",
    reason: "Child annual physical",
    status: "completed",
    fee: 120,
    createdAt: "2025-02-10T09:00:00Z"
  }
];

// GET /api/appointments
const getAllAppointments = (req, res) => {
  const { status, patientId, doctorId, date } = req.query;

  let result = [...appointments];

  if (status)    result = result.filter(a => a.status === status);
  if (patientId) result = result.filter(a => a.patientId === parseInt(patientId));
  if (doctorId)  result = result.filter(a => a.doctorId === parseInt(doctorId));
  if (date)      result = result.filter(a => a.date === date);

  res.json({ success: true, count: result.length, data: result });
};

// GET /api/appointments/:id
const getAppointmentById = (req, res) => {
  const appt = appointments.find(a => a.id === parseInt(req.params.id));

  if (!appt) {
    return res.status(404).json({
      success: false,
      error: 'Appointment not found'
    });
  }

  res.json({ success: true, data: appt });
};

// POST /api/appointments
const createAppointment = (req, res) => {
  const { patientId, doctorId, date, time, reason, visitType } = req.body;

  if (!doctorId || !date || !time) {
    return res.status(400).json({
      success: false,
      error: 'doctorId, date, and time are required'
    });
  }

  // Check if slot already booked
  const conflict = appointments.find(
    a => a.doctorId === parseInt(doctorId) &&
         a.date === date &&
         a.time === time &&
         a.status !== 'cancelled'
  );

  if (conflict) {
    return res.status(409).json({
      success: false,
      error: 'This time slot is already booked'
    });
  }

  const newAppt = {
    id: appointments.length + 1,
    patientId: patientId || 1,
    doctorId: parseInt(doctorId),
    patientName: "Patient User",
    doctorName: `Doctor #${doctorId}`,
    date, time,
    reason: reason || 'General consultation',
    visitType: visitType || 'General Consultation',
    status: 'pending',
    fee: 150,
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppt);

  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully!',
    data: newAppt
  });
};

// PUT /api/appointments/:id
const updateAppointment = (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: 'Appointment not found'
    });
  }

  appointments[idx] = { ...appointments[idx], ...req.body };
  res.json({ success: true, data: appointments[idx] });
};

// DELETE /api/appointments/:id
const cancelAppointment = (req, res) => {
  const idx = appointments.findIndex(a => a.id === parseInt(req.params.id));

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: 'Appointment not found'
    });
  }

  appointments[idx].status = 'cancelled';

  res.json({
    success: true,
    message: 'Appointment cancelled',
    data: appointments[idx]
  });
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment
};
```
