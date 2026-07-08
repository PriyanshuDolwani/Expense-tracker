import {useState} from "react";
import { register } from "../services/authService";
import {Link, useNavigate} from "react-router-dom"; 

function Register(){
    const navigate=useNavigate();
    const [name,setName]=useState("")
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            await register({name,email,password});
            alert("Register successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error('Register error response:', error.response ? error.response.data : error.message);
            alert(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Registration failed');
        }
    }
      return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h1 className="text-3xl font-bold mb-6">
                Register
                </h1>

                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                className="input"
                />

                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="input"
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="input"
                />

                <button
                className="btn w-full"
                >
                Register
                </button>
                <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-500 font-bold"
                >
                    Login
                </Link>
                </p>            
            </form>
            </div>
        );
    }

export default Register;
