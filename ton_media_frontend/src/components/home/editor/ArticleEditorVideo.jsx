import { PencilLineIcon, PlusIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; 

export default function ArticleEditorVideo(props) {

    const [video, setVideo] = useState(null);
    const [caption, setCaption] = useState("");

    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVideo(e.target.files[0]);
        }
    }

    return (
        <div className="w-full flex justify-center">
            <div className="relative flex flex-col justify-center">
                <div className="absolute z-10" style={{top: -20, right: 30}}>
                    <button className={ `flex items-center justify-center relative rounded-full bg-blue-500 aspect-square text-white p-2` } onClick={() => {}}>
                        <PencilLineIcon />
                    </button>
                </div>
                <div className="absolute z-10" style={{top: -20, right: -20}}>
                    <button className={ `flex items-center justify-center relative rounded-full bg-red-500 aspect-square text-white p-2` } onClick={() => {}}>
                        <XIcon />
                    </button>
                </div>
                {!video && <input type="file" onChange={imageHandler} className="aspect-4/3 rounded-md bg-gray-200 p-5" />}
                {video &&
                    <Player
                        className="w-full"
                        playsInline
                        src={URL.createObjectURL(video)}
                    />
                }
                <input type="text" value={caption} onChange={(e) => { setCaption(e.target.value) }} className="w-full italic text-center text-gray-500" placeholder="Caption..." />
            </div>
        </div>
    );
}