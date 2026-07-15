import { Outlet, useSearchParams } from "react-router-dom";
import useScroll from "../../../hooks/useScroll.hook";
import { useAuth } from "../../Auth_Context";
import Register_Page from "./Register_Page";
import { useEffect, useState } from "react";
import Login_Page from "./Login_Page";

export default function Layout_Generate_Resume() {
    useScroll();

    const [_, setPage] = useState("login-user");
    const [params] = useSearchParams();
    const { email } = useAuth();

    useEffect(() => {
        setPage(params.get("page") || "login-user");
    }, [params]);

    if (email)
        return <Outlet />;

    if (params.get("page") === "login-user")
        return <Login_Page />;
    if (params.get("page") === "register-user")
        return <Register_Page />;

    return <Login_Page />;
}