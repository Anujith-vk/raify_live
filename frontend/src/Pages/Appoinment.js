import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import bg from '../assets/bg.jpg'

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState({
    name: '',
    phone_number: '',
    date: '',
    timeSlot: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  const allTimeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await axios.get('http://localhost:5000/show');
        setAppointments(result.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const resetForm = () => {
    setData({
      name: '',
      phone_number: '',
      date: '',
      timeSlot: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.phone_number || !data.date || !data.timeSlot) {
      toast.error("Please fill all the Feilds")
    }
    try {
      const response = await axios.post('http://localhost:5000/Appoinment', {
        name: data.name,
        phone_number: data.phone_number,
        date: data.date,
        time: data.timeSlot
      });
      if (response) {
        toast.success(response.data.message);
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking appointment');
      console.error('Error submitting appointment:', error);
    }
  };
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setData((prevData) => ({ ...prevData, date: selectedDate }));
    setAvailableSlots(allTimeSlots);
  };
  const handleTimeSlotChange = (event) => {
    const selectedTimeSlot = event.target.value;
    setData((prevData) => ({ ...prevData, timeSlot: selectedTimeSlot }));
  };

  return (
    <div className=' flex items-center justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              id='name'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
              placeholder='Your Name'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='tel'
              id='phone'
              value={data.phone_number}
              onChange={(e) => setData({ ...data, phone_number: e.target.value })}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
              placeholder='Your Phone Number'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='date' className='block text-sm font-medium text-gray-700'>Select Appointment Date</label>
            <input
              type='date'
              id='date'
              value={data.date}
              onChange={handleDateChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='timeSlot' className='block text-sm font-medium text-gray-700'>Select Time Slot</label>
            <select
              id='timeSlot'
              value={data.timeSlot}
              onChange={handleTimeSlotChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            >
              <option value=''>-- Select a Time Slot --</option>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)
              ) : (
                <option value='' disabled>No available slots</option>
              )}
            </select>
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600'>
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
