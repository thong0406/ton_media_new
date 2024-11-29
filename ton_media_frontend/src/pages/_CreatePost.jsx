import React, { FormEvent, useState, useRef, useEffect } from "react";
import { BACKEND_URL, CATEGORIES } from "../constants";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEDITOR_CONFIG } from "../components/admin/CKEditorConfig";
import { ClassicEditor } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [content, setContent] = useState('');
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
            form.append('content', content);
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
            <div className="flex justify-between gap-10">
                <div className="w-4/5">
                    <div className="main-container">
                        <div className="editor-container editor-container_classic-editor editor-container_include-style" ref={editorContainerRef}>
                            <div className="editor-container__editor">
                                <div ref={editorRef}>{isLayoutReady &&
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={CKEDITOR_CONFIG}
                                        onChange={(event, editor) => { setContent(editor.getData()) }}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky top-0 w-1/5">
                    <div className="my-2">
                        <div>
                        { key && (
                            <div className="w-full p-4">
                                <div className="bg-green-200 p-3 text-center w-full">
                                    Tạo thành công! <a href={`/posts/${key}`}>Xem post ở đây!</a>
                                </div>
                            </div>) 
                        }
                        </div>
                        <div className="flex justify-center">
                            <button onClick={submitPost} className="rounded bg-black text-white text-center py-2 px-4">Submit</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Title
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                value={title}
                                type="text"
                                required
                                autoComplete="current-username"
                                className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                onChange={(e) => { setTitle(e.target.value); }}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                                Category
                            </label>
                        </div>
                        <div className="mt-2">
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
                    </div>
                    <div className="my-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-900">
                                Thumbnail
                            </label>
                        </div>
                        <div className="mt-2">
                            <input 
                                name="thumbnail" 
                                id="thumbnail"
                                required
                                onChange={onSelectImage}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                type="file"
                            />
                        </div>
                    </div>
                    { thumbnail && (
                        <div className="w-full my-2">
                            <div className="italic text-sm">Preview:</div>
                            <img src={URL.createObjectURL(thumbnail)} className="w-full" />
                        </div>
                    ) }
                </div>
            </div>
        </>
    );
}