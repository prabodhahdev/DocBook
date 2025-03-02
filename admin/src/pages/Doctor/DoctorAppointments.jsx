import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments ,completeAppointment,cancelAppointment} = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
  <p className="mb-3 text-lg font-semibold text-gray-700">All Appointments</p>

  <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    
    {/* Fixed Header Row (Hidden on Small Screens) */}
    <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 py-3 px-6 border-b bg-gray-200 font-semibold text-gray-700">
      <p>#</p>
      <p>Patient</p>
      <p>Payment</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Fee</p>
      <p>Action</p>
    </div>

    {/* Appointment List */}
    {appointments.reverse().map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 items-center text-gray-600 py-3 px-6 border-b bg-white hover:bg-gray-50 transition-all"
      >
        <p className="font-medium">{index + 1}</p>

        {/* Patient Info */}
        <div className="flex items-center gap-3">
          <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full border" />
          <p className="font-medium text-gray-700">{item.userData.name}</p>
        </div>

        {/* Payment Status */}
        <p
          className={`text-xs font-medium px-3 py-1 rounded-full border-2 w-16 text-center
            ${item.payments ? "border-blue-500 text-blue-500 bg-blue-100" : "border-green-500 text-green-500 bg-green-100"}`}
        >
          {item.payments ? "Online" : "CASH"}
        </p>

        {/* Age (Hidden on Small Screens) */}
        <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

        {/* Date & Time */}
        <p className="text-gray-700">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

        {/* Fee */}
        <p className="font-semibold text-gray-800">
          {currency}{item.amount}
        </p>

        {/* Status or Actions */}
        {item.canceled ? (
          <p className="text-red-500 font-medium">Canceled</p>
        ) : item.isCompleted ? (
          <p className="text-green-500 font-medium">Completed</p>
        ) : (
          <div className="flex gap-3">
            <img
              onClick={() => cancelAppointment(item._id)}
              src={assets.cancel_icon}
              alt="Cancel"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            />
            <img
              onClick={() => completeAppointment(item._id)}
              src={assets.tick_icon}
              alt="Approve"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default DoctorAppointments;
