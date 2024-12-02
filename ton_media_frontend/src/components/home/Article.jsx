import axios from "axios";
import React, { useEffect, useState } from "react";
import { HomeIcon, ChevronRight } from "lucide-react";
import { BACKEND_URL, FILES_URL } from "../../constants";
import { useParams } from 'react-router-dom';
import { Player } from 'video-react';
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    RedditIcon,
    TelegramIcon,
    XIcon,
} from "react-share";
import 'ckeditor5/ckeditor5.css';
import { ARTICLE_BODY_STYLES, ARTICLE_COMPONENT_TYPES } from "../admin/editor/ArticleEditor";

export default function Article(props) {
    const { key } = useParams();
    const [post, setPost] = useState(props.post ?? null);

    useEffect(() => {
        if (post) {
            fetchData();
        }
    }, []);
    
    const displayContent = (item) => {
        console.log(item);
        switch (item.type) {
            case (ARTICLE_COMPONENT_TYPES.BODY):
                const text = item.link ? (<a href={item.link} class="text-blue-600 hover:text-blue-800 hover:underline">{item.text}</a>) : item.text;
                const className = `${item.link ? "text-blue-700 underline" : ""} ${item.bold ? "font-bold" : ""} ${item.italic ? "italic" : ""}`;
                switch (item.style.tag) {
                    case ("p"):
                        return (<p className={className}>{text}</p>);
                    case ("h1"):
                        return (<h1 className={className}>{text}</h1>)
                    case ("h2"):
                        return (<h2 className={className}>{text}</h2>)
                    case ("h3"):
                        return (<h3 className={className}>{text}</h3>)
                    case ("h4"):
                        return (<h4 className={className}>{text}</h4>)
                    default:
                        return <></>
                }
            case (ARTICLE_COMPONENT_TYPES.IMAGE):
                return (
                    <div className="w-full flex flex-col justify-center">
                        <img className="" src={`${FILES_URL}/images/${item.image}`} />
                        <div className="text-sm text-center text-gray-400 italic">{item.text}</div>    
                    </div>
                )
            case (ARTICLE_COMPONENT_TYPES.VIDEO):
                return (
                    <div className="w-full flex flex-col justify-center">
                        <Player
                            playsInline
                            src={`${FILES_URL}/videos/${item.video}`}
                        />
                        <div className="text-sm text-center text-gray-400 italic">{item.text}</div>    
                    </div>
                )
            default:
                return <></>
        }
    }

    const fetchData = async () => {
        try {
            const res = await axios(`${BACKEND_URL}/posts/${key}`, {});
            const article = res.data;
            setPost(article);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <HomeIcon className="mr-1" />
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight />
                            <a href={`/posts/all/${post?.CategoryId?.Name}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{ post?.CategoryId?.Name }</a>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">{post?.Title}</h1>
            <p className="text-sm my-2 font-light text-gray-400">{ (new Date(post?.createdAt)).toLocaleDateString() }</p>
            <img src={post?.Thumbnail} className="w-full my-2" />
            <p className="text-lg font-bold">Share this post:</p>
            <div className="my-2 flex gap-3">
                <EmailShareButton url={window.location.href}>
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TelegramShareButton url={window.location.href}>
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <RedditShareButton url={window.location.href}>
                    <RedditIcon size={32} round={true} />
                </RedditShareButton>
            </div>
            <hr />
            <article className="mt-3">
                { (JSON.parse(decodeURIComponent(post.Content))).map((item) => 
                    displayContent(item)
                )}
            </article>
        </>
    );
}