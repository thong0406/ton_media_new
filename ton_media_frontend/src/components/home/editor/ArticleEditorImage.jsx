import { PencilLineIcon, PlusIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { FILES_URL } from "../../../constants";

export default function ArticleEditorImage(props) {

    const [image, setImage] = useState(props.image);
    const [caption, setCaption] = useState("");

    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const getHtml = () => {
        const html = `<div class="w-full flex justify-center"><div className="relative flex flex-col justify-center"><img src= className="w-full" /><div class="w-full italic text-center text-gray-500">${caption}</div></div></div>`;
        console.log(html);
        return html;
    }

    return (
        <div className="w-full flex justify-center relative">
            <div className="relative flex flex-col justify-center">
                <div className="absolute" style={{top: -20, right: -20}}>
                    <button className={ `flex items-center justify-center relative rounded-full bg-red-500 aspect-square text-white p-2` } onClick={() => {}}>
                        <XIcon />
                    </button>
                </div>
                {!image && <input type="file" onChange={imageHandler} className="aspect-4/3 rounded-md bg-gray-200 p-5" />}
                {image &&
                    <img src={`${FILES_URL}/images/${image}`} className="w-full" />
                }
                <input type="text" value={caption} onChange={(e) => { setCaption(e.target.value) }} className="w-full italic text-center text-gray-500" placeholder="Caption..." />
            </div>
        </div>
    );
}