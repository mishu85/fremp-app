function Results(props) {
  return props.names.map((row) => (
    <div key={row.id}>
      {row.name} {" "}
      <button id={row.id} onClick={props.handleDelete}>Delete</button>
    </div>
  ));
}

export default Results;
