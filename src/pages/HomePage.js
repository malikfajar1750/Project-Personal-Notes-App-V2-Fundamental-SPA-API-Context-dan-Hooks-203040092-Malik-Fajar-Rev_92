import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import LocaleContext from "../context/LocaleContext";
import { deleteNote, getActiveNotes } from "../utils/api";

function HomePage() {
  // console.log(NoteList())
  const [searchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    // update the contacts state from network.js
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <main>
   
      <br />
      <h2>{locale === "id" ? "Daftar Catatan" : "Notes List"}</h2>
      <NoteList notes={filteredNotes} onDelete={onDeleteHandler} />
    </main>
  );
}

export default HomePage;

