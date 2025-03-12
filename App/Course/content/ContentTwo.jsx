function ContentTwo({ courses }) {
  const totalExercises = courses[1].parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <>
      <h2>{courses[1].name}</h2>
      <ul>
        {courses[1].parts.map((part) => (
          <li key={part.id}>
            {part.name}: {part.exercises}{" "}
          </li>
        ))}
      </ul>
      <p>Total exercises:{totalExercises}</p>
    </>
  );
}

export default ContentTwo;
