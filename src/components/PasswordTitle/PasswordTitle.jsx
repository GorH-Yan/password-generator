import React from "react";
import "./PasswordTitle.css";
const PasswordTitle = () => {
    return (
        <div className="passTitle">
            <img src="https://reactjs-password-generator.vercel.app/assets/password-4w9h2nKz.gif" />
            <h2>PASSWORD GENERATOR</h2>
            <p>
                Create strong and secure passwords to keep your account safe
                online.
            </p>
        </div>
    );
};

export default PasswordTitle;
