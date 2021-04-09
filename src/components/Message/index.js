import React, { useState, useEffect } from "react";

const Message = ({ message, type, timeInSeconds }) => {

    const [msg, setMsg] = useState(message);

    useEffect(() => {
        setTimeout(_ => {
            setMsg(null)
        }, timeInSeconds * 1000);
    }, []);

    return (
        <>
            <h1>{msg}</h1>
        </>
    );
}

export default Message;