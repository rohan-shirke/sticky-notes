import React from "react";
import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddButton = () => {
    const { setNotes } = useContext(NotesContext);
    const { user } = useContext(AuthContext);
    const startingPos = useRef(10);

    const addNote = async () => {
        if (!user) {
            toast.error("Please login to create notes");
            return;
        }

        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
            userId: user.$id, // Add user ID to the note
        };

        startingPos.current += 10;

        const response = await db.notes.create(payload);
        setNotes((prevState) => [response, ...prevState]);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
