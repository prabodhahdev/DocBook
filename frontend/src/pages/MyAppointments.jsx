import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { token , getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["","Jan" ,"Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) =>{
    const dateAttay =slotDate.split('_')
    return dateAttay[0]+" " +months[Number(dateAttay[1])] + " " +dateAttay[2]
  }
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/user/appointment-lists', { headers: { token } });
      
      if (data.success) {
        setAppointments(data.appointment.reverse());
 
        console.log(data.appointment);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };


  // cancel appointmnt

  const cancelAppointment = async (appointmentId) => {
    try {
      
      const {data} = await axios.post('http://localhost:8000/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.msg)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.msg)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
      
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 text-gray-500 text-xl font-bold border-b'>My Appointments</p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div key={index} className='grid gap-4 grid-cols-[1fr_2fr] sm:flex sm:gap-6 border-b items-end p-2'>
              <div>
                <img className='w-32 bg-indigo-50' src={item?.docData?.image || 'fallback-image.jpg'} alt="Doctor" />
              </div>            
              <div className='flex-1 text-zinc-500 text-sm'>
                <p className='text-zinc-700 text-lg font-bold'>{item?.docData?.name || 'Unknown Doctor'}</p>
                <p>{item?.docData?.speciality || 'N/A'}</p>
                <p className='pt-2 text-zinc-500 font-bold'>Address:</p>
                <p>{item?.docData?.address?.line1 || 'No Address'}</p>
                <p>{item?.docData?.address?.line2 || ''}</p>
                <p className='pt-2'><span className='text-zinc-500 font-bold'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>

              <div className='flex flex-col gap-3 justify-end'>
                { !item.canceled &&  !item.payment && !item.isCompleted &&
                 <button className='text-black border border-gray text-sm py-2 sm:min-w-[48px] hover:bg-primary hover:text-white'>
                   Pay Online
                 </button>
                }
               
                {!item.canceled &&  !item.payment && !item.isCompleted &&

                  <button onClick={()=> cancelAppointment(item._id)} className='text-black border border-gray text-sm py-2 px-10 hover:bg-red-600 hover:text-white'>
                  Cancel Appointment
                 </button>

                }
                
                  {item.canceled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-x-red-500 rounded text-red-500'>Appointment cancelled</button>}
                
                  {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 '>Completed</button>}
                
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 mt-4'>No Appointments Found</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
