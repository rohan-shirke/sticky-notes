import NoteCard from "../components/NoteCard";
import Controls from "../components/Controls";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const NotesPage = () => {
    const { notes } = useContext(NotesContext);
    return (
        <div>
            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <NoteCard note={note} key={note.$id} />
                ))
            ) : (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#666",
                        fontSize: "1.2rem",
                    }}
                >
                    No notes yet. Click the + button to create one!
                </div>
            )}
            <Controls />
        </div>
    );
};

export default NotesPage;
