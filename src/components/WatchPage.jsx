import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { SEARCH_API, VIDEOS_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { formatNumber, timeAgo} from '../utils/utilities';
import VideoRecommendationCards from "./VideoRecommendationCards";

const WatchPage = () => {
    const [params] = useSearchParams();
    const videoId = params.get("v");

    const [videoDetails, setVideoDetails] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        getVideoDetails();
    }, []);

    const getVideoDetails = async () => {
        const response = await fetch(`${VIDEOS_API}&id=${videoId}`);
        const data = await response.json();
        // console.log(data.items[0]);
        getSearchResults(data.items[0].snippet.tags[0]);
        setVideoDetails(data.items[0]);
    }

    const getSearchResults = async (query) => {
        const response = await fetch(`${SEARCH_API}&type=video&q=${query}`);
        const data = await response.json();
        // console.log(data.items);
        if(data.items) setRecommendations(state => [...state, ...data.items]);
    }

    function formatLinksAndLineBreaks(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split('\n');
        
        return parts.map((part, index) => {
            const withLinks = part.split(urlRegex).map((chunk, i) => {
            if (chunk.match(urlRegex)) {
                return (
                <a key={i} href={chunk} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {chunk}
                </a>
                );
            }
            return chunk;
            });

            return (
            <p key={index} style={{ margin: 0 }}>
                {withLinks}
                <br />
            </p>
            );
        });
    }

    return videoDetails && (
        <div className="py-6 sm:px-6 flex gap-x-6">
            <div className="w-full lg:w-8/12 shrink-0">
                <div className="aspect-16/9 sm:rounded-xl overflow-hidden">
                    <iframe className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={videoDetails.snippet.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen></iframe>
                </div>
                <h1 className="text-xl leading-7 font-bold mt-3">
                    {videoDetails.snippet.title}
                </h1>
                <div className="flex items-center justify-between mt-3 gap-x-3">
                    <div className="flex items-center justify-start gap-x-6 flex-1">
                        <Link to="/channel" className="flex items-center gap-x-3">
                            <img className="rounded-full w-10 h-10 shrink-0" title={videoDetails.snippet.channelTitle} src="https://yt3.ggpht.com/3Lvf-BoKFXB9hx52BfVRLQK-u7yV9NsmHUrdx85X2CBN70WPGL23Y8RueSlLiayV-YRHHWul1A=s88-c-k-c0x00ffffff-no-rj" />
                            <div className="">
                                <h3 className="text-base leading-6 font-semibold line-clamp-1">
                                    {videoDetails.snippet.channelTitle}
                                </h3>
                                <p className="text-[#606060] text-xs leading-4 line-clamp-1">
                                    34.2M subscribers
                                </p>
                            </div>
                        </Link>
                        <button title="Subsscribe" className="cursor-pointer h-9 px-4 bg-[#0f0f0f] text-white text-sm rounded-2xl font-medium flex items-center">
                            Subscribe
                        </button>
                    </div>
                    <div className="">
                        <div className="flex items-center justify-center">
                            <button title="likes" aria-label="likes" className="h-9 bg-black/5 hover:bg-black/10 cursor-pointer px-4 rounded-l-2xl flex items-center justify-between">
                                <AiOutlineLike size={24}/>
                                <p className="ml-1.5 text-sm font-medium">{formatNumber(videoDetails.statistics.likeCount)}</p>
                            </button>
                            <button title="likes" aria-label="likes" className="h-9 bg-black/5 hover:bg-black/10 cursor-pointer px-4 rounded-r-2xl before:content-['|'] relative before:absolute before:left-0 before:text-gray-300">
                                <AiOutlineDislike size={24} className="rotate-y-180"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-3 p-3 bg-black/5 rounded-md text-sm leading-5">
                    <span className="font-semibold">{formatNumber(videoDetails.statistics.viewCount, 1)} views</span>
                    <span className="font-semibold mx-2.5">{timeAgo(videoDetails.snippet.publishedAt)}</span>
                    {!showMore && videoDetails.snippet.tags.slice(0, 3).map((tag, index) => <span key={index} className="text-[#606060] font-semibold">#{tag}</span>) }
                    {showMore && videoDetails.snippet.tags.map((tag, index) => <span key={index} className="text-[#606060] font-semibold">#{tag}</span>) }
                    <div className={`whitespace-pre-wrap text-sm text-gray-700 mt-1 ${showMore ? '' : 'line-clamp-4'}`}>
                        {formatLinksAndLineBreaks(videoDetails.snippet.description)}
                    </div>
                    <button className="font-medium mt-2 inline-block cursor-pointer" 
                        onClick={() => setShowMore(!showMore)}
                    >{showMore ? "Show less" : "Show more"}</button>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col gap-y-4">
                    { recommendations && recommendations.length > 0 && recommendations.map(({id: {videoId}, snippet: {channelId, channelTitle, publishedAt, thumbnails, title}}) => {
                        return <VideoRecommendationCards key={videoId} id={videoId} title={title} thumbnails={thumbnails} channelTitle={channelTitle} publishedAt={publishedAt}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default WatchPage
