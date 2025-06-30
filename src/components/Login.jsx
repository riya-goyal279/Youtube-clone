import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../utils/authSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

        if (!emailRegex.test(email)) {
            return 'Invalid email format.';
        }

        if (!passwordRegex.test(password)) {
            return 'Password must be at least 6 characters and contain at least one letter and one number.';
        }

        if (!isLogin) {
            if (!username.trim()) {
            return 'Username is required.';
            }

            if (password !== confirmPassword) {
            return 'Passwords do not match.';
            }
        }

        return ''; // no errors
        };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');

        if (isLogin) {
            console.log('Logging in with:', formData.email, formData.password);
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    dispatch(setIsLoggedIn(true));
                    navigate("/")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage);
                });
        } else {
            console.log('Signing up with:', formData);

            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    dispatch(setIsLoggedIn(true));
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage);
                });
        }
    };

    const toggleMode = () => {
        setIsLogin(prev => !prev);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setError("");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-28">
        <h2 className="text-2xl font-semibold mb-4 text-center">
            {isLogin ? 'Login' : 'Signup'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />
            )}

            <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            />

            {!isLogin && (
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />
            )}

            {error && (
                <div className="text-red-600 text-sm text-center font-medium">
                    {error}
                </div>
            )}

            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
            {isLogin ? 'Login' : 'Signup'}
            </button>
        </form>

        <p className="text-center mt-4 text-sm">
            {isLogin ? "New user?" : "Already have an account?"}{' '}
            <button onClick={toggleMode} className="text-blue-600 hover:underline">
            {isLogin ? 'Signup' : 'Login'}
            </button>
        </p>
        </div>
    );
}

export default Login
