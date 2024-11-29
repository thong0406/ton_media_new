import axios from "axios";
import { BACKEND_URL } from "../constants";
import React, { useEffect, useState } from "react";
import { ArticleCardOverlay } from "../components/home/ArticleCardOverlay";
import { ArticleCardSide } from "../components/home/ArticleCardSide";
import Article from "../components/home/Article";
import ArticleSidebar from "../components/home/ArticleSidebar";
import { useParams } from "react-router-dom";

export default function ArticleDetails() {

    const { key } = useParams();
    const [post, setPost] = useState(null);
    const [sidebar, setSidebar] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log(key);
            const res = await axios(`${BACKEND_URL}/posts/${key}`, {});
            const article = res.data;
            console.log(article);
            setPost((<Article post={article} />));
            setSidebar((<ArticleSidebar category={article?.CategoryId?.Name} title="Latest" count={3} />));
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="bg-white">
            <div className="grid grid-cols-5 gap-10">
                <div className="col-span-4">
                    { post }
                </div>
                <div className="col-span-1">
                    { sidebar }
                </div>
            </div>
        </div>
    );
}