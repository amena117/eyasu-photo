import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'LOVE2026') {
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="login-card"
            >
                <div className="ornament">❦</div>
                <h2>Sarah & David</h2>
                <p className="subtitle">REQUEST THE PLEASURE OF YOUR COMPANY</p>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        className="input-wrapper"
                        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
                    >
                        <input
                            type="password"
                            placeholder="Enter Access Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={error ? 'error-input' : ''}
                        />
                    </motion.div>
                    <button type="submit">Enter Celebration</button>
                </form>

                <p className="hint">Please enter the code from your invitation</p>
            </motion.div>
        </div>
    );
};

export default Login;
