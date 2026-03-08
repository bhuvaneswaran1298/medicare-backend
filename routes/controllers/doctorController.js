// backend/controllers/doctorController.js

// Dummy data store
let doctors = [
  {
    id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology",
    rating: 4.9, experience: 15, available: true,
    hospital: "City General Hospital", fee: 150,
    bio: "Board-certified cardiologist with 15+ years experience.",
    education: ["MBBS - Harvard Medical", "MD Cardiology - Johns Hopkins"],
    image: "https://placehold.co/300x200/1a56db/white?text=Dr.+Johnson"
  },
  {
    id: 2, name: "Dr. Mark Lee", specialty: "Neurology",
    rating: 4.8, experience: 12, available: true,
    hospital: "Metro Medical Center", fee: 180,
    bio: "Expert neurologist specializing in brain disorders.",
    education: ["MBBS - Yale", "MD Neurology - Stanford"],
    image: "https://placehold.co/300x200/1e3a5f/white?text=Dr.+Lee"
  },
  {
    id: 3, name: "Dr. Priya Patel", specialty: "Pediatrics",
    rating: 4.9, experience: 10, available: false,
    hospital: "Children's Hospital", fee: 120,
    bio: "Caring pediatrician dedicated to children's health.",
    education: ["MBBS - Columbia", "MD Pediatrics - UCSF"],
    image: "https://placehold.co/300x200/3b82f6/white?text=Dr.+Patel"
  },
  {
    id: 4, name: "Dr. James Kim", specialty: "Orthopedics",
    rating: 4.7, experience: 18, available: true,
    hospital: "Bone & Joint Clinic", fee: 200,
    bio: "Orthopedic surgeon specializing in sports injuries.",
    education: ["MBBS - NYU", "MD Orthopedics - Mayo Clinic"],
    image: "https://placehold.co/300x200/1a56db/white?text=Dr.+Kim"
  },
  {
    id: 5, name: "Dr. Lisa Chen", specialty: "Dermatology",
    rating: 4.8, experience: 9, available: true,
    hospital: "Skin Health Institute", fee: 130,
    bio: "Dermatologist expert in skin conditions and cosmetics.",
    education: ["MBBS - UCLA", "MD Dermatology - Northwestern"],
    image: "https://placehold.co/300x200/1e3a5f/white?text=Dr.+Chen"
  }
];

// GET /api/doctors
const getAllDoctors = (req, res) => {
  const { specialty, available, minRating, sort } = req.query;

  let result = [...doctors];

  // Filter by specialty
  if (specialty) {
    result = result.filter(d =>
      d.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  // Filter by availability
  if (available !== undefined) {
    result = result.filter(d => d.available === (available === 'true'));
  }

  // Filter by minimum rating
  if (minRating) {
    result = result.filter(d => d.rating >= parseFloat(minRating));
  }

  // Sort
  if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating);
  if (sort === 'experience') result.sort((a, b) => b.experience - a.experience);
  if (sort === 'name')       result.sort((a, b) => a.name.localeCompare(b.name));

  res.json({
    success: true,
    count: result.length,
    data: result
  });
};

// GET /api/doctors/:id
const getDoctorById = (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));

  if (!doctor) {
    return res.status(404).json({ success: false, error: 'Doctor not found' });
  }

  res.json({ success: true, data: doctor });
};

// POST /api/doctors
const createDoctor = (req, res) => {
  const newDoctor = {
    id: doctors.length + 1,
    ...req.body,
    rating: 0,
    available: true
  };
  doctors.push(newDoctor);
  res.status(201).json({ success: true, data: newDoctor });
};

// PUT /api/doctors/:id
const updateDoctor = (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Doctor not found' });
  }

  doctors[idx] = { ...doctors[idx], ...req.body };
  res.json({ success: true, data: doctors[idx] });
};

// DELETE /api/doctors/:id
const deleteDoctor = (req, res) => {
  const idx = doctors.findIndex(d => d.id === parseInt(req.params.id));

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Doctor not found' });
  }

  doctors.splice(idx, 1);
  res.json({ success: true, message: 'Doctor deleted successfully' });
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
