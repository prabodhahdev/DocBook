import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* 🟢 Fixed Header Row */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-100 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* 🟢 Mapping Appointments Separately */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full" />
              <p>{item.userData.name}</p>
            </div>
                <p
                  className={`text-xs inline-block px-2 py-1 rounded-full border-2 w-14 ${
                    item.payments ? "border-primary text-primary" : "border-primary text-primary"
                  }`}
                >
                  {item.payments ? "Online" : "CASH"}
            </p>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            <div className="flex gap-2">
              <img src={assets.cancel_icon} alt="Cancel" className="w-10 h-10 cursor-pointer" />
              <img src={assets.tick_icon} alt="Approve" className="w-10 h-10 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
