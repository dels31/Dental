import { FaSmileBeam, FaTooth, FaXRay } from "react-icons/fa"
import { GiToothbrush } from "react-icons/gi"
import { motion } from "framer-motion"

const service = [
    {
        icon: <FaTooth className="w-10 h-10 text-sky-500"/>,
        title: 'General Dentistry', 
        description: 'Comprehensive dental exams, cleanings, and preventive care to maintain optimal oral health.'
    },
    {
        icon: <GiToothbrush className="w-10 h-10 text-green-500"/>,
        title: 'Cosmetic Dentistry', 
        description: 'Teeth whitening, veneers, and smile makeovers to enhance the appearance of your smile.'
    },
    {
        icon: <FaSmileBeam className="w-10 h-10 text-yellow-500"/>,
        title: 'Restorative Dentistry', 
        description: 'Fillings, crowns, bridges, and dentures to restore the function and aesthetics of damaged or missing teeth.'
    },
    {
        icon: <FaXRay className="w-10 h-10 text-purple-500"/>,
        title: 'Orthodontics', 
        description: 'Traditional braces and clear aligners to straighten teeth and correct bite issues for a healthier smile.'
    },
    
];

const Services = () => {
  return (
    <section className="scroll-mt-20 py-24 bg-gradient-to-br from-white to-sky-50" id="services">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-sky-900 mb-4">Our Dental Services</h2>
                <p className="text-gray-700 max-w-xl mx-auto">
                    At Smile Dental Clinic, we offer a wide range of dental services to meet all your oral health needs. Our experienced team is dedicated to providing high-quality care in a comfortable and friendly environment.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {service.map((service, index) => (
                    <motion.div key={index} 
                        className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border border-sky-100 hover:border-sky-300" 
                        whileHover={{scale: 1.05}} 
                        transition={{type: 'spring', stiffness: 300}}>
                         <  div className="flex items-center justify-center mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-sky-800 mb-2 text-center">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm text-center">
                                {service.description}
                            </p>
                    </motion.div>
                ))}
            </div>
        </div>

    </section>
  );
};

export default Services
