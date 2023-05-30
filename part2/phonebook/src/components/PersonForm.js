const PersonForm = (props) => {
  const {handleSubmit, newName, newPhone, handleInputChange, handlePhoneChange} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
