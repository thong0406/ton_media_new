import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import { ArticleCardSide } from "../components/home/ArticleCardSide";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Select } from "@headlessui/react";
import { Paginate } from "../util";

export default function Dashboard() {

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [limit, setLimit] = useState(0);
    const [category, setCategory] = useState(null);
    const [query, setQuery] = useState("");
    const [cols, setCols] = useState(3);
    const [deleted, setDeleted] = useState(false);

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetchCategories();
        fetchPosts();
    }

    const fetchPosts = async () => {
        try {
            setLoadingPosts(true);
            const url = `${BACKEND_URL}/posts/all`;
            const res = await axios.get(url);
            const posts = res.data;
            setPosts(posts);
            setLoadingPosts(false);
            nextPage(0);
        }
        catch (e) {
            console.log(e);
            setLoadingPosts(false);
        }
    }

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);
            const res = await axios.get(`${BACKEND_URL}/categories/all`);
            const categories = res.data;
            setCategories(categories);
            setLoadingCategories(false);
        }
        catch (e) {
            console.log(e);
            setLoadingCategories(false);
        }
    }

    const deletePost = async (key) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/posts/delete/${key}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            fetchPosts();
        }
        catch (e) {
            console.log(e);
            setLoadingCategories(false);
        }
    }

    const nextPage = (change) => {
        const curPage = page + 0;
        const newPage = Math.max(Math.min(curPage + change, Math.ceil(posts.length/count)), 1);
        setPage(newPage);
    }

    return (
        <>
            <div className="">
                <div className="sticky w-full p-4 bg-white">
                    <h1>Posts</h1>
                    <hr className="my-4" />
                    <div className="flex justify-between gap-5">
                        <div className="flex gap-5 items-center">
                            <button onClick={() => {nextPage(-1)}}><ArrowLeft /></button>
                            <button onClick={() => {nextPage(1)}}><ArrowRight /></button>
                            <span className="text-gray-400">Page {page}</span>
                        </div>
                        <input onChange={(e) => {setQuery(e.target.value)}} value={query} className="rounded-md p-2 border border-gray-400"/>
                        <select onChange={(e) => {setCategory(e.target.value);}} className="rounded-md p-2 border border-gray-400">
                            <option key="all" value="">All</option>
                            {categories.map((category) => 
                                <option key={category.Name} value={category.Name}>{category.Name}</option>
                            )}
                        </select>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" value="Show Deleted" onChange={(e) => { setDeleted(e.target.checked) }}></input>
                            <label for="vehicle1">Show Deleted</label>
                        </div>
                        <Select onChange={(e) => {setCount(e.target.value);}} value={count} className="rounded-md p-2 border border-gray-400">
                            <option value={5}>5</option>
                            <option value={10} selected>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                        </Select>
                        <input type="number" min={1} max={3} onChange={(e) => {setCols(e.target.value)}} value={cols} className="rounded-md p-2 border border-gray-400"/>
                    </div>
                </div>
                <div className={`grid grid-cols-${cols} gap-y-4`}>
                    { Paginate(posts.filter((post) => {
                        return (post.Title.toLowerCase().startsWith(query.toLowerCase()))
                            && (!category || post.CategoryId.Name == category)
                    }), count, page).map((post) => 
                        (<div key={post._id}>
                            <ArticleCardSide post={post} />
                            <a href={`/admin/posts/edit/${post.Key}`} className="rounded-md bg-red-500 text-white py-2 px-4">Edit</a>
                            <button className="rounded-md bg-red-500 text-white py-2 px-4" onClick={() => { deletePost(post.Key) }}>Delete</button>
                        </div>)
                    ) }
                </div>
            </div>
        </>
    )
}