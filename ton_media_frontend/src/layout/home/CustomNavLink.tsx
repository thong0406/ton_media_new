import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
    title:string,
    path?:string,
}

export default function CustomNavLink(props:CustomNavLinkProps) {
    const [ title, setTitle ] = useState(props.title);
    const [ path, setPath ] = useState(props.path ?? "");

    return (
        <>
            <NavLink to={ `${path}` } className="m-3 relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
                { title }
            </NavLink>
        </>
    );
}