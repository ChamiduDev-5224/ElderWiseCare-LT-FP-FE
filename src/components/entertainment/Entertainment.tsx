import { useEffect, useState } from "react";
import { Navbar } from "../common/Navbar";
import { videosList, Video } from './entertainmentVideo';

const Entertainment = () => {
    const [open, setOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingVideos, setLoadingVideos] = useState<{ [key: number]: boolean }>({});

    const handleOpen = (video: Video) => {
        setCurrentVideo(video);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentVideo(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleLoaded = (id: number) => {
        setLoadingVideos((prev) => ({ ...prev, [id]: false }));
    };

    const filteredVideos = videosList.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const initialLoadingState = videosList.reduce((acc, video) => ({ ...acc, [video.id]: true }), {});
        setLoadingVideos(initialLoadingState);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Cloudinary Video Grid</h1>
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredVideos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative">
                                {loadingVideos[video.id] && (
                                    <div className="flex justify-center items-center h-48 bg-gray-100">
                                        <div className="loader">Loading...</div>
                                    </div>
                                )}
                                <video
                                    src={video.url}
                                    className={`w-full h-auto ${loadingVideos[video.id] ? 'hidden' : ''}`}
                                    onLoadedData={() => handleLoaded(video.id)}
                                    controls={false}
                                    muted
                                    loop
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => handleOpen(video)}
                                        className="text-white text-2xl"
                                    >
                                        ▶
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {open && currentVideo && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={handleClose}
                    >
                        <div
                            className="bg-white rounded-lg overflow-hidden shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                width="560"
                                height="315"
                                controls
                                className="w-full h-64 sm:h-96"
                                autoPlay
                            >
                                <source src={currentVideo.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button
                                onClick={handleClose}
                                className="w-full text-center py-2 bg-red-500 text-white hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Entertainment;
