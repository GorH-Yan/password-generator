import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { IoCopy } from "react-icons/io5";

import "./PasswordInput.css";
const PasswordInput = () => {
    const [inp, setInp] = useState("");
    const [isUpper, setIsUpper] = useState(false);
    const [isLower, setIsLower] = useState(true);
    const [isNumbers, setIsNumbers] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);
    const [range, setRange] = useState(6);
    const [copy, setCopy] = useState(false);
    const all = useMemo(() => {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "!@#$%^&*()";
        let allText = isLower ? lower.split("") : [];
        if (isUpper) {
            allText.push(...upper.split(""));
        }
        if (isNumbers) {
            allText.push(...numbers.split(""));
        }
        if (isSpecial) {
            allText.push(...special.split(""));
        }
        if (!isNumbers && !isSpecial && !isUpper) {
            setIsLower(true);
        }
        return allText;
    }, [isLower, isNumbers, isUpper, isSpecial]);
    const getString = useCallback(
        (length) => {
            let result = [];
            for (let i = 0; i < length; i++) {
                result.push(
                    all.join("").charAt(Math.floor(Math.random() * all.length))
                );
            }
            return result.splice(0, length);
        },
        [all]
    );
    const copyBtn = useCallback(
        (text) => {
            setCopy(true);
            setTimeout(() => {
                setCopy(false);
            }, 2000);
            navigator.clipboard.writeText(text);
        },
        [copy]
    );
    useEffect(() => {
        setInp(getString(range).join(""));
    }, []);
    const validP = useRef(null);
    const changeValid = useCallback(() => {
        let allStates = [];
        allStates.push(isLower, isNumbers, isSpecial, isUpper);
        if (range < 8) {
            validP.current.textContent = "Too short!";
            validP.current.style.color = "red";
        } else if (allStates.every((e) => e) && range >= 8) {
            validP.current.textContent = "Hard!";
            validP.current.style.color = "green";
        } else if (allStates.filter((e) => e).length <= 2) {
            validP.current.textContent = "Easy!";
            validP.current.style.color = "red";
        } else {
            validP.current.textContent = "Medium!";
            validP.current.style.color = "orange";
        }
        setInp(getString(range).join(""));
    }, [isLower, isNumbers, isSpecial, isUpper, range]);
    return (
        <div className="all">
            <div className="up">
                <div className="upperInput">
                    <input
                        type="text"
                        value={inp}
                        onChange={(e) => setInp(e.target.value)}
                    />
                    <MdOutlineRefresh
                        className="refresh"
                        onClick={changeValid}
                    />
                    <button onClick={() => copyBtn(inp)}>
                        <IoCopy className="copy" />
                        {copy ? "Copied!" : "Copy"}
                    </button>
                </div>
                <div className="upperDown">
                    <p ref={validP}></p>
                </div>
            </div>
            <div className="allInputs">
                <h4>Password length: {range}</h4>
                <input
                    type="range"
                    value={range}
                    min={5}
                    max={25}
                    step={1}
                    onChange={(e) => setRange(e.target.value)}
                    id="range"
                />
                <p>
                    Uppercase
                    <input
                        type="checkbox"
                        checked={isUpper}
                        onChange={() => setIsUpper(!isUpper)}
                    />
                </p>
                <p>
                    LowerCase
                    <input
                        type="checkbox"
                        checked={isLower}
                        onChange={() => setIsLower(!isLower)}
                    />
                </p>
                <p>
                    Numbers
                    <input
                        type="checkbox"
                        checked={isNumbers}
                        onChange={() => setIsNumbers(!isNumbers)}
                    />
                </p>
                <p>
                    Special Characters
                    <input
                        type="checkbox"
                        checked={isSpecial}
                        onChange={() => setIsSpecial(!isSpecial)}
                    />
                </p>
            </div>
        </div>
    );
};

export default PasswordInput;
