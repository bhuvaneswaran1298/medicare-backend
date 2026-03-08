const express = require('express');
const router = express.Router();

// Dummy doctor list
const doctors = [
{
 id: 1,
 name: "Dr. John Smith",
 specialty: "Cardiology",
 image: "images/john.png"
},
{
 id: 2,
 name: "Dr. Priya Sharma",
 specialty: "Dermatology",
 image: "images/priya.png"
},
{
 id: 3,
 name: "Dr. Emily Chen",
 specialty: "Pediatrics",
 image: "images/emily.png"
},
{
 id: 4,
 name: "Dr. Michael Lee",
 specialty: "Orthopedics",
 image: "images/michael.png"
}
];

// Get all doctors
router.get('/', (req, res) => {
  res.json(doctors);
});

// Get doctor by id
router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d.id == req.params.id);

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.json(doctor);
});

module.exports = router;
