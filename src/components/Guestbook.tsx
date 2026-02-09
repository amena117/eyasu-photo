import React, { useState } from 'react';
import type { GuestMessage } from '../types';
import { motion } from 'framer-motion';

const Guestbook: React.FC = () => {
    const [messages, setMessages] = useState<GuestMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !newMessage.trim()) return;

        const message: GuestMessage = {
            id: Date.now().toString(),
            name,
            message: newMessage,
            date: new Date().toLocaleDateString(),
        };

        setMessages([message, ...messages]);
        setNewMessage('');
        setName('');
    };

    return (
        <section className="guestbook">
            <div className="guestbook-header">
                <h3>Guestbook</h3>
                <div className="separator"></div>
                <p>LEAVE US A NOTE</p>
            </div>

            <div className="guestbook-content">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Share your well wishes..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit">Sign Guestbook</button>
                </form>

                <div className="messages-list">
                    {messages.length === 0 && <p className="empty-state">Be the first to sign our guestbook.</p>}
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className="message-card"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h4>{msg.name}</h4>
                            <p>{msg.message}</p>
                            <span className="date">{msg.date}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guestbook;
