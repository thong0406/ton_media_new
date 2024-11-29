import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { ARTICLE_BODY_TYPES } from "./ArticleEditor";

export default function ArticleEditorBetween(props) {

    const onClickHandler = props.onClickHandler;
    const [active, setActive] = useState(false);

    return(
        <div className="py-2 flex justify-between items-center gap-2">
            <hr className="flex-1" />
            <div>
                <button className={ `flex items-center justify-center relative rounded-full ${active ? "bg-blue-700" : "bg-blue-500"} aspect-square text-white p-2` } onClick={() => {setActive(!active)}}>
                    <PlusIcon />
                    {
                        active && (
                            <div className="flex flex-col absolute top-6 bg-white rounded-sm z-10">
                                <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {onClickHandler(ARTICLE_BODY_TYPES.P)}}>Body</button>
                                <button className={`hover:text-black text-gray-500 p-2 border border-b-gray-500`} onClick={() => {onClickHandler(ARTICLE_BODY_TYPES.H1)}}>H1</button>
                            </div>
                        )
                    }
                </button>
            </div>
            <hr className="flex-1" />
        </div>
    )
}