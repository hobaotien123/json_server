const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON payloads
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel");
});

// Route to get all employee records
app.get('/api/employees', (req, res) => {
  try {
    const employeeData = fs.readFileSync(
      path.join(__dirname, 'employee_records.json'),
      'utf8'
    );
    const employees = JSON.parse(employeeData);
    res.json(employees);
  } catch (error) {
    console.error('Error reading employee records:', error);
    res.status(500).json({ error: 'Failed to retrieve employee records' });
  }
});

// Route to get employee by ID
app.get('/api/employees/:id', (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = fs.readFileSync(
      path.join(__dirname, 'employee_records.json'),
      'utf8'
    );
    const employees = JSON.parse(employeeData);
    
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error reading employee record:', error);
    res.status(500).json({ error: 'Failed to retrieve employee record' });
  }
});

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Employee API available at http://localhost:${PORT}/api/employees`);
});
