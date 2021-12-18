import { FormControl, TextField, List } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaskItem from "./TaskItem";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      ); //what is doc/s?
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    //if hover 'onChange below, it says React.MouseEventHandler<HTMLButtonElement> -- error
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo App by React/Firebase</h1>
      {tasks.map((task) => {
        // {
        //   console.log(task);
        // }
        // return <h3>{task.title}</h3>; ///need return?
      })}
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List>
        {tasks.map((task) => {
          //return <h3>{task.title}</h3>; //need return?
          return <TaskItem key={task.id} id={task.id} title={task.title} />;
        })}
      </List>
    </div>
  );
};

export default App;
