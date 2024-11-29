import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL, FILES_URL } from "../../../constants";
import { FileUp, XIcon } from "lucide-react";

export default function FileLoader(props) {
    const [images, setImages] = useState([]);
    const fileOnClickHander = props.onClick;

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/files/images/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            const images = res.data;
            setImages(images);
        } catch (e) {
            console.log(e);
        }
    }

    const imageInputRef = useRef(null);
    const uploadImageHandler = () => {
        imageInputRef.current?.click();
    }

    const deleteImageHandler = async (image) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/files/images/delete/${image}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            fetchImages();
        } catch(e) {
            console.log(e);
        }
    }

    const onSelectImage = async (e) => {
        if (e.target.files && e.target.files[0]) {
            try {
                console.log(e.target.files[0]);
                const file = e.target.files[0];
                const form = new FormData();
                form.append('file', file);
                const res = await axios.post(`${BACKEND_URL}/files/images/upload`, form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    }
                });
                fetchImages();
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="aspect-4/3 bg-white rounded-sm border border-gray-300 shadow-md w-96">
            <div className="p-3 flex bg-gray-300 justify-between">
                <div className="flex gap-4">
                    <button className="text-black">Images</button>
                    <button className="text-gray-400">Videos</button>
                </div>
                <button onClick={uploadImageHandler}>
                    <FileUp />
                    <input className="hidden" ref={imageInputRef} type="file" onChange={onSelectImage} />
                </button>
            </div>
            <div className="h-full">
                <div className="grid w-full grid-cols-3 p-3 gap-4 h-full overflow-y-scroll">
                    {images.map((image, ind) => (
                        <div className="relative" key={ind}>
                            <div className="absolute" style={{top: -10, right: -10}}>
                                <button className={ `flex items-center justify-center relative rounded-full aspect-square text-black bg-white` } onClick={() => {deleteImageHandler(image)}}>
                                    <XIcon />
                                </button>
                            </div>
                            <button className="col-span-1 flex items-center" onClick={() => {fileOnClickHander(image)}}>
                                <img className="w-full" src={`${FILES_URL}/images/${image}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}