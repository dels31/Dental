import React from "react";

const TestCORS = () => {
  const testFetch = async () => {
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbyYCNM6r0L-9qpif3skrR4fW0uGfwAYwd-2yc39jjQQxX_MK9vjAFljjSj5oMsClBkV7Q/exec", {
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
