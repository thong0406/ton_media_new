import React, { useState } from "react";

export function ArticleCardOverlay(props) {

    const [post, setPost] = useState(props.post);

    return (
        <>
            <a href={`posts/${post.Key}`} className={`flex max-w-xl bg-center bg-cover aspect-4/3 flex-col items-start justify-between`} style={{ backgroundImage: `url(${post.Thumbnail})` }}>
                <div className="inline-grid grid-cols-1 relative items-end w-full p-2 h-1/2 mt-auto bg-gradient-to-t from-black">
                    <h3 className="text-2xl text-white hover:text-white">
                        <p>{post.Title}</p>
                        <span className="text-sm text-gray-500">{(new Date(post.createdAt)).toLocaleDateString()}</span>
                    </h3>
                </div>
            </a>
        </>
    );
}