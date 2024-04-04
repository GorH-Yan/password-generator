import React from "react";
import PasswordTitle from "../PasswordTitle/PasswordTitle";
import "./PasswordBox.css";
import PasswordInput from "../PasswordInput/PasswordInput";
const PasswordBox = () => {
    return (
        <div className="allBox">
            <PasswordTitle />
            <PasswordInput />
        </div>
    );
};

export default PasswordBox;
