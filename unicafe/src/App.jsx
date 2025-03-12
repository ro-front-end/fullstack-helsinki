import { useState } from "react";
import Statistics from "./components/statistics";

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const statistics = Object.entries(feedback).map(([name, value]) => ({
    name,
    value,
  }));

  const handleIncrement = (type) => {
    if (type in feedback) {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [type]: prevFeedback[type] + 1,
      }));
    } else {
      console.error("Invalid Type", type);
    }
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Statistics increment={handleIncrement} statistics={statistics} />
    </>
  );
}

export default App;
