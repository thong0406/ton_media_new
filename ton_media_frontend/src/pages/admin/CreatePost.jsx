import React, { useState, useRef, useEffect } from "react";
import { BACKEND_URL, CATEGORIES } from "../../constants";
import axios from "axios";
import 'ckeditor5/ckeditor5.css';
import { ArticleEditor } from "../../components/admin/editor/ArticleEditor";
import { ChevronRight, Home, X } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const articleEditorRef = useRef();
    const [thumbnail, setThumbnail] = useState(null);
    const [message, setMessage] = useState(null);
    const [edit, setEdit] = useState(false);
    const [post, setPost] = useState(null);
    let { key } = useParams();
    const [editor, setEditor] = useState(<ArticleEditor ref={articleEditorRef} />);

    useEffect(() => {
        if (key) {
            fetchPost(key);
            setEdit(true);
        }
    }, []);

    const fetchPost = async (key) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/posts/${key}`);
            const post = res.data;
            console.log(post);
            setPost(post);
            setTitle(post.Title);
            setCategory(post.CategoryId.Name);
            if (key) {
                setEditor(<ArticleEditor content={post.Content} ref={articleEditorRef} />);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const submitPost = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('title', title);
            form.append('thumbnail', thumbnail);
            form.append('category', category);
            form.append('content', articleEditorRef.current.toJsonString());
            console.log(articleEditorRef.current.print());
            const res = await axios.post(`${BACKEND_URL}/posts/${edit ? `update/${key}` : "create"}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            const _key = res.data.Key;
            setMessage(<p className="text-white text-center w-100">{edit ? "Update thành công!" : "Tạo thành công!"} <a href={`/posts/${_key}`}>Link</a></p>);
        } catch (e) {
            console.log(e);
        }
    }

    const onSelectImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    }

    return (
        <div className="relative">
            { message &&
                (<div className="absolute w-100 p-2 bg-green-500 text-white flex justify-center items-center gap-4">
                    { message }<button onClick={() => {setMessage(null)}}><X /></button>
                </div>)
            }
            <div className="flex justify-center">
                <button onClick={submitPost} className="rounded bg-black text-white text-center py-2 px-4">Submit</button>
            </div>
            <nav className="flex">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <Home size={16} className="mr-1" />
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight size={16} className="mr-1" />
                            <select 
                                name="category" 
                                id="category"
                                required
                                value={category}
                                onChange={(e) => {setCategory(e.target.value)}}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                                { CATEGORIES.map((c) => (
                                    <option value={c} key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="w-full">
                <div className="mt-2">
                    <input
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={title}
                        type="text"
                        required
                        autoComplete="current-username"
                        className="text-5xl font-bold tracking-tight text-gray-900 w-full"
                        onChange={(e) => { setTitle(e.target.value); }}
                    />
                </div>
                <div className="mt-2">
                    <input 
                        name="thumbnail" 
                        id="thumbnail"
                        required
                        accept="image/*"
                        onChange={onSelectImage}
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        type="file"
                    />
                </div>
                <img src={thumbnail ? URL.createObjectURL(thumbnail) : (post ? post.Thumbnail : "/images/no_image_thumbnail.webp")} alt={""} className="w-full" />
                { editor }
            </div>
        </div>
    );
}