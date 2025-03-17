import React, { useEffect, useState } from 'react'
export default function Hotels() {

  return (
    <>
    <h1>hello</h1>
        <p>{Flights.length}</p>
      {
        Flights.map((Flight) => (
            <div key={Flight._id} className="flight-card">
              <h1>{Flight.airline}</h1>
              <p>{Flight.flightNumber}</p>
              <p>{Flight.departureAirport}</p>
              <p>{Flight.arrivalAirport}</p>
              <p>{Flight.departureTime}</p>
              <p>{Flight.arrivalTime}</p>
              <p>{Flight.status}</p>
              <p>{Flight.journeyDuration}</p>
              <p>{Flight.classType}</p>
              <h1>{Flight.price}</h1>
            </div>
        ))
      }
    </>
  )
}
