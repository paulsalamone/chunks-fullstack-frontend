import "./App.css";
import Instructions from "./components/Instructions";
import axios from "axios";
import { useState, useEffect } from "react";
import e from "cors";

function App() {
  const [molecules, setMolecules] = useState([]);
  const [newContent, setContent] = useState();
  const [newNote, setNote] = useState();
  const [organism, setOrganism] = useState([]);
  const [linebreakStatus, setLinebreakStatus] = useState(false);
  const [liveOrganism, setLiveOrganism] = useState("");
  let linebreak;

  if (linebreakStatus) {
    linebreak = `\n`;
  } else {
    linebreak = "";
  }

  useEffect(() => {
    fetchMolecules();
  }, []);

  const fetchMolecules = async () => {
    await axios
      .get("http://localhost:3002/api/molecules/")
      .then((res) => setMolecules(res.data.rows));
  };

  const addMolecule = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    await axios
      .post("http://localhost:3002/api/molecules/", {
        content: newContent,
        note: newNote,
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => console.log(response));
    fetchMolecules();

    setContent("");
    setNote("");
  };

  const deleteMolecule = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
  };

  // const addToOrganism = (e) => {
  //   setOrganism({...},  )
  // }

  return (
    <div className="App">
      <Instructions />

      <main>
        {/* MOLECULES */}
        <section>
          <div className="molecules-add">
            <h4>Add new molecule:</h4>
            <form onSubmit={addMolecule}>
              <input
                type="text"
                name="content"
                id="content"
                placeholder="content"
                value={newContent}
                onChange={(e) => setContent(e.target.value)}
              ></input>
              <input
                type="text"
                name="note"
                id="note"
                placeholder="note"
                value={newNote}
                onChange={(e) => setNote(e.target.value)}
              ></input>
              <button type="submit">Submit</button>
            </form>
          </div>
          <h3>Pick a molecule:</h3>
          <div className="molecules-list">
            {molecules.map((e, index) => {
              // console.log("mapping...");
              return (
                <div className="molecules-div" key={e.index}>
                  <div className="molecules-text">
                    <p className="molecules-content">{e.content}</p>
                    <p className="molecules-note">{e.note}</p>
                  </div>
                  <div className="molecules-buttons">
                    {/* <button>Edit</button> */}
                    {/* <button>Delete</button> */}
                    <button
                      onClick={() => {
                        setOrganism([...organism, e.content]);
                        // console.log(organism);
                        console.log(e.content);
                      }}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ORGANISMS */}
        <section>
          <div className="organism-maker">
            <h3>Make your organism</h3>
            {/* <button
              onClick={() => {
                setLinebreakStatus(!linebreakStatus);
              }}
            >
              line break (not working)
            </button> */}
          </div>
          <div
            className="organism-displayer"
            onChange={(e) => setLiveOrganism("ssss")}
          >
            {/* <p className="molecules-content">{organism}</p> */}
            <p className="molecules-content">
              {organism.map((e) => {
                return e;
              })}
            </p>
          </div>
          <button
            style={{
              backgroundColor: "#0f0",
              padding: "10px",
              borderRadius: "5px",
              fontWeigth: "700",
              fontSize: "1.2rem",
            }}
          >
            SAVE ORGANISM TO DATABASE
          </button>
          <br />
          {liveOrganism}
        </section>
      </main>
    </div>
  );
}

export default App;
