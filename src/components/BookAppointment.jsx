
import React, { useState } from 'react'
import { FaCalendarAlt, FaChevronRight, FaClock, FaPhone, FaUser, FaTooth } from 'react-icons/fa';
import { GiToothbrush } from 'react-icons/gi';
import emailjs from "emailjs-com";
import {  AnimatePresence } from 'framer-motion';


  

const BookAppointment = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        service: 'General Checkup'
    });

    

    const services = [
        'General Checkup',
        'Teeth Cleaning',
        'Cavity Filling',
        'Root Canal',
        'Teeth Whitening',
        'Braces Consultation'
    ];
    const availableTimes = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];
    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prev => ({...prev, [name]: value}));
    };

    const nextStep = () => setActiveStep(prev => prev + 1);
    const prevStep = () => setActiveStep(prev => prev - 1);

    // const API_URL = "https://script.google.com/macros/s/AKfycbyYCNM6r0L-9qpif3skrR4fW0uGfwAYwd-2yc39jjQQxX_MK9vjAFljjSj5oMsClBkV7Q/exec";

    

    const handleConfirm = async () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setModalMessage("⚠️ Semua field wajib diisi sebelum booking!");
      setShowModal(true);
      return;
    }

    try {
      // Kirim email
      await emailjs.send(
        "service_17h9dss",
        "template_jvwnxwh",
        formData,
        "vfI40PCcGoAzTXKJ_"
      );

      // Kirim ke Serverless Proxy
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setModalMessage("✅ Appointment berhasil disimpan!");
        setFormData({
          name: "",
          phone: "",
          date: "",
          time: "",
          service: "General Checkup",
        });
        setActiveStep(1);
      } else {
        setModalMessage("❌ Gagal menyimpan appointment!");
      }
    } catch {
      setModalMessage("⚠️ Terjadi kesalahan server!");
    } finally {
      setShowModal(true);
    }
  };

    


  return (
    <section id='book' className='scroll-mt-20 min-h-screen bg-gradient-to-br from-sky-50 to-sky-50 py-12 px-4'>
        <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-800 mb-3'>Book an Appointment</h1>
                <p className='text-lg text-gray-600'>Schedule your visit to Smile Dental Clinic in a few easy steps.</p>    
            </div>
            <div className='mb-12'>
                <div className='relative'>
                    <div className='absolute top-1/2 left-0 right-0 h-2 bg-grey-100 rounded-full z-0'></div>
                        <div className='absolute top-1/2 left-0 h-2 bg-gradient-to-r from-sky-400 to-sky-400 rounded-full z-0 transition-all duration-500' style={{width: `${(activeStep - 1) * 50}%`}}>
                        </div>
                        <div className='flex justify-between relative z-20'>
                            {[1, 2, 3].map((step) => (
                                <div 
                                 key={step} 
                                 className='flex flex-col items-center cursor-pointer' 
                                 onClick={() => activeStep > step && setActiveStep(step)}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= step ? 'bg-gradient-to-br from-sky-500 to-sky-500 text-white shadow-lg' : 'bg-white text-gray-300 border-2 border-gray-200'} transition-all duration-300 font-bold md-2`}>
                                        {activeStep > step ? (
                                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path 
                                                strokeLinecap='round' 
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 13l4 4L19 7'></path>
                                            </svg>
                                        ) : (
                                            step
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${activeStep >= step
                                        ? 'text-sky-600'
                                        : 'text-gray-400'} transition-colors`}>
                                        {['Your Info', 'Schedule', 'Confirm'][step - 1]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    
                </div>
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
                        {activeStep === 1 && (
                            <div className='p-8'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                                  <FaUser className='mr-3 text-sky-500'/> 
                                  Personal Information
                                </h2>
                                <div className='space-y-6'>
                                    <div className='relative'>
                                        <input 
                                        type="text"
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder='Full name'
                                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-sky-500 focus:ring-sky-200 outline-none transition'
                                        required 
                                        />
                                        <FaUser  className='absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                    </div>
                                    <div className='relative'>
                                        <input 
                                        type="tel"
                                        name='phone'
                                        value={formData.phone}
                                        onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/[^0-9]/g, ""); 
                                        setFormData({ ...formData, phone: onlyNums });
                                        }}
                                        placeholder='Phone number'
                                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-sky-500 focus:ring-sky-200 outline-none transition'
                                        pattern="[0-9]*"    
                                        inputMode="numeric"
                                        />
                                        <FaPhone  className='absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                        
                                    </div>
                                </div>
                           </div>         
                        )}
                        {activeStep === 2 && (
                            <div className='p-8'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                                   <FaCalendarAlt className='mr-3 text-sky-500'/>
                                  Appointment Details
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='relative'>
                                        <input 
                                        type="date"
                                        name='date'
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-sky-500 focus:ring-sky-200 outline-none transition'
                                        required 
                                        min={new Date().toISOString().split('T')[0]}/>
                                        <FaCalendarAlt  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                    </div>
                                    <div className='relative'>
                                        <select 
                                        name='time'
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-sky-500 focus:ring-sky-200 outline-none  appearance-none transition'
                                        required>
                                            <option value="" >Select Time</option>
                                            {availableTimes.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                        <FaClock  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                        <FaChevronRight className='absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400'/>
                                    </div>
                                    <div className='relative md:col-span-2'>
                                        <select 
                                        name='service'
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-sky-500 focus:ring-sky-200 outline-none  appearance-none transition'
                                        required>
                                            {services.map((service) => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                        <FaTooth  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                        <FaChevronRight className='absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400'/>
                                    </div>
                                </div>
                            </div>
                         )}   
                         {activeStep === 3 && (
                            <div className='p-8 text-center'>
                                <div className='inline-flex items-center justify-center bg-sky-100 p-6 rounded-full mb-6'>
                                    <GiToothbrush className='text-4xl text-sky-500'/>
                                </div>
                                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Confirm Your Appointment</h2>  
                                <div className='bg-sky-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto'>
                                    <div className='flex justify-between py-2 border-b border-sky-100'>
                                        <span className='text-gray-600'>Name :</span>
                                        <span className='font-medium'>{formData.name}</span>
                                    </div>
                                    <div className='flex justify-between py-2 border-b border-sky-100'>
                                        <span className='text-gray-600'>Phone :</span>
                                        <span className='font-medium'>{formData.phone}</span>
                                    </div>
                                    <div className='flex justify-between py-2 border-b border-sky-100'>
                                        <span className='text-gray-600'>Date :</span>
                                        <span className='font-medium'>{formData.date}</span>
                                    </div>
                                    <div className='flex justify-between py-2 border-b border-sky-100'>
                                        <span className='text-gray-600'>Time :</span>
                                        <span className='font-medium'>{formData.time}</span>
                                    </div>
                                    <div className='flex justify-between py-2'>
                                        <span className='text-gray-600'>Service :</span>
                                        <span className='font-medium'>{formData.service}</span>
                                    </div>
                                </div>    
                                <button onClick={handleConfirm} className='w-full max-w-xs py-4 bg-gradient-to-r from-sky-500 to-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl   transition-all transform hover:scale-105'>
                                    Confirm & Book Appointment    
                                </button>                          
                            </div> 
                         )}
                         <div className='px-8 pb-8 flex justify-between'>
                            {activeStep > 1 && (
                                <button 
                                onClick={prevStep}
                                className='px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition'>
                                    Back
                                </button>
                            )}
                            {activeStep < 3 && (
                                <button 
                                onClick={nextStep}
                                className='ml-auto px-6 py-3 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition flex items-center'>
                                    Next <FaChevronRight className='ml-2'/>
                                </button>
                            )}
                         </div>
                </div>
            </div>
        </div>

        {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl text-center w-80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-semibold">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default BookAppointment

