import axios from "axios";

export const recommendLifestyle = async (req, res) => {
  try {
    const PY_SERVICE = process.env.PY_SERVICE || "http://127.0.0.1:5001";

    // call Flask and DO NOT throw on non-2xx so we can pass error back
    const r = await axios.post(`${PY_SERVICE}/recommend`, req.body, {
      timeout: 20000,
      validateStatus: () => true,
    });

    // success
    if (r.status >= 200 && r.status < 300) {
      return res.status(200).json(r.data);
    }

    // bubble up python error to client so we can see it
    console.error("Python responded with error:", r.status, r.data);
    return res.status(r.status).json({
      error: r.data?.error || "Python error",
      details: r.data,
      status: r.status,
    });
  } catch (err) {
    console.error("Proxy error:", err?.response?.data || err.message);
    return res.status(500).json({
      error: "Proxy error",
      details: err?.response?.data || err.message,
    });
  }
};
