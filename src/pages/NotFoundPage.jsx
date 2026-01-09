import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#212228',
                backgroundImage: 'linear-gradient(#292a30 .1em, transparent .1em), linear-gradient(90deg, #292a30 .1em, transparent .1em)',
                backgroundSize: '4em 4em',
                color: 'rgba(255, 255, 255, 0.87)',
                textAlign: 'center',
                padding: '1rem',
            }}
        >
            <h1 style={{ fontSize: '4rem', margin: '0', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0', marginBottom: '2rem' }}>Page Not Found</h2>
            <p style={{ fontSize: '1rem', margin: '0', marginBottom: '1.5rem' }}>
                The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                style={{
                    backgroundColor: '#9bd1de',
                    color: '#212228',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#7cbac9')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#9bd1de')}
            >
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
