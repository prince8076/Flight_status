import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightList = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/flights/')
            .then(response => {
                setFlights(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the flight data!", error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Flight Status</h1>
            <ul style={styles.list}>
                {flights.map(flight => (
                    <li key={flight.flight_number} style={styles.listItem}>
                        <div style={styles.flightNumber}>{flight.flight_number}</div>
                        <div style={styles.flightDetails}>
                            <span style={styles.status}>{flight.status}</span> at gate <span style={styles.gate}>{flight.gate}</span>
                        </div>
                        <div style={styles.departureTime}>
                            {flight.delay ? `Delayed by ${flight.delay} minutes` : `Departure: ${flight.departure_time}`}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '2rem',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        padding: '15px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        marginBottom: '10px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
    },
    listItemHover: {
        backgroundColor: '#e0e0e0',
    },
    flightNumber: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    flightDetails: {
        margin: '5px 0',
    },
    status: {
        color: '#007bff',
    },
    gate: {
        fontWeight: 'bold',
    },
    departureTime: {
        color: '#555',
    }
};

export default FlightList;
