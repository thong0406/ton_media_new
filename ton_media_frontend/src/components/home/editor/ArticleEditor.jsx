import React, { useState } from "react";
import ArticleEditorBody from "./ArticleEditorBody";
import { PlusIcon } from "lucide-react";
import ArticleEditorBetween from "./ArticleEditorBetween";
import { InsertAt } from "../../../util";
import ArticleEditorImage from "./ArticleEditorImage";
import ArticleEditorVideo from "./ArticleEditorVideo";
import FileLoader from "../file_loader/FileLoader";

export const ARTICLE_COMPONENT_TYPES = {
    BODY: 1,
    IMAGE: 2,
    VIDEO: 3,
}

export const ARTICLE_BODY_TYPES = {
    H1: "margin: 0.1rem 0; font-size: 2rem;",
    H2: "margin: 0.1rem 0; font-size: 1.5rem;",
    H3: "margin: 0.1rem 0; font-size: 1.2rem;",
    H4: "margin: 0.1rem 0; font-size: 1rem; font-style: italic;",
    P: "line-height: 1.8",
    BLOCK_QUOTE: `border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;`,
}

export default function ArticleEditor() {

    const [content, setContent] = useState([]);
    
    const [fileLoader, setFileLoader] = useState(null);
    const [fileLoaderVisible, setFileLoaderVisible] = useState(false);
    
    const resetContent = (list) => {
        for (var i = 0; i < list.length; i++) {
            list[i].index = i;
        }
        setContent(list);
    }

    const addParagraph = (index=content.length, type=ARTICLE_BODY_TYPES.P) => {
        console.log(index);
        const list = InsertAt(content, index, {
            index: index,
            type: ARTICLE_COMPONENT_TYPES.BODY,
            component: (<ArticleEditorBody type={type} removeHandler={() => {removeItem(content.length)}} />),
        });
        resetContent(list);
    }

    const openFileLoader = () => {
        if (!fileLoader) setFileLoader(<FileLoader onClick={addImage} />);
        setFileLoaderVisible(!fileLoaderVisible);
    }

    const addImage = (image, index=content.length) => {
        console.log(index);
        const list = InsertAt(content, index, {
            index: index,
            type: ARTICLE_COMPONENT_TYPES.IMAGE,
            component: (<ArticleEditorImage image={image} />),
        });
        resetContent(list);
    }

    const addVideo = (index=content.length) => {
        const list = InsertAt(content, index, {
            index: index,
            type: ARTICLE_COMPONENT_TYPES.VIDEO,
            component: (<ArticleEditorVideo />),
        });
        resetContent(list);
    }

    const removeItem = (index) => {
        let list = content;
        console.log(list);
        console.log(index);
        console.log(list.slice(index+1, list.length));
        console.log(list.slice(0,index));
        //list = [...list.slice(0,index), ...list.slice(index+1, list.length)];
        //resetContent(list);
    }

    const getContent = () => {
        const returnContent = "";
        for (const item of content) {
            console.log(item);
        }
    }

    return (
        <>
            <div className="flex gap-4 my-2">
                <button onClick={() => {addParagraph()}} className="py-2 px-4 text-center bg-black text-white">New paragraph</button>
                <div className="relative">
                    <button onClick={() => {openFileLoader()}} className="py-2 px-4 text-center bg-black text-white">Add image</button>
                    <div className="absolute z-50">
                        { fileLoaderVisible && fileLoader }
                    </div>
                </div>
                <button onClick={() => {console.log(content)}} className="py-2 px-4 text-center bg-black text-white">Add video</button>
            </div>
            <div className="block">
                {content.map((item, ind) => 
                    <>
                        <ArticleEditorBetween onClickHandler={(type) => { addParagraph(ind, type) }} />
                        {item.component}
                    </> 
                )}
            </div>
        </>
    );

}