import aboutImg from '../assets/about.png'
import { FaUserMd } from 'react-icons/fa'



const About = () => {
  return (
    <section id='about' className="py-20 scroll-mt-20 bg-sky-50">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 flex justify-center">
                <img src={aboutImg} alt="About" className='w-80 lg:w-[420px] rounded-full shadow-md' />
           </div>
           <div className='w-full lg:w-1/2 space-y-6 text-center lg:text-left'>
                <div className='flex items-center justify-center lg:justify-start space-x-2'>
                    <FaUserMd className='text-sky-600 w-7 h-7'/>
                    <h2 className='text-3xl font-bold text-sky-900'>
                        About Smile Dental Clinic
                    </h2>
                </div>
                <p className='text-gray-700 text-lg leading-relaxed'>    
                    At Smile Dental Clinic, we are committed to providing exceptional dental care in a warm and welcoming environment. Our team of experienced dentists and hygienists use the latest technology and techniques to ensure your smile stays healthy and beautiful. Whether you need a routine check-up or advanced dental procedures, we are here to help you achieve optimal oral health.
                </p>
                <p className='text-gray-700 text-lg leading-relaxed'>
                    Our clinic offers a wide range of services, including preventive care, cosmetic dentistry, restorative treatments, and orthodontics. We believe in educating our patients about their oral health and empowering them to make informed decisions about their dental care. Your comfort and satisfaction are our top priorities, and we strive to create a positive experience for every patient who walks through our doors.
                </p>
           </div>
        </div>
    </section>
  );
};

export default About
