import { Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ARTICLE_BODY_STYLES } from "./ArticleEditor";
import { GetStyleObjectFromString } from "../../../util";

export default function ArticleEditorBody({ text, setText, index, bold, setBold, italic, setItalic, style, setStyle, link, setLink }) {

    const [dropdown, setDropdown] = useState(false);
    const [hasLink, setHasLink] = useState(link ? true : false);
    const inputRef = useRef();

    useEffect(() => {
        resetHeight(inputRef.current);
    }, []);

    const resetHeight = (target) => {
        target.style.height = `${target.scrollHeight + 3}px`;
    }

    return (
        <div className="relative w-full">
            <textarea ref={inputRef} className={`w-full h-auto h-fit focus:border focus:border-gray-300 rounded-sm ${hasLink ? "text-blue-700 underline" : ""} ${bold ? "font-bold" : ""} ${italic ? "italic" : ""}`} value={text} onChange={(e) => { setText(e.target.value, index); setDropdown(false); resetHeight(e.target); }} style={GetStyleObjectFromString(style.style)} />
            <div className="absolute -top-2 right-7">
                <button className="rounded-full p-1 bg-blue-600 text-white flex justify-center items-center" onClick={(e) => {setDropdown(!dropdown)}}><Pencil /></button>
                <div className="relative">
                    {dropdown && (
                        <div className="flex flex-col absolute top-0 right-0 bg-white rounded-sm z-10">
                            <button className={`text-${italic ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setItalic(index); setDropdown(false); resetHeight(e.target); }}>Italic</button>
                            <button className={`text-${bold ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setBold(index); setDropdown(false); resetHeight(e.target); }}>Bold</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.P ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.P, index); setDropdown(false); resetHeight(e.target); }}>Normal</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H1 ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.H1, index); setDropdown(false); resetHeight(e.target); }}>H1</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H2 ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.H2, index); setDropdown(false); resetHeight(e.target); }}>H2</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H3 ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.H3, index); setDropdown(false); resetHeight(e.target); }}>H3</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.H4 ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.H4, index); setDropdown(false); resetHeight(e.target); }}>H4</button>
                            <button className={`text-${style === ARTICLE_BODY_STYLES.BLOCK_QUOTE ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setStyle(ARTICLE_BODY_STYLES.BLOCK_QUOTE, index); setDropdown(false); resetHeight(e.target); }}>Blockquote</button>
                            <button className={`text-${hasLink ? 'black font-bold' : "gray-500"} p-2 border border-b-gray-500`} onClick={(e) => { setHasLink(!hasLink) }}>Link</button>
                            {hasLink && <input className="border-b-gray-500 p-2 border border-b-gray-500" type="text" value={link} placeholder="Link" onChange={(e) => {setLink(e.target.value, index); setDropdown(false); resetHeight(e.target);}} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}