import { IoMdHome } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { SiYoutubemusic, SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Link } from "react-router-dom";

const SidebarMini = () => {
    const sidebarItems = [
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
            path: "/feed/you",
            icon: <HiOutlineUserCircle size={24}/>,
            label: "You"
        },
        {
            path: "/feed/downloads",
            icon: <LiaDownloadSolid size={24}/>,
            label: "Downloads"
        },
        {
            path: "https://music.youtube.com/",
            icon: <SiYoutubemusic size={24}/>,
            label: "Youtube Music"
        },
    ];

    return (
        <div className="fixed left-0 right-0 md:right-auto md:top-14 bottom-0 md:w-fit bg-white z-6">
            <ul className="list-none px-1 flex md:flex-col justify-around md:justify-start items-center h-full overflow-scroll scroll-w-0">
                { 
                    sidebarItems.map((item, index) => {
                        return <li key={index} className='py-2 md:py-4 w-16 hover:bg-black/10 rounded-lg last:hidden last:md:block'>
                                <Link to={item.path} className='w-full h-full flex flex-col items-center cursor-pointer' title='mini-sidebar-item'>
                                    <span className="flex w-6 h-6 text-[#030303] mb-1.5">
                                        {item.icon}
                                    </span>
                                    <span className='text-[10px] leading-3.5 text-[#0f0f0f] text-center overflow-hidden max-w-full text-ellipsis whitespace-nowrap'>{item.label}</span>
                                </Link>
                            </li>
                    })
                }
            </ul>
        </div>
    )
}

export default SidebarMini;
