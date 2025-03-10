function Statistics({ statistics, increment }) {
  const totalValues = statistics.reduce((sum, value) => sum + value.value, 0);

  return (
    <div>
      {statistics.map((statistic, index) => (
        <button onClick={() => increment(statistic.name)} key={index}>
          {statistic.name}
        </button>
      ))}
      {statistics.map((statistic, index) => (
        <>
          <p key={index}>
            {statistic.name}: {statistic.value}
          </p>
        </>
      ))}
      {totalValues.length === 0 || totalValues === 0 ? (
        <p>No feedback given yet.</p>
      ) : (
        <p>Total reviews: {totalValues}</p>
      )}
    </div>
  );
}

export default Statistics;
