import React, { useState } from "react";

function ConsultForm() {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        bmi: "",
        smoking: "",
        alcohol: "",
        stressLevel: "",
        dietType: "",
        exerciseFrequency: "",
        comorbidities: "",
        reportedSymptoms: "",
    });

    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                    text: "Based on your answers, I suggest maintaining a balanced diet, regular exercise, managing stress, avoiding smoking and alcohol, and consulting a healthcare professional for further guidance.",
                },
            ]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-pink-100 mt-100px flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg border border-pink-200">
                <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">
                    Psoriasis Consultation
                </h1>

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

                    {/* BMI */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">BMI</label>
                        <input
                            type="number"
                            name="bmi"
                            value={formData.bmi}
                            onChange={handleChange}
                            placeholder="e.g., 24.5"
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Smoking */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Smoking</label>
                        <select
                            name="smoking"
                            value={formData.smoking}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Alcohol */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Alcohol</label>
                        <select
                            name="alcohol"
                            value={formData.alcohol}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Stress Level */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Stress Level</label>
                        <select
                            name="stressLevel"
                            value={formData.stressLevel}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Diet Type */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Diet Type</label>
                        <select
                            name="dietType"
                            value={formData.dietType}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="balanced">Balanced</option>
                            <option value="junk-heavy">Junk-heavy</option>
                            <option value="vegetarian">Vegetarian</option>
                        </select>
                    </div>

                    {/* Exercise Frequency */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Exercise Frequency</label>
                        <select
                            name="exerciseFrequency"
                            value={formData.exerciseFrequency}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="">Select</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Comorbidities */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Comorbidities</label>
                        <textarea
                            name="comorbidities"
                            value={formData.comorbidities}
                            onChange={handleChange}
                            placeholder="e.g., diabetes, hypertension, arthritis"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Reported Symptoms */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Reported Symptoms</label>
                        <textarea
                            name="reportedSymptoms"
                            value={formData.reportedSymptoms}
                            onChange={handleChange}
                            placeholder="e.g., itching, redness, scaling, pain"
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

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
