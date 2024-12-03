import axios from "axios";
import { BACKEND_URL, CATEGORIES } from "../constants";
import React, { useEffect, useState } from "react";
import { ArticleCardOverlay } from "../components/home/ArticleCardOverlay";
import { ArticleCardSide } from "../components/home/ArticleCardSide";
import ArticleCarousel from "../components/home/ArticleCarousel";
import ArticleSidebar from "../components/home/ArticleSidebar";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ArticleCatalog from "../components/home/ArticleCatalog";

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
                <ArticleCatalog title="Latest" />
            </div>
            <div className="col-span-1">
                <ArticleSidebar count="2" title="Latest" />
            </div>
        </div>
    );
}