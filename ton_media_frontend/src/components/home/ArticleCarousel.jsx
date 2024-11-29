import React, {useEffect, useState} from "react";
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import { ArticleCardOverlay } from "./ArticleCardOverlay";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ArticleCarousel(props) {

    const [posts, setPosts] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/posts/all?count=7`);
            setPosts(res.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const onCarouselNext = (e, change) => {
        e.preventDefault(); 
        if (index + change < 0) { setIndex(posts.length - 1); }
        else if (index + change > posts.length - 1) { setIndex(0); }
        else { setIndex(index + change); }
    }

    return (
        <div>
            <div className={`relative flex w-full bg-center bg-cover aspect-video flex-col items-start justify-between carousel-thumbnail`} style={{ backgroundImage: `url(${posts[index]?.Thumbnail})` }}>
                <div className="inline-grid grid-cols-1 relative items-end w-full h-1/2 mt-auto bg-gradient-to-t from-black" />
                <div className="absolute h-full w-full flex justify-between">
                    <button className="p-5 flex items-center justify-left text-white" onClick={(e) => { onCarouselNext(e, -1); }}><ArrowLeft /></button>
                    <div className="h-full w-full items-end flex py-5">
                        <h3 className="text-4xl text-white hover:text-white">
                            <a href={`posts/${posts[index]?.Key}`}>{posts[index]?.Title}</a>
                            <div className="text-base text-gray-500">{(new Date(posts[index]?.createdAt)).toLocaleDateString()}</div>
                        </h3>
                    </div>
                    <button className="p-5 flex items-center justify-right text-white" onClick={(e) => { onCarouselNext(e, 1); }}><ArrowRight /></button>
                </div>
            </div>
            <div className={`justify-center my-4 gap-4 grid grid-cols-7`}>
                {
                    posts.map((post, i) => (
                        <button key={i} onClick={() => { setIndex(i); }} className={`col-span-1 relative ${ index == i ? "" : "opacity-50 hover:opacity-100" }`}>
                            <img className="h-auto aspect-4/3" src={post?.Thumbnail} />
                            <div className={`absolute w-full h-full top-0 bg-black opacity-25`}></div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}