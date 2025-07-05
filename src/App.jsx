import React, { useState, useEffect } from 'react';
import './App.css';
import disableDevtool from 'disable-devtool';
disableDevtool();
import { appVersion } from './version'; // Ensure this file exports appVersion

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const addEmployee = () => {
    if (id && name && role && salary) {
      if (employees.some(emp => emp.id === id)) {
        alert('Employee ID already exists.');
        return;
      }
      setEmployees([...employees, { id, name, role, salary }]);
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

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Login to Employee Manager</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => {
          if (username === 'dharsan' && password === '1234') {
            setIsLoggedIn(true);
          } else {
            alert('Invalid credentials');
          }
        }}>Login</button>
      </div>
    );
  }

  return (
    <div className="app" style={{ padding: '20px' }}>
      {/* Settings Button - Top Right */}
      <button
        onClick={() => setSettingsVisible(!settingsVisible)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 15px',
          zIndex: 1000,
          backgroundColor: darkMode ? '#444' : '#e0e0e0',
          border: '1px solid #999',
          borderRadius: '5px',
          cursor: 'pointer',
          color: darkMode ? '#fff' : '#000'
        }}
      >
        {settingsVisible ? 'Close Settings' : 'Open Settings'}
      </button>

      {/* Settings Panel */}
      {settingsVisible && (
        <div style={{
          marginTop: '60px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '6px',
          backgroundColor: darkMode ? '#333' : '#f9f9f9',
          color: darkMode ? '#fff' : '#000'
        }}>
          <h3>Settings</h3>
          <button onClick={() => setDarkMode(!darkMode)}>
            Change to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          <div style={{ marginTop: '15px' }}>
            <h4>App Info</h4>
            <p>This is a simple Employee Management System.</p>
            <p>Year: 2025</p>
            <p><strong>Version:</strong> {appVersion}</p>
          </div>
        </div>
      )}

      <h2>Employee Manager</h2>

      <h3>Add Employee</h3>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
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
  <title>Employee-DB</title>
  return <EmployeeManager />;
}

export default App;
