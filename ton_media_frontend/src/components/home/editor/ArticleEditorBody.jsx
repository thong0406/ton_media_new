import { PencilLineIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { GetStyleObjectFromString } from "../../../util";
import { ARTICLE_BODY_TYPES } from "./ArticleEditor";

export default function ArticleEditorBody(props) {
    const [type, setType] = useState(props.type ?? ARTICLE_BODY_TYPES.P);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [text, setText] = useState('');
    const deleteSelf = props.removeHandler;

    const getHtml = () => {
        let tag = "p";
        switch (type) {
            case ARTICLE_BODY_TYPES.P:
                tag = "p"
                break;
            case ARTICLE_BODY_TYPES.H1:
                tag = "h1"
                break;
            case ARTICLE_BODY_TYPES.H2:
                tag = "h2"
                break;
            case ARTICLE_BODY_TYPES.H3:
                tag = "h3"
                break;
            case ARTICLE_BODY_TYPES.H4:
                tag = "h4"
                break;
            default:
                tag = "p"
                break;
        }
        const html = `<${tag} class="${bold ? "font-bold" : ""} ${italic ? "italic" : ""}">${text}</${tag}>`;
        console.log(html);
        return html;
    }

    return (
        <div className="relative">
            <div className="absolute" style={{top: -20, right: 30}}>
                <button className={ `flex items-center justify-center relative rounded-full ${editing ? "bg-blue-700" : "bg-blue-500"} aspect-square text-white p-2` } onClick={() => {setEditing(!editing)}}>
                    <PencilLineIcon />
                    {
                        editing && (
                            <div className="flex flex-col absolute top-6 right-4 bg-white rounded-sm z-10">
                                <button className={`text-${italic ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setItalic(!italic) }}>Italic</button>
                                <button className={`text-${bold ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setBold(!bold) }}>Bold</button>
                                <button className={`text-${type === ARTICLE_BODY_TYPES.P ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setType(ARTICLE_BODY_TYPES.P) }}>Normal</button>
                                <button className={`text-${type === ARTICLE_BODY_TYPES.H1 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setType(ARTICLE_BODY_TYPES.H1) }}>H1</button>
                                <button className={`text-${type === ARTICLE_BODY_TYPES.H2 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setType(ARTICLE_BODY_TYPES.H2) }}>H2</button>
                                <button className={`text-${type === ARTICLE_BODY_TYPES.H3 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setType(ARTICLE_BODY_TYPES.H3) }}>H3</button>
                                <button className={`text-${type === ARTICLE_BODY_TYPES.H4 ? 'black' : "gray-500"} p-2 border border-b-gray-500`} onClick={() => { setType(ARTICLE_BODY_TYPES.H4) }}>H4</button>
                            </div>
                        )
                    }
                </button>
            </div>
            <div className="absolute" style={{top: -20, right: -20}}>
                <button className={ `flex items-center justify-center relative rounded-full bg-red-500 aspect-square text-white p-2` } onClick={() => {deleteSelf()}}>
                    <XIcon />
                </button>
            </div>
            <textarea className={`w-full border border-gray-300 rounded-sm ${bold ? "font-bold" : ""} ${italic ? "italic" : ""}`} value={text} onChange={(e) => { setText(e.target.value); }} style={GetStyleObjectFromString(type)} />
        </div>
    )
}