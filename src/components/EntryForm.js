import "../UI/style.scss";
import { useState } from "react";
import axios from "axios";

const EntryForm = (props) => {
  // Create state handlers for input
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [category, setCategory] = useState("");

  let list_of_categories = props.entries.map((entry) => entry.category);
  let unique_categories = [...new Set(list_of_categories)];

  const submitHandler = (event) => {
    event.preventDefault();

    // Endpoint expects a JSON object in the request body
    axios
      .post("http://localhost:5000/entries/add", {
        term: term,
        definition: definition,
        category: category,
      })
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error.message);
      });

    setTerm("");
    setDefinition("");
    setCategory("");
  };

  return (
    <form onSubmit={submitHandler} className="form-class" autoComplete="off">
      <div>
        <input
          type="text"
          name="term-name"
          placeholder="Enter term here..."
          id="term-textfield"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          name="def-name"
          placeholder="Enter definition here..."
          id="definition-textfield"
          value={definition}
          onChange={(e) => {
            setDefinition(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          list="entry-categories"
          placeholder="Choose category"
          className="data-list-style"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <datalist id="entry-categories">
          {unique_categories.map((category) => {
            return <option key={category} value={category} />;
          })}
        </datalist>
      </div>
      <button type="submit" id="submit-button">
        Submit
      </button>
    </form>
  );
};

export default EntryForm;
