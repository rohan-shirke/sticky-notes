import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { AuthContext } from "./AuthContext";
import { Query } from "appwrite";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            init();
        } else {
            setLoading(false);
        }
    }, [user]);

    const init = async () => {
        if (!user) {
            setNotes([]);
            setLoading(false);
            return;
        }

        try {
            // Filter notes by user ID
            const response = await db.notes.list([
                Query.equal("userId", user.$id),
            ]);
            setNotes(response.documents);
        } catch (error) {
            console.error("Error loading notes:", error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    const contextData = { notes, setNotes, selectedNote, setSelectedNote, refreshNotes: init };

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NotesContext.Provider>
    );
};
export default NotesProvider;
