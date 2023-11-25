import axios from "axios";
import { useState } from "react";
import { MdOutlineNoteAdd } from "react-icons/md";

const Create = ({getAllTodo}) => {
  const [note, setNote] = useState("");

  const createnote = (note) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create`, {text: note})
      .then((res) => {
        console.log(res.data.data);
        setNote("");
      }).catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note);
    createnote(note);
    getAllTodo();
  };

  return (
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
  );
};

export default Create;
