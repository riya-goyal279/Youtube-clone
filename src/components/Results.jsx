import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyVideos, setVideos } from '../utils/popularVideoSlice';
import { setCategoryId } from '../utils/videoCategorySlice';
import { SEARCH_API } from '../utils/constants';

const Results = () => {
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const searchQuery = params.get("search_query");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        getSearchResults();
        dispatch(setCategoryId({id: "search", title: searchQuery}));
    }, []);

    const getSearchResults = async () => {
        dispatch(emptyVideos());
        const response = await fetch(`${SEARCH_API}&type=video&maxResults=18&q=${searchQuery}`);
        const data = await response.json();
        if(data.items) dispatch(setVideos(data.items));
    }

    return <></>
}

export default Results
