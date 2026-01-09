import React, { useContext } from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";
import { AuthContext } from "../context/AuthContext";
import Logout from "../icons/Logout";
import { toast } from "react-toastify";

const Controls = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            toast.success("Logged out successfully!");
        } else {
            toast.error("Failed to logout");
        }
    };

    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
            {user && (
                <div
                    id="logout-btn"
                    onClick={handleLogout}
                    title={`Logout (${user.name || user.email})`}
                >
                    <Logout size="20" color="#FFFFFF" />
                </div>
            )}
        </div>
    );
};

export default Controls;
