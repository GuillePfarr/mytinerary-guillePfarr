import React from "react";
import './events.css'
const Events = () => {
    return (
        <div className="app-layout">
            <header className="container app-header">
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Events</a>
                    <a href="#">Contact</a>
                </nav>
            </header>
            <main className="app-main">
                <h2>Events</h2>
            </main>
            <footer className="app-footer">
                <p className="text-center">MindHub AP MERN 08 - GuillePfarr</p>
            </footer>
        </div>

    );
};

export default Events;