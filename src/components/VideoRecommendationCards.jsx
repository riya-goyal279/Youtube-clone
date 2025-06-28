import { Link } from "react-router-dom";
import { timeAgo } from "../utils/utilities";

const VideoRecommendationCards = ({id, title, thumbnails, channelTitle, publishedAt}) => {
    return (
        <div className='w-full flex gap-x-2'>
            <Link to={`/watch?v=${id}`} title={title} className='aspect-16/9 h-20 xl:h-24 shrink-0 relative rounded-lg overflow-hidden'>
                <img className='w-full h-full' title={title} alt={title} src={thumbnails.medium.url} />
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-black/15'></div>
            </Link>
            <div className='flex flex-col pr-6 flex-1'>
                <Link to={`/watch?v=${id}`} className='text-sm leading-5 font-medium line-clamp-2 mb-1'>{title}</Link>
                <Link to="/channel" className="text-xs leading-4 line-clamp-1 text-[#606060]">{channelTitle}</Link>
                <Link to={`/watch?v=${id}`} className="text-xs leading-4 text-[#606060] flex items-center">
                    {timeAgo(publishedAt)}
                </Link>
            </div>
        </div>
    )
}

export default VideoRecommendationCards
