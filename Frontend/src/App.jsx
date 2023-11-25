import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaRegCircle,
  FaRegCheckCircle,
  FaEdit,
  FaRegSave,
} from "react-icons/fa";
import { MdDeleteOutline, MdOutlineNoteAdd } from "react-icons/md";

const App = () => {
  const [note, setNote] = useState("");
  const [todo, setTodo] = useState([]);

  const createnote = (note) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create`, { text: note })
      .then((res) => {
        setNote("");
        getAllTodo();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note);
    createnote(note);
  };

  const getAllTodo = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getAll`)
      .then((res) => {
        // console.log(res.data.data);
        setTodo(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center pt-10">
      <h1 className="text-slate-300 text-3xl font-bold tracking-wide">
        Todo App
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row w-[45%] bg-slate-800 rounded-md my-3"
      >
        <input
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 text-white bg-transparent outline-none"
          placeholder="Create a new note..."
        />
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-12 text-2xl text-green-500 bg-slate-700 rounded-md hover:bg-slate-600 hover:text-green-400"
        >
          <MdOutlineNoteAdd />
        </button>
      </form>
      {todo.length > 0 ? (
        todo.map((item) => {
          return (
            <div
              key={item._id}
              className="flex text-slate-200 bg-slate-800 w-[50%] my-2 py-2 px-3 rounded-lg"
            >
              {item.completed ? (
                <button
                  className="text-green-500 text-xl mx-2"
                  onClick={() =>
                    axios
                      .put(
                        `${import.meta.env.VITE_API_URL}/update/${item._id}`,
                        { completed: !item.completed },
                      )
                      .then((res) => {
                        console.log(res.data.data.completed);
                        getAllTodo();
                      })
                      .catch((err) => console.log(err))
                  }
                >
                  <FaRegCheckCircle />
                </button>
              ) : (
                <button
                  className="text-green-500 text-xl mx-2"
                  onClick={() =>
                    axios
                      .put(
                        `${import.meta.env.VITE_API_URL}/update/${item._id}`,
                        { completed: !item.completed },
                      )
                      .then((res) => {
                        console.log(res.data.data.completed);
                        getAllTodo();
                      })
                      .catch((err) => console.log(err))
                  }
                >
                  <FaRegCircle />
                </button>
              )}

              <p
                className={`w-[90%] ${item.completed ? "text-slate-400" : ""}`}
              >
                {item.text}
              </p>

              <div className="flex justify-between">
                {
                  <button
                    className="text-red-500 text-2xl mx-2"
                    onClick={() =>
                      axios
                        .delete(
                          `${import.meta.env.VITE_API_URL}/delete/${item._id}`,
                        )
                        .then((res) => {
                          console.log(res.data.data);
                          getAllTodo();
                        })
                        .catch((err) => console.log(err))
                    }
                  >
                    <MdDeleteOutline />
                  </button>
                }
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-slate-400 text-2xl">No Records Found</p>
      )}
    </div>
  );
};

export default App;
