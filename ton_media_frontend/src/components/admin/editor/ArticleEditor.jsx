import { Pencil, X } from "lucide-react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import FileLoader from "../file_loader/FileLoader";
import { FILES_URL } from "../../../constants";
import ArticleEditorBody from "./ArticleEditorBody";
import { Player } from 'video-react';
import ArticleEditorBetween from "./ArticleEditorBetween";

export const ARTICLE_COMPONENT_TYPES = {
    BODY: 1,
    IMAGE: 2,
    VIDEO: 3,
}

export const ARTICLE_BODY_STYLES = {
    H1: { tag: "h1", style: "margin: 0.1rem 0; font-size: 2rem;" },
    H2: { tag: "h2", style: "margin: 0.1rem 0; font-size: 1.5rem;"},
    H3: { tag: "h3", style: "margin: 0.1rem 0; font-size: 1.2rem;"},
    H4: { tag: "h4", style: "margin: 0.1rem 0; font-size: 1rem; font-style: italic"},
    P: { tag: "p", style: "line-height: 1.8" },
    BLOCK_QUOTE: { tag: "blockquote", style: `border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;` },
}

export const ArticleEditor = forwardRef((props, ref) => {

    const [content, setContent] = useState(props.post ? JSON.parse(decodeURIComponent(props.post.Content)) : []);

    // Misc
    const toHtml = () => {
        let html = "";
        for (const item of content) {
            if (item.type === ARTICLE_COMPONENT_TYPES.BODY) {
                html += getBodyHtml(item);
            }
            if (item.type === ARTICLE_COMPONENT_TYPES.IMAGE) {
                html += `<div class="w-full flex flex-col justify-center"><img src="${FILES_URL}/images/${item.image}" className="w-full" /><div class="text-center text-sm text-gray-300 italic">${item.text}</div></div>`
            }
            if (item.type === ARTICLE_COMPONENT_TYPES.VIDEO) {
                html += `<div class="w-full flex flex-col justify-center"><img src="${FILES_URL}/images/${item.image}" className="w-full" /><div class="text-center text-sm text-gray-300 italic">${item.text}</div></div>`
            }
        }
        return html;
    }

    const toJsonString = () => {
        return JSON.stringify(content);
    }

    useImperativeHandle(ref, () => ({
        toHtml: toHtml,
        toJsonString: toJsonString,
    }));

    const deleteItem = (index) => {
        const list = [...content];
        list.splice(index, 1);
        setContent(list);
    }

    // Body Component
    const addParagraph = (options={}, index) => {
        const list = [...content];
        const item = {
            type: options.type ?? ARTICLE_COMPONENT_TYPES.BODY,
            text: options.text ?? "",
            bold: options.bold ?? false,
            italic: options.italic ?? false,
            style: options.style ?? ARTICLE_BODY_STYLES.P,
            link: options.link ? options.link : null,
        }
        list.splice(index ?? list.length, 0, item);
        setContent(list);
    }

    const getBodyHtml = (item) => {
        const tag = item.style.tag;
        const text = item.link ? `<a href=${item.link} class="text-blue-600 hover:text-blue-800 hover:underline">${item.text}</a>` : item.text;
        return `<${tag} class="${item.bold ? "font-bold" : ""} ${item.italic ? "italic" : ""}">${text}</${tag}>`;
    }

    const setText = (text, index) => {
        const list = [...content];
        list[index].text = text;
        setContent(list);
    }
    
    const setItalic = (index) => {
        const list = [...content];
        list[index].italic = !list[index].italic;
        setContent(list);
    }
    
    const setBold = (index) => {
        const list = [...content];
        console.log(list);
        console.log(content);
        list[index].bold = !list[index].bold;
        setContent(list);
    }
    
    const setStyle = (style, index) => {
        const list = [...content];
        list[index].style = style;
        setContent(list);
    }
    
    const setLink = (link, index) => {
        const list = [...content];
        list[index].link = link;
        setContent(list);
    }

    // Image Components
    const addImage = (image, index) => {
        const list = [...content];
        list.splice(index ?? list.length, 0, {
            type: ARTICLE_COMPONENT_TYPES.IMAGE,
            image: image,
            text: "",
        });
        setContent(list);
    }

    // Video Components
    const addVideo = (video, index) => {
        const list = [...content];
        list.splice(index ?? list.length, 0, {
            type: ARTICLE_COMPONENT_TYPES.VIDEO,
            video: video,
            text: "",
        });
        setContent(list);
    }

    return (
        <>
            <div className="block mt-2 w-full">
                { content.map((item, index) => {
                    return (
                        <div key={index}>
                            <ArticleEditorBetween index={index} addImage={addImage} addParagraph={addParagraph} addVideo={addVideo} />
                            <div className="relative">
                                {   item.type === ARTICLE_COMPONENT_TYPES.BODY ?
                                        (<ArticleEditorBody
                                            index={index}
                                            text={item.text} setText={setText}
                                            italic={item.italic} setItalic={setItalic}
                                            bold={item.bold} setBold={setBold}
                                            style={item.style} setStyle={setStyle}
                                            link={item.link} setLink={setLink}
                                        />) :
                                    item.type === ARTICLE_COMPONENT_TYPES.IMAGE ?
                                        (
                                            <div className="w-full flex flex-col justify-center">
                                                <img className="" src={`${FILES_URL}/images/${item.image}`} />
                                                <input onChange={(e) => { setText(e.target.value, index) }} placeholder="Caption here" className="text-sm text-center text-gray-400 italic rounded-sm border border-gray-300" value={item.text} />
                                            </div>
                                        ) :
                                    item.type === ARTICLE_COMPONENT_TYPES.VIDEO ?
                                        (
                                            <div className="w-full flex flex-col justify-center">
                                                <Player
                                                    playsInline
                                                    src={`${FILES_URL}/videos/${item.video}`}
                                                />
                                                <input onChange={(e) => { setText(e.target.value, index) }} placeholder="Caption here" className="text-sm text-center text-gray-400 italic rounded-sm border border-gray-300" value={item.text} />
                                            </div>
                                        ) :
                                        (<></>)
                                }
                                <div className="absolute -right-2 -top-2">
                                    <button className="rounded-full p-1 bg-red-500 text-white flex justify-center items-center" onClick={() => {deleteItem(index)}}><X /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <ArticleEditorBetween addImage={addImage} addParagraph={addParagraph} addVideo={addVideo} />
            </div>
        </>
    );

});