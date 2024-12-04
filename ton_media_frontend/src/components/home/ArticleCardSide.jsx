import React, { useState } from "react";

export function ArticleCardSide(props) {

    const [post, setPost] = useState(props.post);

    return (
        <>
            <a href={`/posts/${post.Key}`} className="flex max-w-xl flex items-start">
                <div className="aspect-4/3 h-32 bg-center bg-cover" style={{ backgroundImage: `url(${post.Thumbnail})` }}></div>
                <div className="inline-grid grid-cols-1 items-end p-2">
                    <h3 className="text-xl text-black hover:text-black">
                        <p>{post.Title}</p>
                        <span className="text-sm text-gray-500">{(new Date(post.createdAt)).toLocaleDateString()}</span>
                    </h3>
                </div>
            </a>
        </>
    );
}