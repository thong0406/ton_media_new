import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { ARTICLE_BODY_STYLES } from "./ArticleEditor";
import FileLoader, { FILE_LOADER_FILE_TYPES } from "../file_loader/FileLoader";

export default function ArticleEditorBetween({ index, addParagraph, addImage, addVideo }) {

    const [active, setActive] = useState(false);
    const [fileLoaderOpen, setFileLoaderOpen] = useState(false);
    const [fileLoaderType, setFileLoaderType] = useState(FILE_LOADER_FILE_TYPES.IMAGES);

    return(
        <div className="py-2 flex justify-between items-center gap-2">
            <hr className="flex-1" />
            <div className="relative">
                <button className={ `flex items-center justify-center rounded-full ${active ? "bg-blue-700" : "bg-blue-500"} aspect-square text-white p-2` } onClick={() => {setActive(!active)}}><PlusIcon /></button>
                {active && (
                    <div className="absolute bottom-12 bg-white rounded-sm z-10">
                        <div className="relative flex flex-col">
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {addParagraph({ style: ARTICLE_BODY_STYLES.P}, index); setActive(false);}}>Body</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {addParagraph({ style: ARTICLE_BODY_STYLES.H1}, index); setActive(false);}}>H1</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {addParagraph({ style: ARTICLE_BODY_STYLES.H2}, index); setActive(false);}}>H2</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {addParagraph({ style: ARTICLE_BODY_STYLES.H3}, index); setActive(false);}}>H3</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {addParagraph({ style: ARTICLE_BODY_STYLES.H4}, index); setActive(false);}}>H4</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {setFileLoaderType(FILE_LOADER_FILE_TYPES.IMAGES); setFileLoaderOpen(true);}}>Image</button>
                            <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {setFileLoaderType(FILE_LOADER_FILE_TYPES.VIDEOS); setFileLoaderOpen(true);}}>Video</button>
                            <div className="absolute top-0 left-20 z-10">
                                {fileLoaderOpen && <FileLoader type={fileLoaderType} onClick={(active, file) => {(active === FILE_LOADER_FILE_TYPES.IMAGES ? addImage(file, index) : addVideo(file, index)); setFileLoaderOpen(false); setActive(false)}} onClose={() => {setFileLoaderOpen(false)}} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <hr className="flex-1" />
        </div>
    )

}