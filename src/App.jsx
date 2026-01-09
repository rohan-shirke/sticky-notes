import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotesProvider from "./context/NotesContext";
import AuthProvider from "./context/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Spinner from "./icons/Spinner";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const AppContent = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
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
        );
    }

    return (
        <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route
                path="/"
                element={
                    user ? (
                        <NotesProvider>
                            <NotesPage />
                        </NotesProvider>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

function App() {
    return (
        <div id="app">
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
