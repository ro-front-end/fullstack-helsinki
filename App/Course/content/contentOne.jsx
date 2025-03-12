function ContentOne({ courses }) {
  const totalExercises = Math.max(
    courses[0].parts.reduce((sum, part) => sum + part.exercises, 0)
  );

  return (
    <>
      <h2>{courses[0].name} </h2>

      <ul>
        {courses[0].parts.map((part) => (
          <>
            <li key={part.id}>
              {" "}
              {part.name}: {part.exercises}{" "}
            </li>
          </>
        ))}
      </ul>
      <p>Total exercises: {totalExercises}</p>
    </>
  );
}

export default ContentOne;
