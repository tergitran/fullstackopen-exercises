import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [messageDisplay, setMessageDisplay] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };
  const enterSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        // update already existing user
        const data = { ...existingPerson, number: newPhone };
        personService
          .updatePerson(existingPerson.id, data)
          .then((res) => {
            setPersons(
              persons.map((p) => (p.id !== existingPerson.id ? p : res.data))
            );
            setNewName("");
            setNewPhone("");

            setMessageDisplay({
              content: `Updated ${res.data.name}`,
              isError: false,
            });
            setTimeout(() => {
              setMessageDisplay(null);
            }, 5000);
          })
          .catch((error) => {
            alert("Can't update user");
          });
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewPhone("");

          setMessageDisplay({
            content: `Added ${response.data.name}`,
            isError: false,
          });
          setTimeout(() => {
            setMessageDisplay(null);
          }, 5000);
        })
        .catch((error) => {
          alert("Fail to save person");
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setMessageDisplay({
            content: `Information of ${person.name} has already been removed from server`,
            isError: true,
          });
          setTimeout(() => {
            setMessageDisplay(null);
          }, 5000);
        });
    }
  };

  const displayList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageDisplay} />
      <Filter enterSearch={enterSearch} />
      <h2>Add new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleInputChange={handleInputChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons displayList={displayList} handleDelete={handleDelete} />
    </div>
  );
};

export default App;