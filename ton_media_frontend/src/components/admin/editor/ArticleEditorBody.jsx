import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { ARTICLE_BODY_STYLES } from "./ArticleEditor";
import { GetStyleObjectFromString } from "../../../util";

export default function ArticleEditorBody({ text, setText, index, bold, setBold, italic, setItalic, style, setStyle, link, setLink }) {

    const [dropdown, setDropdown] = useState(false);
    const [hasLink, setHasLink] = useState(link ? true : false);

    return (
        <div className="relative w-full">
            <textarea className={`w-full border border-gray-300 rounded-sm ${hasLink ? "text-blue-700 underline" : ""} ${bold ? "font-bold" : ""} ${italic ? "italic" : ""}`} value={text} onChange={(e) => { setText(e.target.value, index); }} style={GetStyleObjectFromString(style.style)} />
            <div className="absolute -top-2 right-7">
                <button className="rounded-full p-1 bg-blue-600 text-white flex justify-center items-center" onClick={() => {setDropdown(!dropdown)}}><Pencil /></button>
                <div className="relative">
                    {dropdown && (
                        <div className="flex flex-col absolute top-0 right-0 bg-white rounded-sm z-10">
                            <button className={`text-${italic ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setItalic(index) }}>Italic</button>
                            <button className={`text-${bold ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setBold(index) }}>Bold</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.P ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setStyle(ARTICLE_BODY_STYLES.P, index) }}>Normal</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H1 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setStyle(ARTICLE_BODY_STYLES.H1, index) }}>H1</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H2 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setStyle(ARTICLE_BODY_STYLES.H2, index) }}>H2</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H3 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setStyle(ARTICLE_BODY_STYLES.H3, index) }}>H3</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H4 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setStyle(ARTICLE_BODY_STYLES.H4, index) }}>H4</button>
                            <button className={`text-${hasLink ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setHasLink(!hasLink) }}>Link</button>
                            {hasLink && <input className="border-b-gray-500 p-2 border border-b-gray-500" type="text" value={link} placeholder="Link" onChange={(e) => {setLink(e.target.value, index)}} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}