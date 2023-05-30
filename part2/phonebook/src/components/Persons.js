import Person from "./Person"

const Persons = ({ displayList, handleDelete }) => {
  return displayList.map(person => <Person key={person.number} person={person} handleDelete={handleDelete}/>);
};

export default Persons;
