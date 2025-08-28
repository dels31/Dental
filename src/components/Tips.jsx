import React, { useState } from 'react';
import { GiToothbrush } from "react-icons/gi"
import { FaSmile } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi"
import { FaTooth } from "react-icons/fa";
import { FaSmileBeam } from "react-icons/fa";


const Tips = () => {
    const [activeTip, setActiveTip] = useState(0);

    const tips = [
        { title: "Maintain Good Oral Hygiene",
            content: "Brush your teeth at least twice a day with fluoride toothpaste and floss daily to remove plaque and food particles from between your teeth.", 
            icon: <GiToothbrush className="w-10 h-10 text-green-500"/>,
            },
            { title: "Regular Dental Check-ups", 
            content: "Visit your dentist every six months for a professional cleaning and check-up to catch any potential issues early.",
            icon: <FaTooth className="w-10 h-10 text-sky-500"/> ,
            },
            { title: "Healthy Diet", 
            content: "Limit sugary snacks and drinks, as they can lead to tooth decay. Eat a balanced diet rich in fruits, vegetables, and dairy products to support oral health.",
            icon: <FaSmileBeam className="w-10 h-10 text-yellow-500"/> ,
            },
            { title: "Avoid Tobacco Products", 
            content: "Smoking and chewing tobacco can lead to gum disease, tooth loss, and oral cancer. Quitting these habits can significantly improve your oral health." ,
            icon: <GiWaterDrop className="w-10 h-10 text-purple-500"/>,
            },
            { title: "Use Mouthwash", 
            content: "An antimicrobial mouthwash can help reduce plaque and prevent gum disease. Look for one that contains fluoride for added protection against tooth decay." ,
            icon: <FaSmile className="w-10 h-10 text-red-500"/>,
            },
        ];

  return (
    <section id="tips" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Dental Care Tips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Follow these essential dental care tips to maintain a healthy and beautiful smile.</p>   
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {tips.map((tip, index)=> (
            <button
                key={index}
                onClick={() => setActiveTip(index)}
                className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center ${
                    activeTip === index
                        ? 'bg-white shadow-lg border-b-4 border-sky-400'
                        : 'bg-gray-100 hover:bg-blue-200'
                }`}
            >
                <div className="mb-2">{tip.icon}</div>
                <h3 className="font-medium text-gray-800 text-sm md:text-base">{tip.title}</h3>
            </button>

            ))}

        </div>
        <div className="bg-gradient-to-r from-sky-50 to-blue-100 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 bg-white p-6 rounded-xl shadow-md">
                    {tips[activeTip].icon}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{tips[activeTip].title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{tips[activeTip].content}</p> 
                </div> 
            </div>
        </div>
        <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
                {tips.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTip(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            activeTip === index 
                            ? 'bg-sky-500' 
                            : 'bg-gray-300 hover:bg-sky-400'
                        }`} aria-label={`Go to tip ${index + 1}`}
                    ></button>
                    ))}
            </div>

        </div>
    </section>
  );
};

export default Tips
