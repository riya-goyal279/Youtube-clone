import { useEffect, useRef, useState } from 'react'
import VideoCard from './VideoCard';
import { VIDEOS_API, MOST_POPULAR_PARAMS, SEARCH_API } from '../utils/constants';
import VideoContainerShimmerUI from './shimmerUI/VideoContainerShimmerUI';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../utils/popularVideoSlice';

const VideoContainer = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const videos = useSelector(store => store.popularVideos.videos);
    const categoryTitle = useSelector(store => store.category.categoryTitle);
    const categoryRef = useRef(categoryTitle);
    

    useEffect(() => {
        categoryRef.current = categoryTitle;
    }, [categoryTitle]);

    useEffect(() => {
        if(categoryRef.current === null) getVideos();
        else getSearchResults();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const threshold = 10;

        if (scrollTop + windowHeight >= documentHeight - threshold) {
            setIsLoading(true);
            console.log(categoryRef.current);
            if(categoryRef.current === null) getVideos();
            else getSearchResults();
        }
    };

    const getVideos = async () => {
        const response = await fetch(VIDEOS_API + MOST_POPULAR_PARAMS);
        const data = await response.json();
        // console.log(data.items);
        setIsLoading(false);
        dispatch(setVideos(data.items));
    }

    const getSearchResults = async () => {
        const response = await fetch(`${SEARCH_API}&type=video&maxResults=18&q=${categoryRef.current}`);
        const data = await response.json();
        console.log(data.items);
        setIsLoading(false);
        if(data.items) dispatch(setVideos(data.items));
    }

    if(!videos.length){
        return <VideoContainerShimmerUI />
    }

    return (
        <>
            <div className='px-4 sm:px-6 py-4'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8'>
                    { videos.map(({id, statistics, snippet: {channelId, channelTitle, title, publishedAt, thumbnails}}, index) => (
                        <VideoCard key={index} id={id} viewCount={statistics?.viewCount} channelTitle={channelTitle} title={title} thumbnails={thumbnails} publishedAt={publishedAt} />
                    ))}
                </div>
            </div>
            {isLoading && <VideoContainerShimmerUI />}
        </>
    )
}

export default VideoContainer

