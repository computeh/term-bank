import React, { useState, useEffect } from "react";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import FilterForm from "./components/FilterForm";

import axios from "axios";

const App = (props) => {
  const [entries, setEntries] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/entries")
      .then((response) => {
        setEntries(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entries]);

  let filtered_entries = entries
    .filter(
      (entry) => categoryFilter === entry.category || categoryFilter === "All"
    )
    .map((entry) => {
      return (
        <Entry
          term={entry.term}
          definition={entry.definition}
          category={entry.category}
          id={entry._id}
          key={entry._id}
          createdAt={entry.createdAt}
          updatedAt={entry.updatedAt}
        />
      );
    });

  let plural = filtered_entries.length === 1 ? "entry" : "entries";
  let headerText = "List of " + filtered_entries.length + " " + plural + ":";

  return (
    <div>
      <div className="float-container">
        <div className="float-child">
          <p>
            Hi this is Caleb, the creator of Term Bank! Please start by adding a
            new word you learned, along with its definition and category. You
            may sort the existing list of entries by category type. Give it a
            try!
          </p>
          <h1 className="main-header">Term Bank</h1>
          <EntryForm entries={entries} />
          <div>
            <FilterForm
              setCategoryFilter={setCategoryFilter}
              entries={entries}
            />
          </div>
          {headerText}
        </div>
        <div></div>
      </div>
      <div>{filtered_entries}</div>
    </div>
  );
};

export default App;
