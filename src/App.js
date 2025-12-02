import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [trainingData, setTrainingData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [feature1, setFeature1] = useState("");
  const [feature2, setFeature2] = useState("");
  const [actualValue, setActualValue] = useState(""); // for training
  const [predFeature1, setPredFeature1] = useState(""); // for prediction
  const [predFeature2, setPredFeature2] = useState(""); // for prediction

  // Fetch training and prediction data on load
  useEffect(() => {
    fetchTrainingData();
    fetchPredictionData();
  }, []);

  const fetchTrainingData = async () => {
    const res = await axios.get("http://localhost:8080/api/train");
    setTrainingData(res.data);
  };

  const fetchPredictionData = async () => {
    const res = await axios.get("http://localhost:8080/api/predictions");
    setPredictionData(res.data);
  };

  // Submit training data
  const handleTrain = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/train", {
      feature1: parseFloat(feature1),
      feature2: parseFloat(feature2),
      actualValue: parseFloat(actualValue),
    });
    setFeature1("");
    setFeature2("");
    setActualValue("");
    fetchTrainingData();
  };

  // Submit prediction
  const handlePredict = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/predict", {
      feature1: parseFloat(predFeature1),
      feature2: parseFloat(predFeature2),
    });
    setPredFeature1("");
    setPredFeature2("");
    fetchPredictionData();
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Regression Dashboard</h1>

      <h2>Train Model</h2>
      <form onSubmit={handleTrain}>
        <input
          type="number"
          placeholder="Feature 1"
          value={feature1}
          onChange={(e) => setFeature1(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Feature 2"
          value={feature2}
          onChange={(e) => setFeature2(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Actual Value"
          value={actualValue}
          onChange={(e) => setActualValue(e.target.value)}
          required
        />
        <button type="submit">Train</button>
      </form>

      <h2>Predict</h2>
      <form onSubmit={handlePredict}>
        <input
          type="number"
          placeholder="Feature 1"
          value={predFeature1}
          onChange={(e) => setPredFeature1(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Feature 2"
          value={predFeature2}
          onChange={(e) => setPredFeature2(e.target.value)}
          required
        />
        <button type="submit">Predict</button>
      </form>

      <h2>Training Data</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Feature 1</th>
            <th>Feature 2</th>
            <th>Actual Value</th>
          </tr>
        </thead>
        <tbody>
          {trainingData.map((data, index) => (
            <tr key={index}>
              <td>{data.feature1}</td>
              <td>{data.feature2}</td>
              <td>{data.actualValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Predictions</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Feature 1</th>
            <th>Feature 2</th>
            <th>Predicted Value</th>
          </tr>
        </thead>
        <tbody>
          {predictionData.map((data, index) => (
            <tr key={index}>
              <td>{data.feature1}</td>
              <td>{data.feature2}</td>
              <td>{data.predictedValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
