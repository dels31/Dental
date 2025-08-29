import React from "react";

const TestCORS = () => {
  const testFetch = async () => {
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbyP3Rb1PX6NxS7bUV9Xlmn7DaT8G6OERIreAboibXPqGisl1N1Ho5G0GmzPq4l71t9V8A/exec", {
        method: "GET"
      });
      const text = await res.text();
      console.log("✅ Response:", text);
      alert("CORS OK: " + text);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("CORS ERROR: " + err.message);
    }
  };

  return (
    <button 
      onClick={testFetch} 
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Test CORS
    </button>
  );
};

export default TestCORS;
