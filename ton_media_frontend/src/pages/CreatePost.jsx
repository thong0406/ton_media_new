import React, { FormEvent, useState, useRef, useEffect } from "react";
import { BACKEND_URL, CATEGORIES } from "../constants";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEDITOR_CONFIG } from "../components/admin/CKEditorConfig";
import { ClassicEditor } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';
import { ArticleEditor } from "../components/admin/editor/ArticleEditor";
import { ChevronRight, Home } from "lucide-react";

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const articleEditorRef = useRef();
    const [thumbnail, setThumbnail] = useState(null);
    const [key, setKey] = useState('');

    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const submitPost = async (e) => {
        e.preventDefault();
        try {
            console.log(thumbnail);
            const form = new FormData();
            form.append('title', title);
            form.append('thumbnail', thumbnail);
            form.append('content', articleEditorRef.current.toJsonString());
            const res = await axios.post(`${BACKEND_URL}/posts/create`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setKey(res.key);

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
        <>
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
                <img src={thumbnail ? URL.createObjectURL(thumbnail) : "/images/no_image_thumbnail.webp"} alt={""} className="w-full" />
                <ArticleEditor ref={articleEditorRef} />
            </div>
        </>
    );
}