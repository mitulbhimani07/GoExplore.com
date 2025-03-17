import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import "../assets/css/airline.css"; // Import your existing styles
import axios from 'axios'

export default function Home() {
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState("return");
  

  const [Flights, setFlights] = useState([])
  useEffect(() => {
    axios.get('http://localhost:9090/Flights/flights')
      .then((response) => {
        setFlights(response.data.data);
        console.log(response.data.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="banner min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 md:px-6 lg:px-8"
        style={{
          backgroundImage:
            "url('https://cdn.vectorstock.com/i/500p/38/26/jet-cruising-in-the-sky-vector-53826.jpg')",
        }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          The best flight offers from anywhere, to everywhere
        </h1>

        {/* Flight Search Box */}
        <div className="search-box bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
          {/* Trip Type Selection */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4">
            {["return", "one-way", "multi-city"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="trip"
                  value={type}
                  checked={tripType === type}
                  onChange={(e) => setTripType(e.target.value)}
                  className="form-radio text-blue-500"
                />
                <span className="capitalize">{type.replace("-", " ")}</span>
              </label>
            ))}
          </div>

          {/* Flight Input Fields */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">From</label>
              <input
                type="text"
                className="input-field w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="India (IN)"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">To</label>
              <input
                type="text"
                className="input-field w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Country, city, or airport"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {/* Depart Date Picker */}
            <div className="flex-1">
              <label className="block text-sm font-medium">Depart</label>
              <DatePicker
                selected={departDate}
                onChange={(date) => setDepartDate(date)}
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Select date"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* Return Date Picker (Only Show if 'Return' is Selected) */}
            {tripType === "return" && (
              <div className="flex-1">
                <label className="block text-sm font-medium">Return</label>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            )}
          </div>

          {/* Travelers & Class Selection */}
          <div className="flex items-center mt-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Travelers & Class</label>
              <select className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <option className="text-black" selected>Choose Class</option>
                <option className="text-black" value="Economy">Economy</option>
                <option className="text-black" value="Business">Business</option>
                <option className="text-black" value="First">First Class</option>
              </select>
            </div>
            <div className="ml-4">
              <button className="search-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* about */}
      <div class="flex flex-wrap justify-center gap-4 mt-8">


        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700" style={{ backgroundColor: 'oklch(0.83 0.17 67.58)' }}>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
            <path d="M18.012 13.453c-.219-1.173-2.163-1.416-2.6-3.76l-.041-.217c0 .006 0-.005-.007-.038v.021l-.017-.09-.005-.025v-.006l-.265-1.418a5.406 5.406 0 0 0-5.051-4.408.973.973 0 0 0 0-.108L9.6 1.082a1 1 0 0 0-1.967.367l.434 2.325a.863.863 0 0 0 .039.1A5.409 5.409 0 0 0 4.992 9.81l.266 1.418c0-.012 0 0 .007.037v-.007l.006.032.009.046v-.01l.007.038.04.215c.439 2.345-1.286 3.275-1.067 4.447.11.586.22 1.173.749 1.074l12.7-2.377c.523-.098.413-.684.303-1.27ZM1.917 9.191h-.074a1 1 0 0 1-.924-1.07 9.446 9.446 0 0 1 2.426-5.648 1 1 0 1 1 1.482 1.343 7.466 7.466 0 0 0-1.914 4.449 1 1 0 0 1-.996.926Zm5.339 8.545A3.438 3.438 0 0 0 10 19.1a3.478 3.478 0 0 0 3.334-2.5l-6.078 1.136Z" />
          </svg>

          <p class="mb-3 font-normal text-gray-100 dark:text-gray-900">Explore the best flight deals from anywhere, to everywhere, then book with no fees</p>

        </div>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700" style={{ backgroundColor: 'oklch(0.83 0.17 67.58)' }}>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
          </svg>

          <p class="mb-3 font-normal text-gray-100 dark:text-gray-900">Compare flight deals from over 1000 providers, and choose the cheapest, fastest or lowest-emission tickets</p>

        </div>
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700" style={{ backgroundColor: 'oklch(0.83 0.17 67.58)' }}>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
            <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
            <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
          </svg>

          <p class="mb-3 font-normal text-gray-100 dark:text-gray-900">Find the cheapest month - or even day - to fly, and set up Price Alerts to book when the price is right</p>

        </div>

      </div>
      {/* Main Section */}
      <main className="px-4 md:px-6 lg:px-8 mt-5">
        <div className="text-center">
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight text-gray-900">
            Flight deals  <span className="text-blue-600">from India</span> (IN).
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl">
            Here at Flowbite, we focus on markets where technology, innovation, and capital
            can unlock long-term value and drive economic growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {Flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 max-w-2xl overflow-hidden"
            >
              <div className="flex h-full">
                {/* Left Section (Flight Details) */}
                <div className="p-6 w-3/4 text-gray-800 dark:text-gray-200">
                  {/* Airline Name & Flight Number */}
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{flight.airline}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{flight.flightNumber}</p>
                  </div>

                  {/* Departure & Arrival Details */}
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">From</p>
                      <p className="text-xl font-bold">{flight.departureAirport} </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{flight.departureDate} | {flight.departureTime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-md font-semibold text-gray-500 dark:text-gray-400">────── ✈ ──────</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">To</p>
                      <p className="text-xl font-bold"> {flight.arrivalAirport}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{flight.returnDate} | {flight.arrivalTime}</p>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="mt-4 flex justify-between">
                    <p className="text-md font-semibold">Passenger: {flight.passengerName || "John Doe"}</p>
                    <p className="text-md font-semibold">Seat: {flight.seatNumber || "Auto Assigned"}</p>
                  </div>

                  {/* Flight Class */}
                  <p className="text-md font-semibold mt-2">Class: {flight.classType}</p>

                  {/* Dotted Line Separator */}
                  <div className="border-t-2 border-dotted my-4 dark:border-gray-500"></div>
                </div>

                {/* Right Section (QR & Price) */}
                <div className="w-1/4 bg-blue-50 dark:bg-gray-700 p-6 flex flex-col justify-between items-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=FlightBooking"
                    alt="QR Code"
                    className="w-20 h-20 transition-transform duration-300 hover:scale-110"
                  />
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-300">₹ {flight.price}</p>
                  <a href="#"
                    className="text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-md font-medium px-4 py-2 rounded-md transition-all">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav aria-label="Page navigation example">
            <ul class="flex items-center -space-x-px h-10 text-base">
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="sr-only">Previous</span>
                  <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span class="sr-only">Next</span>
                  <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </main>
    </div>
  );
}
