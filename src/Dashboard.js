import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [feature1, setFeature1] = useState("");
  const [feature2, setFeature2] = useState("");
  const [predictedValue, setPredictedValue] = useState(null);
  const [modelName, setModelName] = useState("");

  // fetch all metrics
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const response = await axios.get("http://localhost:8080/api/metrics");
    setMetrics(response.data);
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8080/api/metrics/predict",
      {
        feature1: feature1,
        feature2: feature2,
      }
    );

    setPredictedValue(response.data.predictedValue);
    setModelName(response.data.modelName);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#333" }}>Regression Dashboard</h2>

      {/* Metrics Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>Model Name</th>
            <th>Accuracy</th>
            <th>MSE</th>
            <th>r2Score</th>
            <th>RMSE</th>
            <th>Trained At</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.id}>
              <td>{m.modelName}</td>
              <td>{m.accuracy}</td>
              <td>{m.mse}</td>
              <td>{m.r2Score}</td>
              <td>{m.rmse}</td>
              <td>{m.trainedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Prediction Form */}
      <div style={{ marginTop: "30px" }}>
        <h3>Make a Prediction</h3>
        <form onSubmit={handlePredict}>
          <input
            type="number"
            placeholder="Feature 1 value"
            value={feature1}
            onChange={(e) => setFeature1(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
            required
          />
          <input
            type="number"
            placeholder="Feature 2 value"
            value={feature2}
            onChange={(e) => setFeature2(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Predict
          </button>
        </form>
      </div>

      {/* Prediction Result */}
      {predictedValue !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "green" }}>
          Predicted by Linear Regression<strong>{modelName}</strong>:{" "}
          <strong>{predictedValue.toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
}
