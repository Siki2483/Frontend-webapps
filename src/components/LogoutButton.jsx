import React from "react";

function LogoutButton () {
    const handleLogout = () => {
        localStorage.removeItem("tokken");
        window.location.href = "/login";
    };

    return <button onClick = {handleLogout}>Logout</button>;
}

export default LogoutButton;