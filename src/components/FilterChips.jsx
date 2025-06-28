import { useEffect, useState } from 'react';
import FilterChipsShimmerUI from './shimmerUI/FilterChipsShimmerUI';
import { MOST_POPULAR_PARAMS, SEARCH_API, VIDEO_CATEGORY_API, VIDEOS_API } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { emptyVideos, setVideos } from '../utils/popularVideoSlice';
import { setCategoryId } from '../utils/videoCategorySlice';

const FilterChips = () => {
    const dispatch = useDispatch();

    const [videoCategories, setVideoCategories] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const categoryId = useSelector(store => store.category.categoryId);
    const categoryTitle = useSelector(store => store.category.categoryTitle);

    useEffect(() => {
        getVideoCategories();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        if(categoryTitle == null) {
            getVideos();
            return;
        }
        getSearchResults();
    }, [activeCategory]);

    const getSearchResults = async () => {
        dispatch(emptyVideos());
        const response = await fetch(`${SEARCH_API}&type=video&maxResults=18&q=${categoryTitle}`);
        const data = await response.json();
        console.log(data.items);
        if(data.items) dispatch(setVideos(data.items));
    }

    const getVideoCategories = async () => {
        const response = await fetch(VIDEO_CATEGORY_API);
        const data = await response.json();
        // console.log(data.items);
        if(data.items) setVideoCategories(data.items);
    }

    const getVideos = async () => {
        dispatch(emptyVideos());
        const response = await fetch(VIDEOS_API + MOST_POPULAR_PARAMS);
        const data = await response.json();
        // console.log(data.items);
        if(data.items) dispatch(setVideos(data.items));
    }

    const showAllVideos = () => {
        dispatch(setCategoryId({id: null, title: null}));
        setActiveCategory(null);
    }

    const filterVideos = (id, title) => {
        dispatch(setCategoryId({id, title}));
        setActiveCategory(id);
    }

    if(!videoCategories){
        return <FilterChipsShimmerUI />
    }

    return (
        <div className='fixed z-5 top-14 left-0 md:left-[72px] right-0'>
            <div className="py-3 px-4 sm:px-6 md:mx-6 md:px-0 flex items-center z-6 gap-3 overflow-auto w-full scroll-w-0 bg-white">
                <button className={`px-3 ${categoryId === null ? 'bg-[#0f0f0f] text-white' : 'bg-black/5'} rounded-lg whitespace-nowrap text-sm leading-5 py-1.5 font-medium cursor-pointer`}
                    onClick={showAllVideos}>
                    All
                </button>
                {
                    videoCategories.map(({id, snippet: {title}}) => {
                        return <button key={id} title={title} className={`${categoryId == id ? 'bg-[#0f0f0f] text-white' : 'bg-black/5'} px-3 rounded-lg whitespace-nowrap text-sm leading-5 py-1.5 font-medium cursor-pointer`}
                            onClick={() => filterVideos(id, title)}>
                                {title}
                            </button>
                    })
                }
            </div>
        </div>
    )
}

export default FilterChips;
