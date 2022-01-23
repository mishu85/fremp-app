import React, { useState, useEffect } from "react";
import Results from "./components/Results";
import NewName from "./components/NewName";
import "./App.css";
import axios from "axios";

function App(props) {
  // const [state, setState] = useState({name: '', names: [], loading: true });

  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    getNames();
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    await axios.post("/names", formData);
    getNames();
  };

  const handleDeleteAll = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    await axios.delete("/names");
    getNames();
  };

  const handleDelete = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    await axios.delete("/names/" + ev.target.id);
    getNames();
  };

  // const getNames = () => {
  //   fetch("/getnames/")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setName("");
  //       setNames(json);
  //       setLoading(false);
  //     });
  // };

  const getNames = async () => {
    const response = await axios.get("/names");
    setName("");
    setNames(response.data.data);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <NewName
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={name}
        />
        <button onClick={handleDeleteAll}>Delete all names</button>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Results names={names} handleDelete={handleDelete} />
        )}
      </header>
    </div>
  );
}
export default App;
