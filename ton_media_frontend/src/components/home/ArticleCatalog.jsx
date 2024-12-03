import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "../../constants";
import { ArticleCardOverlay } from "./ArticleCardOverlay";
import { ArticleCardSide } from "./ArticleCardSide";

export default function ArticleCatalog({ title }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);

    useEffect(() => {
        fetchLimit();
        fetchCategories();
        fetchPosts();
    }, []);
    
    const fetchPosts = async (category, page) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/posts/all${!category ? "" : `/${category}`}?count=8&page=${page}`, {});
            setPosts(res.data);
        } catch (e) {
            console.error(e);
        }
    }
    
    const fetchLimit = async (category, page) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/posts/all${!category ? "" : `/${category}`}/count`, {});
            console.log(res.data);
            setLimit(Math.ceil(res.data.count/8));
            console.log(limit);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/categories/all`, {});
            setCategories(res.data);
        } catch (e) {
            console.error(e);
        }
    }
    
    const onListClick = async (e, index) => {
        e.preventDefault();
        setCategoryIndex(index);
        setLoading(true);
        setPosts(await fetchPosts(categories[index].Name));
        setLoading(false);
    }

    const changePage = (change) => {
        const newPage = Math.max(Math.min(page + change, limit), 1);
        setPage(newPage);
    }

    return (
        <div className="col-span-2">
            <div className="my-4">
                <div className="xl:flex xl:justify-between lg:block">
                    <div className="text-lg font-semibold">{ title }</div>
                    <div className="flex gap-4 items-center">
                        {categories.map((item, index) => 
                            <a href="#" onClick={(e) => { onListClick(e, index) }} key={index} className={ (categoryIndex == index) ? "text-black font-semibold" : "text-gray-400 hover:text-black" }>{ item.Name }</a>
                        )}
                    </div>
                </div>
                <hr className="mb-3" />
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 relative">
                    <div className={`${loading ? "" : "hidden"} absolute w-full h-full bg-white opacity-50 flex justify-center items-center`}>
                        <h2 className="font-bold">Loading...</h2>
                    </div>
                    <div className="col-span-2 flex justify-center gap-5">
                        <button className="rounded border-2 border-gray-300" onClick={() => {changePage(-1)}}><ArrowLeft /></button>
                            <span>Page { page }</span>
                        <button className="rounded border-2 border-gray-300" onClick={() => {changePage(1)}}><ArrowRight /></button>
                    </div>
                    {posts.length > 0 ? 
                        posts.map((post, index) => {
                            if (index < 2) {
                                return (<ArticleCardOverlay key={post.Key} post={post} />)
                            }
                            else {
                                return (<ArticleCardSide key={post.Key} post={post} />)
                            }
                        }) :
                        (
                            <div className="w-full h-full flex justify-center items-center col-span-2" style={{height: "10em"}}>
                                <h2 className="font-bold">No posts</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}