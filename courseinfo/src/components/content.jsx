function Content({ parts }) {
  return (
    <ul>
      {parts.map((part) => (
        <li key={part.name}>
          {part.name} {part.exercises}{" "}
        </li>
      ))}
    </ul>
  );
}

export default Content;
