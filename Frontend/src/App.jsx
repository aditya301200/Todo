import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [editedNote, setEditedNote] = useState();

  const createnote = (note) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create`, { text: note })
      .then((res) => {
        setNote("");
        getAllTodo();
        toast.success("Note Created Successfully");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note);
    createnote(note);
  };

  const editHandler = (id, text) => {
    setEditId(id);
    setEditedNote(text);
    setIsEditable(true);
  };

  const editSubmit = (id, e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/update/${id}`, {
        text: editedNote,
      })
      .then((res) => {
        setEditId("");
        setEditedNote("");
        setIsEditable("");
        getAllTodo();
        toast.success("Note Updated Successfully");
      })
      .catch((err) => console.log(err));
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
              {isEditable && editId === item._id ? (
                <form
                  className="w-full justify-between flex"
                  onSubmit={(e) => editSubmit(item._id, e)}
                >
                  <input
                    type="text"
                    name="editText"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className="w-[95%] text-white bg-transparent outline-none border border-1 border-slate-600 px-2 py-2 rounded-md"
                  />
                  <button className="text-xl mx-2 text-emerald-400">
                    <FaRegSave />
                  </button>
                </form>
              ) : (
                <div className="flex w-full">
                  {item.completed ? (
                    <button
                      className="text-green-500 text-xl mx-2"
                      onClick={() =>
                        axios
                          .put(
                            `${import.meta.env.VITE_API_URL}/update/${
                              item._id
                            }`,
                            { completed: !item.completed },
                          )
                          .then((res) => {
                            console.log(res.data.data.completed);
                            getAllTodo();
                            toast.error("Note Marked as Incomplete", {
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                              },
                            });
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
                            `${import.meta.env.VITE_API_URL}/update/${
                              item._id
                            }`,
                            { completed: !item.completed },
                          )
                          .then((res) => {
                            console.log(res.data.data.completed);
                            getAllTodo();
                            toast.success("Note Marked as Completed", {
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                              },
                            });
                          })
                          .catch((err) => console.log(err))
                      }
                    >
                      <FaRegCircle />
                    </button>
                  )}

                  <div className="flex justify-between w-full">
                    <p
                      className={`w-[90%] ${
                        item.completed ? "text-slate-400" : ""
                      }`}
                    >
                      {item.text}
                    </p>
                    <button
                      className="text-fuchsia-500 text-xl mx-2"
                      onClick={() => editHandler(item._id, item.text)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              )}

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
                          toast.success("Note Deleted Successfully", {
                            style: {
                              borderRadius: "10px",
                              background: "#ef4444",
                              color: "#fff",
                            },
                          });
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
