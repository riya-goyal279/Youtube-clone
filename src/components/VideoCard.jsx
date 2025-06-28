import { Link } from 'react-router-dom';
import { formatNumber, timeAgo} from '../utils/utilities';

const VideoCard = ({id, viewCount, channelTitle, title, thumbnails, publishedAt}) => {
    let videoId = id;
    if(typeof id === 'object') videoId = id.videoId;
    
    return (
        <div className='cursor-pointer flex flex-col items-center'>
            <div className='bg-black/10 w-full aspect-16/9 rounded-xl'>
                <Link to={`/watch?v=${videoId}`} className='w-full h-full flex'>
                    <img className='w-full h-full rounded-xl' title={title} src={thumbnails.medium.url} />
                </Link>
            </div>
            <div className='flex mt-3'>
                <Link to="/channel-page" className='flex h-9 w-9 rounded-full overflow-hidden mr-3 shrink-0'>
                    <img className='w-full h-full' title='channel-name' src='https://yt3.ggpht.com/iecYkA5MTkOLZhpuuKh9Za9IPomN4PMtkMS3OCHVm0gqgKZQQgV_UeoRMHyLzlVS7Vq4YMtsmn4=s68-c-k-c0x00ffffff-no-rj' />
                </Link>
                <div className='relative'>
                    <Link to={`/watch?v=${videoId}`} className='flex'>
                        <h3 className='text-base leading-[22px] font-medium max-h-11 text-ellipsis line-clamp-2 pr-6 break-word' title={title}>
                            {title}
                        </h3>
                    </Link>
                    <Link to="/channel-page" className='text-sm leading-5 text-[#606060] line-clamp-1'>
                        {channelTitle}
                    </Link>
                    <Link to={`/watch?v=${videoId}`} className='flex items-center text-sm leading-5 text-[#606060]'>
                        {viewCount && <span>{formatNumber(viewCount, 1)} views</span>}
                        <span className={`${viewCount ? 'relative pl-3 before:absolute before:left-1 before:-top-1/5 before:content-["."] before:font-bold' : ''}`}>{timeAgo(publishedAt)}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
