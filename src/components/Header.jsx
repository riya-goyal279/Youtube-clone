import { GoPlus } from "react-icons/go";
import { CiBellOn, CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import HeaderLeft from "./HeaderLeft";
import { AUTOCOMPLETE_API } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";


const Header = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchQueries, setSearchQueries] = useState([]);
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const searchQuery = params.get("search_query");
    const debounceRef = useRef();

    const wrapperRef = useRef(null);

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setSearchQueries([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        if (searchQuery) setSearchInput(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!searchInput.trim()) {
        setSearchQueries([]);
        return;
        }

        debounceRef.current = setTimeout(() => {
        getSearchResults();
        }, 300); 

        return () => clearTimeout(debounceRef.current);
    }, [searchInput]);

    const getSearchResults = async () => {
        // console.log(searchInput);
        const response = await fetch(`${AUTOCOMPLETE_API}${searchInput}`);
        const data = await response.json();
        // console.log(data[1]);
        setSearchQueries(data[1]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/results?search_query=${encodeURIComponent(searchInput)}`);
            setSearchQueries([]);
        }
    };

    const handleSuggestionClick = (item) => {
        setSearchInput(item);
        navigate(`/results?search_query=${encodeURIComponent(item)}`);
        setSearchQueries([]);
    };

    return (
        <section className='fixed top-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 h-14 bg-white z-6'>
            <HeaderLeft />
            <div className='items-center justify-center flex-1 hidden md:flex'>
                <div className="ml-10 h-10 flex-1 max-w-2xl" ref={wrapperRef} >
                    <form className="border border-gray-300 rounded-4xl flex items-center justify-center w-full relative" onSubmit={handleSubmit}>
                        <input type="text" name="search_query" placeholder="Search" autoComplete="off" autoCorrect="off"
                        value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                        className="flex h-10 pl-4 pr-1 shadow-2xs text-[14px] leading-4 outline-0 flex-1"></input>
                        <button type="submit" title="Search" aria-label="search" className="h-10 w-16 bg-black/5 hover:bg-black/10 rounded-r-4xl border-l border-gray-300 flex items-center justify-center">
                            <CiSearch size={24} />
                        </button>
                        <ul className="absolute top-12 z-7 left-0 right-16 rounded-lg list-none bg-white shadow-2xl">
                            { searchQueries.length > 0 && searchQueries.map((item, index) => (
                                <li key={index} className="hover:bg-black/10 cursor-pointer h-10 flex items-center px-4 w-full"
                                    onClick={() => handleSuggestionClick(item)}>
                                    <CiSearch size={24} />
                                    <span className="text-base leading-5 text-bold ml-6">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <button title="Speak to search" className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center mx-4">
                    <IoMdMic size={24} />
                </button>
            </div>
            {
                !isLoggedIn && 
                <Link to="/login" className="flex items-center h-10 px-3 border border-gray-300 rounded-4xl cursor-pointer ml-6 text-blue-500">
                    <HiOutlineUserCircle size={28}/>
                    <span className="ml-2 font-medium">Sign in</span>
                </Link>
            }
            {
                isLoggedIn && 
                <div className='flex items-center'>
                    <button type="button" title="search" className="flex items-center bg-black/5 hover:bg-black/10 px-2 rounded-full h-10 mr-2 cursor-pointer md:hidden">
                        <CiSearch size={24}/>
                    </button>
                    <button type="button" title="create" className="flex items-center bg-black/5 hover:bg-black/10 lg:pr-4 lg:pl-2.5 px-2 rounded-full lg:rounded-2xl h-10 lg:h-9 mr-2 cursor-pointer">
                        <GoPlus size={24} className="lg:mr-1.5"/>
                        <span className="text-[14px] text-[#0f0f0f] font-medium hidden lg:inline">Create</span>
                    </button>
                    <button title="Notifications" className="h-10 w-10 rounded-full hover:bg-black/10 flex items-center justify-center">
                        <CiBellOn size={24} />
                    </button>
                    <div className="w-12 flex justify-center">
                        <button type="button" title="user" className="h-8 w-8 rounded-full overflow-hidden cursor-pointer">
                            <img src="https://yt3.ggpht.com/yti/ANjgQV8puFdSfDJ5gX78enlhYOdMljI2x8gry7yIXQzN3Pg=s88-c-k-c0x00ffffff-no-rj" alt="user" className="w-full h-full"/>
                        </button>
                    </div>
                </div>
            }
            
        </section>
    )
}

export default Header
