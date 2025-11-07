import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

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
  const [recs, setRecs] = useState(null); // <- we will render this below

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // simple card for a bucket of items
  const Bucket = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="p-4 rounded-xl shadow-sm border border-pink-200 mb-4 bg-white">
        <h3 className="font-semibold mb-2 text-pink-700 capitalize">{title.replaceAll("_", " ")}</h3>
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="text-sm">
              <div className="font-medium">{it.text}</div>
              {it.why && <div className="opacity-70">Why: {it.why}</div>}
              {Number.isFinite(it.score) && (
                <div className="opacity-60">Confidence: {Math.round(it.score * 100)}%</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecs(null);

    setChatHistory((prev) => [
      ...prev,
      { sender: "patient", text: `My details: ${JSON.stringify(formData)}` },
    ]);

    // map UI -> backend schema
    const toNumber = (v) => (v === "" ? null : Number(v));
    const mapGender = (g) => (g === "male" ? "m" : g === "female" ? "f" : "o");
    const mapStress = (s) => (s === "low" ? 3 : s === "medium" ? 6 : s === "high" ? 8 : null);
    const mapDiet = (d) =>
      d === "vegetarian" ? "veg" : d === "balanced" ? "mixed" : d === "junk-heavy" ? "mixed" : null;

    const form_answers = {
      age: toNumber(formData.age),
      sex: mapGender(formData.gender),
      bmi: toNumber(formData.bmi),
      smoking: formData.smoking.toLowerCase(),
      alcohol: formData.alcohol.toLowerCase(),
      stress_level: mapStress(formData.stressLevel),
      diet_profile: mapDiet(formData.dietType),
      // defaults for fields not in the UI yet
      sleep_hours: 7,
      climate: "temperate",
      occupation: "indoor",
      scalp_involved: "no",
      harsh_soap_use: "no",
      moisturiser_use: "no",
      itch_severity: 0,
      flare_frequency: 0,
    };

    try {
      const res = await fetch(`${API_BASE}/consultation/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_answers,
          image_severity: "moderate", // later: replace with actual ML severity
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || data?.details || `HTTP ${res.status}`);

      setRecs(data); // <-- store recommendations
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Lifestyle recommendations generated successfully. Scroll below to view suggestions 👇" },
      ]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: `Failed to get recommendations: ${String(err.message || err)}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // convenience getter
  const buckets = recs?.recommendations || null;

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl border border-pink-200">
        <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">Psoriasis Consultation</h1>

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
              <option value="female">Female</option>
              <option value="male">Male</option>
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

        {/* Chatbot */}
        <div className="mt-8 bg-pink-100 rounded-lg p-4 h-48 overflow-y-auto">
          <h2 className="text-lg font-semibold text-pink-700 mb-2">Chatbot</h2>
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                msg.sender === "patient"
                  ? "bg-pink-200 self-end ml-auto"
                  : "bg-white border border-pink-200"
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Recommendations section */}
        {buckets && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-pink-700 mb-3">Lifestyle Recommendations</h2>
            {Object.entries(buckets)
              .filter(([k]) => k !== "safety")
              .map(([bucketName, items]) => (
                <Bucket key={bucketName} title={bucketName} items={items} />
              ))}

            {/* safety/footer note */}
            {buckets.safety?.length > 0 && (
              <div className="text-xs opacity-70 mt-2">
                {buckets.safety[0].text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultForm;
