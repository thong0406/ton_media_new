import axios from "axios";
import { BACKEND_URL, CATEGORIES } from "../constants";
import React, { useEffect, useState } from "react";
import { ArticleCardOverlay } from "../components/home/ArticleCardOverlay";
import { ArticleCardSide } from "../components/home/ArticleCardSide";
import ArticleCarousel from "../components/home/ArticleCarousel";
import ArticleSidebar from "../components/home/ArticleSidebar";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Home() {

    const [newestPosts, setNewestPosts] = useState([]);
    const [newestLoading, setNewestLoading] = useState(false);
    const [newestIndex, setNewestIndex] = useState(0);
    const [newestPage, setNewestPage] = useState(1);

    useEffect(() => {
        fetchNewest();
    }, []);
    
    const fetchData = async (category, page) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/posts/all${!category ? "" : `/${category}?count=8&page=${page}`}`, {});
            return res.data;
        } catch (e) {
            console.error(e);
        }
    }

    const fetchNewest = async () => {
        setNewestPosts(await fetchData(CATEGORIES[newestIndex], newestPage));
    }

    const onNewestNextPageClick = async (value) => {
        setNewestPage(value);
        fetchNewest();
    }
    
    const onListClick = async (e, index) => {
        e.preventDefault();
        setNewestIndex(index);
        setNewestLoading(true);
        setNewestPosts(await fetchData(CATEGORIES[index]));
        setNewestLoading(false);
    }

    return (
        <div className="grid grid-cols-3 gap-20">
            <div className="col-span-2">
                { /** Carousel */ }
                <div className="my-4">
                    <ArticleCarousel />
                </div>

                <div className="my-4 w-full inline-flex justify-center">
                    <a href="posts/all" className="rounded-sm py-2 px-4 bg-slate-900 text-white">All articles</a>
                </div>

                { /** Newest*/ }
                <div className="my-4">
                    <div className="xl:flex xl:justify-between lg:block">
                        <div className="text-lg font-semibold">Featured</div>
                        <div className="flex gap-4 items-center">
                            {CATEGORIES.map((category, index) => 
                                <a href="#" onClick={(e) => { onListClick(e, index) }} key={index} className={ (newestIndex == index) ? "text-black font-semibold" : "text-gray-400 hover:text-black" }>{ category }</a>
                            )}
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-2 gap-x-10 gap-y-5 relative">
                        <div className={`${newestLoading ? "" : "hidden"} absolute w-full h-full bg-white opacity-50 flex justify-center items-center`}>
                            <h2 className="font-bold">Loading...</h2>
                        </div>
                        <div className="col-span-2 flex justify-center gap-5">
                            <button className="rounded border-2 border-gray-300" onClick={() => {onNewestNextPageClick(Math.max(newestPage - 1, 1))}}><ArrowLeft /></button>
                            <span>Page { newestPage }</span>
                            <button className="rounded border-2 border-gray-300" onClick={() => {onNewestNextPageClick(newestPage + 1)}}><ArrowRight /></button>
                        </div>
                        {newestPosts.length > 0 ? 
                            newestPosts.map((post, index) => {
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
            <div className="col-span-1">
                <ArticleSidebar count="2" title="Latest" />
            </div>
        </div>
    );
}