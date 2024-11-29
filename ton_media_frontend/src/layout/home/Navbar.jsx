import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { X, Menu, Search } from "lucide-react";
import CustomNavLink from "./CustomNavLink";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

function NavLinksHome() {
    return (
        <>
            <CustomNavLink title="Home" path="/home" />
            <CustomNavLink title="Home" path="/home" />
            <CustomNavLink title="Home" path="/home" />
            <CustomNavLink title="Home" path="/home" />
        </>
    );
}

export default function NavbarHome() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [navLinks, setNavLinks] = useState([]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
    const toggleSearch = () => {
        setIsSearch(!isSearch);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (navLinks.length == 0) {
            try {
                const res = await axios.get(`${BACKEND_URL}/categories/all`, {});
                const categories = res.data;
                const links = [(<CustomNavLink key="Home" title="Home" path="/home" />)];
                for (const category of categories) {
                    links.push((<CustomNavLink key={category.Name} title={category.Name} path={`/posts?category=${category.Name}`} />));
                }
                setNavLinks(links);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <nav className="container mx-auto sticky top-0 z-[20] mx-auto flex flex-wrap bg-white border-b-2 border-gray-300">
            <div className="w-full flex items-center justify-between overflow-hidden">
                <div className="hidden md:flex w-full justify-center">
                    { navLinks }
                </div>
                <div className="md:hidden">
                    <button onClick={toggleNavbar} className="m-3">{ isOpen ? <X/> : <Menu/> }</button>
                </div>
                <div className="flex justify-center items-center">
                    { localStorage.getItem('jwtToken') ?
                        (
                            <>
                                <CustomNavLink title="Dashboard" path="/admin/posts/dashboard" />
                                <CustomNavLink title="Create post" path="/admin/posts/create" />
                            </>
                        ) : 
                        (<CustomNavLink title="Login" path="/login" />)
                    }
                    <button onClick={toggleSearch} className="m-3">{ isSearch ? <X/> : <Search/> }</button>
                </div>
            </div>
            {
                isOpen && (
                    <div className="flex basis-full flex-col md:hidden">
                        { navLinks }
                    </div>
                )
            }
        </nav>
    )
}
