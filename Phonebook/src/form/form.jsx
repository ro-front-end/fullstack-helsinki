function Form({ handleSubmit, setNewName, setNewNumber }) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          name="newName"
          placeholder="Type a name..."
        />
      </div>

      <div>
        number:{" "}
        <input
          type="number"
          onChange={(e) => setNewNumber(e.target.value)}
          name="newNumber"
          placeholder="Type a number..."
        />
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default Form;
