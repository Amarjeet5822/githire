const HireDecision = ({ decision }) => {
    if (!decision) return <p>Loading...</p>;
  
    return (
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h3 className="text-lg font-semibold">Decision: {decision.decision}</h3>
        <p>Score: {decision.avgScore.toFixed(2)}</p>
      </div>
    );
  };
  
  export default HireDecision;
  