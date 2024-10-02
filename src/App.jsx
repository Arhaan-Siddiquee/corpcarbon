import React, { useState } from "react";

const states = {
  "Andaman and Nicobar Islands": 0.79,
  "Andhra Pradesh": 0.91,
  "Arunachal Pradesh": 0.11,
  Assam: 1.21,
  Bihar: 2.1,
  Chandigarh: 1.3,
  Chhattisgarh: 1.37,
  "Dadra and Nagar Haveli": 0.84,
  "Daman and Diu": 0.9,
  Delhi: 1.05,
  Goa: 0.71,
  Gujarat: 1.02,
  Haryana: 1.27,
  "Himachal Pradesh": 0.26,
  "Jammu and Kashmir": 0.81,
  Jharkhand: 1.68,
  Karnataka: 0.7,
  Kerala: 0.13,
  Lakshadweep: 1.33,
  "Madhya Pradesh": 1.68,
  Maharashtra: 1.26,
  Manipur: 1.56,
  Meghalaya: 0.42,
  Mizoram: 0.65,
  Nagaland: 1.41,
  Odisha: 0.88,
  Puducherry: 0.96,
  Punjab: 0.97,
  Rajasthan: 1.21,
  Sikkim: 1.04,
  "Tamil Nadu": 1.13,
  Telangana: 0.91,
  Tripura: 1.69,
  "Uttar Pradesh": 1.61,
  Uttarakhand: 0.12,
  "West Bengal": 1.29,
};

const emissionFactor = {
  electricity: states,
  fuel: 2.32,
  lpg: 1.8,
  waste: 0.44,
};

const App = () => {
  const [usage, setUsage] = useState({
    electricity: 0,
    fuel: 0,
    lpg: 0,
    waste: 0,
  });
  const [emission, setEmission] = useState({
    electricity: 0,
    fuel: 0,
    lpg: 0,
    waste: 0,
  });
  const [stateInput, setStateInput] = useState("");
  const [totalEmission, setTotalEmission] = useState(0);
  const [members, setMembers] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [success, setSuccess] = useState(false);
  const [danger, setDanger] = useState(false);

  // Storing values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUsage((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    setStateInput(e.target.value);
  };

  // Calculation
  const calculateEmission = () => {
    let emissionResult = {
      electricity: usage.electricity * emissionFactor.electricity[stateInput],
      fuel: usage.fuel * emissionFactor.fuel,
      lpg: usage.lpg * emissionFactor.lpg,
      waste: usage.waste * emissionFactor.waste,
    };

    let totalEmissionCalc = 0;
    for (const key in emissionResult) {
      totalEmissionCalc += emissionResult[key] / members;
    }

    setEmission(emissionResult);
    setTotalEmission(totalEmissionCalc);

    if (totalEmissionCalc <= 2000) {
      setSuccess(true);
      setDanger(false);
    } else {
      setSuccess(false);
      setDanger(true);
    }

    setShowResult(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-xl w-full p-7 bg-black rounded-lg shadow-[0_0_50px_rgba(229,57,53,0.9)] border-dashed border-4 border-red-600 shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-white mb-6">CO2 Emission Calculator</h1>
        <div className="bg-gray-700 p-4 rounded-md">
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="state">Select Your State:</label>
            <select
              id="state"
              value={stateInput}
              onChange={handleStateChange}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            >
              <option value="">--Select State--</option> 
              {Object.keys(states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="electricity">Electricity Usage (kWh):</label>
            <input
              type="number"
              name="electricity"
              id="electricity"
              onChange={handleInput}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="fuel">Fuel Usage (liters):</label>
            <input
              type="number"
              name="fuel"
              id="fuel"
              onChange={handleInput}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="lpg">LPG Usage (cylinders):</label>
            <input
              type="number"
              name="lpg"
              id="lpg"
              onChange={handleInput}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="waste">Waste Generation (kg):</label>
            <input
              type="number"
              name="waste"
              id="waste"
              onChange={handleInput}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="members">Number of Workers:</label>
            <input
              type="number"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-600 text-white"
            />
          </div>

          <button
            className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-600 transition duration-300"
            onClick={calculateEmission}
          >
            Calculate
          </button>

          {showResult && (
            <div className={`mt-4 text-center font-bold ${success ? "text-green-500" : "text-red-500"}`}>
              {success
                ? `Total Emission: ${totalEmission.toFixed(2)} kg CO2 per member.`
                : `Total Emission: ${totalEmission.toFixed(2)} kg CO2 per member. You need to reduce your emissions!`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
