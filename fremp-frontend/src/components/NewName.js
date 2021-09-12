function NewName(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="newName"
          value={props.value}
          onChange={props.handleChange}
          placeholder="New Name"
          autoFocus
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewName;
