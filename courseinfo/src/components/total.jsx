function Total({ parts }) {
  const totalParts = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>Total Parts:{totalParts}</p>;
}

export default Total;
