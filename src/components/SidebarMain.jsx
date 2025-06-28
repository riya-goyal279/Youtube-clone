import { IoMdHome } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import { SiYoutubemusic, SiYoutubeshorts, SiYoutubestudio, SiYoutubekids } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineWatchLater } from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { LiaDownloadSolid } from "react-icons/lia";

import SidebarList from "./SidebarList";
import HeaderLeft from "./HeaderLeft";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../utils/sidebarSlice";


const SidebarMain = () => {

    const dispatch = useDispatch();
    const showSidebar = useSelector(store => store.sidebar.showSidebar);

    const sidebarGuide = [
            {
                path: "/",
                icon: <IoMdHome size={24}/>,
                label: "Home"
            },
            {
                path: "/feed/shorts",
                icon: <SiYoutubeshorts size={24}/>,
                label: "Shorts"
            },
            {
                path: "/feed/subscriptions",
                icon: <MdOutlineSubscriptions size={24}/>,
                label: "Subscriptions"
            },
            {
                path: "https://music.youtube.com/",
                icon: <SiYoutubemusic size={24}/>,
                label: "Youtube Music"
            },
        ];
    
    const sidebarUserGuide = [
            {
                path: "/history",
                icon: <VscHistory size={24}/>,
                label: "History"
            },
            {
                path: "/playlists",
                icon: <CgPlayList size={24}/>,
                label: "Playlists"
            },
            {
                path: "https://studio.youtube.com/",
                icon: <GoVideo size={24}/>,
                label: "Your videos"
            },
            {
                path: "/playlists",
                icon: <MdOutlineWatchLater size={24}/>,
                label: "Watch later"
            },
            {
                path: "/playlists",
                icon: <AiOutlineLike size={24}/>,
                label: "Liked videos"
            },
            {
                path: "/feed/downloads",
                icon: <LiaDownloadSolid size={24}/>,
                label: "Downloads"
            },
        ];
    
    const sidebarMoreFromYt = [
        {
            path: "https://studio.youtube.com/",
            icon: <SiYoutubestudio size={24} color="FF0033"/>,
            label: "YouTube Studio"
        },
        {
            path: "https://music.youtube.com/",
            icon: <SiYoutubemusic size={24} color="FF0033"/>,
            label: "YouTube Music"
        },
        {
            path: "https://www.youtubekids.com/",
            icon: <SiYoutubekids size={24} color="FF0033"/>,
            label: "YouTube Kids"
        },
    ];

    const hideSidebar = () => {
        dispatch(toggleSidebar());
    }

    return (
        <div className='fixed top-0 bottom-full left-0 right-0 z-10'>
            <div className={`absolute top-0 left-0 right-0 h-dvh bg-black/10 ${showSidebar ? '' : 'hidden'}`} onClick={() => hideSidebar()}></div>
            <div className={`absolute top-0 left-0 h-dvh w-60 bg-white px-4 overflow-auto scroll-w-0 transition-transform duration-300 ${showSidebar ? 'translate-0' : '-translate-x-full'}`}>
                <HeaderLeft />
                <div className="w-full py-4 border-b border-gray-300">
                    <SidebarList list={sidebarGuide} />
                </div>
                <div className="w-full py-4 border-b border-gray-300">
                    <Link to="/feed/you" className="h-10 pl-4 flex items-center gap-2 w-full hover:bg-black/10 rounded-lg">
                        <span className="text-base leading-5 font-medium">You</span>
                        <SlArrowRight size={12} />
                    </Link>
                    <SidebarList list={sidebarUserGuide} />
                </div>
                <div className="w-full py-4 border-b border-gray-300">
                    <div className="h-10 pl-4 flex items-center gap-2 w-full">
                        <span className="text-base leading-5 font-medium">More from YouTube</span>
                    </div>
                    <SidebarList list={sidebarMoreFromYt} />
                </div>
            </div>
        </div>
    )
}

export default SidebarMain
