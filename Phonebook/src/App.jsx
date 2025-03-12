import { useEffect, useState } from "react";
import Form from "./form/form";
import Search from "./search/search";
import {
  addPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/personsService";

import "./styles.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllPersons();
        setPersons(data);
      } catch (error) {
        setError("Failed to fetch data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (id, newNumber) => {
    try {
      const person = persons.find((p) => p.id === id);
      if (!person) {
        setMessage(`Person not found`);
        setShowMessage(true);
        return;
      }

      const updatedPerson = await updatePerson(id, {
        name: person.name,
        number: newNumber,
      });

      setPersons((prevPersons) =>
        prevPersons.map((person) => (person.id === id ? updatedPerson : person))
      );
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage(`Person was already removed from the server`);
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
      } else {
        setError("Error updating person: " + err.message);
      }
      setShowMessage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`name:${newName} is already added to the phonebook`);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    try {
      const addedPersons = await addPerson(newPerson);

      setPersons([...persons, addedPersons]);

      setMessage(`Added ${newName} to the phonebook`);
      setShowMessage(true);

      setNewName("");
      setNewNumber("");

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (err) {
      setError("Error adding new person: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await deletePerson(id);
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMessage(`Person was already removed from the server`);
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        } else {
          setError(err.message);
        }
        setShowMessage(true);
      }
    }
  };

  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.number.includes(searchTerm)
  );

  return (
    <div className="main-container">
      <h1>Phonebook</h1>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Form
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      {showMessage && <div className="add-message">{message}</div>}

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <div className="button-container">
              <button
                className="edit-btn"
                onClick={() =>
                  handleUpdate(person.id, prompt("Enter new number"))
                }
              >
                🖊 Edit Number
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(person.id)}
              >
                ✖ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
