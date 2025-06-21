import { useState } from 'react';
import './App.css';
  
const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const addEmployee = () => {
    if (id && name && role && salary) {
      const exists = employees.some(emp => emp.id === id);
      if (exists) {
        alert('Employee ID already exists.');
        return;
      }

      setEmployees([
        ...employees,
        { id, name, role, salary }
      ]);

      // Clear form
      setId('');
      setName('');
      setRole('');
      setSalary('');
    } else {
      alert('Please fill all fields');
    }
  };

  const deleteEmployee = (empId) => {
    setEmployees(employees.filter(emp => emp.id !== empId));
  };

  const searchEmployee = () => {
    const found = employees.find(emp => emp.id === searchId);
    setSearchResult(found || null);
  };

  return (
  
    <div style={{ padding: '20px' }}>
      <h2>Employee Manager</h2>

      <h3>Add Employee</h3>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button onClick={addEmployee}>Add</button>

      <h3>Employee List</h3>
      <ul>
        {employees.map((emp, index) => (
          <li key={index}>
            <strong>{emp.id}</strong> - {emp.name}, {emp.role}, ₹{emp.salary}
            <button onClick={() => deleteEmployee(emp.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Search Employee by ID</h3>
      <input
        type="text"
        placeholder="Enter ID to search"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={searchEmployee}>Search</button>

      {searchResult ? (
        <div>
          <p><strong>Found:</strong> {searchResult.id} - {searchResult.name}, {searchResult.role}, ₹{searchResult.salary}</p>
        </div>
      ) : searchId && (
        <p>No employee found with ID "{searchId}"</p>
      )}
    </div>
  );
};

function App() {
  return (
    <>
    <title>Employee-Database</title>
      <EmployeeManager />
    </>
  );
}

export default App;
