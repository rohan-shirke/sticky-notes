import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { login, signup } = useContext(AuthContext);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !name.trim()) {
            newErrors.name = "Name is required";
        } else if (!isLogin && name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (password.length > 256) {
            newErrors.password = "Password must be less than 256 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await signup(email, password, name);
        }

        setLoading(false);

        if (result.success) {
            toast.success(
                isLogin ? "Login successful!" : "Account created successfully!"
            );
        } else {
            const errorMsg = result.error || "An error occurred";
            toast.error(errorMsg);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setEmail("");
        setPassword("");
        setName("");
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#212228",
                backgroundImage: "linear-gradient(#292a30 .1em, transparent .1em), linear-gradient(90deg, #292a30 .1em, transparent .1em)",
                backgroundSize: "4em 4em",
                padding: "1rem",
            }}
        >
            <div
                style={{
                    backgroundColor: "#35363e",
                    padding: "2.5rem",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: `
                        0 1px 1px hsl(0deg 0% 0% / 0.075),
                        0 2px 2px hsl(0deg 0% 0% / 0.075),
                        0 4px 4px hsl(0deg 0% 0% / 0.075),
                        0 8px 8px hsl(0deg 0% 0% / 0.075),
                        0 16px 16px hsl(0deg 0% 0% / 0.075)
                    `,
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "rgba(255, 255, 255, 0.87)",
                        }}
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: "1.25rem" }}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) {
                                        setErrors({ ...errors, name: "" });
                                    }
                                }}
                            style={{
                                width: "100%",
                                padding: "0.875rem 1rem",
                                backgroundColor: "#212228",
                                color: "rgba(255, 255, 255, 0.87)",
                                border: `1px solid ${errors.name ? "#f44336" : "#292a30"}`,
                                borderRadius: "4px",
                                fontSize: "0.95rem",
                                boxSizing: "border-box",
                                outline: "none",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#9bd1de")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = errors.name ? "#f44336" : "#292a30")
                            }
                                placeholder="Full name"
                                autoComplete="name"
                            />
                            {errors.name && (
                                <div
                                    style={{
                                        color: "#f44336",
                                        fontSize: "0.8rem",
                                        marginTop: "0.4rem",
                                        marginLeft: "0.5rem",
                                    }}
                                >
                                    {errors.name}
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ marginBottom: "1.25rem" }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) {
                                    setErrors({ ...errors, email: "" });
                                }
                            }}
                            required
                            style={{
                                width: "100%",
                                padding: "0.875rem 1rem",
                                backgroundColor: "#212228",
                                color: "rgba(255, 255, 255, 0.87)",
                                border: `1px solid ${errors.email ? "#f44336" : "#292a30"}`,
                                borderRadius: "4px",
                                fontSize: "0.95rem",
                                boxSizing: "border-box",
                                outline: "none",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#9bd1de")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = errors.email ? "#f44336" : "#292a30")
                            }
                            placeholder="Email address"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <div
                                style={{
                                    color: "#f44336",
                                    fontSize: "0.8rem",
                                    marginTop: "0.4rem",
                                    marginLeft: "0.5rem",
                                }}
                            >
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) {
                                    setErrors({ ...errors, password: "" });
                                }
                            }}
                            required
                            style={{
                                width: "100%",
                                padding: "0.875rem 1rem",
                                backgroundColor: "#212228",
                                color: "rgba(255, 255, 255, 0.87)",
                                border: `1px solid ${errors.password ? "#f44336" : "#292a30"}`,
                                borderRadius: "4px",
                                fontSize: "0.95rem",
                                boxSizing: "border-box",
                                outline: "none",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#9bd1de")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = errors.password ? "#f44336" : "#292a30")
                            }
                            placeholder="Password"
                            autoComplete={
                                isLogin ? "current-password" : "new-password"
                            }
                        />
                        {errors.password && (
                            <div
                                style={{
                                    color: "#f44336",
                                    fontSize: "0.8rem",
                                    marginTop: "0.4rem",
                                    marginLeft: "0.5rem",
                                }}
                            >
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.875rem",
                            backgroundColor: loading ? "#666" : "rgba(107,107,107,1)",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = "#7a7a7a";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = loading ? "#666" : "rgba(107,107,107,1)";
                        }}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                            ? "Sign In"
                            : "Create Account"}
                    </button>
                </form>

                <div
                    style={{
                        marginTop: "1.5rem",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                    }}
                >
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                onClick={switchMode}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#9bd1de",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    textDecoration: "underline",
                                    padding: 0,
                                }}
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={switchMode}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#9bd1de",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    textDecoration: "underline",
                                    padding: 0,
                                }}
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
