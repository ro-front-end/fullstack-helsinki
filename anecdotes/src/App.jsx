import { useState } from "react";

function App() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));

  const mostVotedAnecdote = votes.indexOf(Math.max(...votes));

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const handleClick = () => {
    const randomSelection = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomSelection);
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <p>{`${anecdotes[selected]} `}</p>

      <p>{`This anecdote has ${votes[selected]} votes`}</p>

      <p>
        The anecdote ith most votes is anecdotes is:{" "}
        {anecdotes[mostVotedAnecdote]}
      </p>

      <button onClick={handleVotes}>Upvote</button>

      <button onClick={handleClick}>Next anecdote</button>
    </div>
  );
}

export default App;
