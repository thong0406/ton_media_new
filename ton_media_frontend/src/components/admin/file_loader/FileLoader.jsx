import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL, FILES_URL } from "../../../constants";
import { File, FileUp, X } from "lucide-react";
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; 

export const FILE_LOADER_FILE_TYPES = {
    VIDEOS: 0,
    IMAGES: 1,
}

export default function FileLoader({ onClick, onClose, type }) {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [active, setActive] = useState(type ?? FILE_LOADER_FILE_TYPES.IMAGES);
    const [deleteHandler, setDeleteHandler] = useState(() => {});

    useEffect(() => {
        fetchImages();
        fetchVideos();
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
    
    const fetchVideos = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/files/videos/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            const videos = res.data;
            setVideos(videos);
        } catch (e) {
            console.log(e);
        }
    }

    const imageInputRef = useRef(null);
    const uploadImageHandler = () => {
        imageInputRef.current?.click();
    }
    

    const videoInputRef = useRef(null);
    const uploadVideoHandler = () => {
        videoInputRef.current?.click();
    }

    const deleteImageHandler = async (image) => {
        try {
            await axios.post(`${BACKEND_URL}/files/images/delete/${image}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            fetchImages();
        } catch(e) {
            console.log(e);
        }
    }
    
    const deleteVideoHandler = async (image) => {
        try {
            await axios.post(`${BACKEND_URL}/files/videos/delete/${image}`, {}, {
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
                await axios.post(`${BACKEND_URL}/files/images/upload`, form, {
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
    

    const onSelectVideo = async (e) => {
        if (e.target.files && e.target.files[0]) {
            try {
                console.log(e.target.files[0]);
                const file = e.target.files[0];
                const form = new FormData();
                form.append('file', file);
                await axios.post(`${BACKEND_URL}/files/videos/upload`, form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    }
                });
                fetchVideos();
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="aspect-4/3 bg-white rounded-sm border border-gray-300 shadow-md w-96">
            <div className="p-3 flex bg-gray-300 justify-between">
                <div className="flex gap-4">
                    <button className={`text-${active === FILE_LOADER_FILE_TYPES.IMAGES ? "black" : "gray-400"}`} onClick={() => {setActive(FILE_LOADER_FILE_TYPES.IMAGES)}}>Images</button>
                    <button className={`text-${active === FILE_LOADER_FILE_TYPES.VIDEOS ? "black" : "gray-400"}`} onClick={() => {setActive(FILE_LOADER_FILE_TYPES.VIDEOS)}}>Videos</button>
                </div>
                <div className="flex gap-4">
                    <button onClick={active === FILE_LOADER_FILE_TYPES.IMAGES ? uploadImageHandler : uploadVideoHandler}>
                        <FileUp />
                        <input className="hidden" ref={videoInputRef} type="file" accept="video/*" onChange={onSelectVideo} />
                        <input className="hidden" ref={imageInputRef} type="file" accept="image/*" onChange={onSelectImage} />
                    </button>
                    <button onClick={() => {onClose()}}>
                        <X />
                    </button>
                </div>
            </div>
            <div className="h-full">
                <div className="grid w-full grid-cols-2 p-3 gap-4 h-full overflow-y-scroll">
                    {(active === FILE_LOADER_FILE_TYPES.IMAGES ? images : videos).map((file, ind) => (
                        <div className="relative" key={ind}>
                            <div className="absolute z-10" style={{top: -10, right: -10}}>
                                <button className={ `flex items-center justify-center relative rounded-full aspect-square text-black bg-white` } onClick={() => {active === FILE_LOADER_FILE_TYPES.IMAGES ? deleteImageHandler(file) : deleteVideoHandler(file)}}>
                                    <X />
                                </button>
                            </div>
                            <button className="col-span-1 flex flex-col justify-center items-center w-full" onClick={() => {onClick(active, file)}}>
                                {active === FILE_LOADER_FILE_TYPES.IMAGES ? 
                                    (<img className="w-full" src={`${FILES_URL}/images/${file}`} />) : 
                                    (<Player
                                        className="w-full"
                                        src={{uri: `${FILES_URL}/videos/${file}`}}
                                    />)
                                }
                                <div className="text-sm w-full text-center break-all">{file}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}