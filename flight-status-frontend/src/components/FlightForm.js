import React, { useState } from 'react';
import axios from 'axios';

const FlightForm = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [status, setStatus] = useState('');
    const [gate, setGate] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/flights/', {
            flight_number: flightNumber,
            status: status,
            gate: gate,
            departure_time: departureTime
        })
            .then(response => {
                console.log(response.data);
                // Clear form fields after successful submission
                setFlightNumber('');
                setStatus('');
                setGate('');
                setDepartureTime('');
            })
            .catch(error => {
                console.error("There was an error creating the flight!", error);
            });
    };

    const formStyle = {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '8px 0',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const labelStyle = {
        display: 'block',
        margin: '8px 0 4px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Add New Flight</h2>
            <div>
                <label style={labelStyle}>Flight Number</label>
                <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Status</label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Gate</label>
                <input
                    type="text"
                    value={gate}
                    onChange={(e) => setGate(e.target.value)}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Departure Time</label>
                <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    required
                    style={inputStyle}
                />
            </div>
            <button type="submit" style={buttonStyle}>Add Flight</button>
        </form>
    );
};

export default FlightForm;
