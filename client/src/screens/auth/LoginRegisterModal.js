import React, { useState } from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';
import OTPVerification from '../auth/OTPVerification';
import ResetPassword from '../auth/ResetPassword';
import CreateAccount from '../auth/CreateAccount';

const LoginRegistrationModal = () => {
    const [view, setView] = useState({ screen: 'login', source: '' });

    const renderView = () => {
        switch (view.screen) {
            case 'login':
                return (
                    <Login
                        source={view.source}
                        switchToRegister={(source) => setView({ screen: 'register', source })} 
                    />
                );
            case 'register':
                return (
                    <Register 
                        source={view.source} 
                        switchToLogin={() => setView({ screen: 'login', source: '' })} 
                        switchToOTPVerification={(source) => setView({ screen: 'otp-verification', source })} 
                    />
                );
            case 'otp-verification':
                return (
                    <OTPVerification 
                        source={view.source} 
                        switchToLogin={() => setView({ screen: 'login', source: '' })}
                        switchToCreateAccount={() => setView({ screen: 'create-account', source: '' })}
                        switchToResetPassword={() => setView({ screen: 'reset-password', source: '' })}
                    />
                );
            case 'create-account':
                return (
                    <CreateAccount 
                        switchToLogin={() => setView({ screen: 'login', source: '' })} 
                    />
                );
            case 'reset-password':
                return (
                    <ResetPassword 
                        switchToLogin={() => setView({ screen: 'login', source: '' })} 
                    />
                );
            default:
                return (
                    <Login 
                        switchToLogin={() => setView({ screen: 'login', source: '' })} 
                    />
                );
        }
    };

    return (
        <div>
            {renderView()}
        </div>
    );
};

export default LoginRegistrationModal;