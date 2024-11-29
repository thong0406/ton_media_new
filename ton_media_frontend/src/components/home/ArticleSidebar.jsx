import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import { ArticleCardOverlay } from "./ArticleCardOverlay";

export default function ArticleSidebar(props) {

    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(props.category);
    const [count, setCount] = useState(props.count);
    const [title, setTitle] = useState(props.title)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log(category);
            const query = `${BACKEND_URL}/posts/all${!category ? "" : `/${category}`}?count=${count}`;
            console.log(query);
            const res = await axios.get(query);
            setPosts(res.data.map((post) => (<ArticleCardOverlay key={post.Key} post={post} />)));
        }
        catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            { category != null ?
                (<a className="text-lg font-semibold" href={`posts/all/category/${category}`}>More about {category}</a>) :
                (<p className="text-lg font-semibold">{title}</p>)
            }
            <hr className="mb-3" />
            <div className="grid grid-cols-1 p-3 gap-4">
                { posts }
            </div>
        </>
    )

}