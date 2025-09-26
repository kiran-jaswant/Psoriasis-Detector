import React, { useState } from "react";

function ConsultForm() {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        symptoms: "",
        duration: "",
        severity: "",
        familyHistory: "",
        medications: "",
        triggers: "",
        lifestyle: "",
        diet: "",
        stressLevel: "",
        otherConditions: "",
    });

    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Simulated chatbot API call
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Push patient answers into chat history
        setChatHistory((prev) => [
            ...prev,
            { sender: "patient", text: `My details: ${JSON.stringify(formData)}` },
        ]);

        // Fake chatbot response (replace with API call later)
        setTimeout(() => {
            setChatHistory((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Based on your answers, I suggest avoiding known triggers, managing stress, following a balanced diet, and consulting a dermatologist for treatment options.",
                },
            ]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-pink-100 mt-100px flex items-center justify-center p-6 ">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg border border-pink-200">
                <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">
                    Psoriasis Consultation
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Age */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Symptoms */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Symptoms
                        </label>
                        <textarea
                            name="symptoms"
                            value={formData.symptoms}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Duration of Condition
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 6 months"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Severity */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Severity
                        </label>
                        <select
                            name="severity"
                            value={formData.severity}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </div>

                    {/* Family History */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Family History of Psoriasis
                        </label>
                        <select
                            name="familyHistory"
                            value={formData.familyHistory}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Current Medications */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Current Medications
                        </label>
                        <textarea
                            name="medications"
                            value={formData.medications}
                            onChange={handleChange}
                            placeholder="List any medications you are taking"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Triggers */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Known Triggers (stress, food, weather, etc.)
                        </label>
                        <textarea
                            name="triggers"
                            value={formData.triggers}
                            onChange={handleChange}
                            placeholder="e.g., stress, cold weather, spicy food"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Lifestyle */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Lifestyle Habits
                        </label>
                        <textarea
                            name="lifestyle"
                            value={formData.lifestyle}
                            onChange={handleChange}
                            placeholder="e.g., smoking, alcohol, sleep patterns"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Diet */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Diet Preferences
                        </label>
                        <textarea
                            name="diet"
                            value={formData.diet}
                            onChange={handleChange}
                            placeholder="e.g., vegetarian, non-vegetarian, high sugar intake"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Stress */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Stress Level
                        </label>
                        <select
                            name="stressLevel"
                            value={formData.stressLevel}
                            onChange={handleChange}
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Other Conditions */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">
                            Other Health Conditions
                        </label>
                        <textarea
                            name="otherConditions"
                            value={formData.otherConditions}
                            onChange={handleChange}
                            placeholder="e.g., diabetes, arthritis"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition disabled:bg-pink-300"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </form>

                {/* Chatbot Section */}
                <div className="mt-8 bg-pink-100 rounded-lg p-4 h-64 overflow-y-auto">
                    <h2 className="text-lg font-semibold text-pink-700 mb-2">Chatbot</h2>
                    {chatHistory.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`mb-2 p-2 rounded-lg max-w-[80%] ${msg.sender === "patient"
                                    ? "bg-pink-200 self-end ml-auto"
                                    : "bg-white border border-pink-200"
                                }`}
                        >
                            <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ConsultForm;
