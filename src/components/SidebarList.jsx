import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { closeSidebar } from "../utils/sidebarSlice";

const SidebarList = ({list}) => {
    const dispatch = useDispatch();

    const hideSidebar = () => {
        dispatch(closeSidebar());
    }

    return (
        <ul className="w-full list-none">
            {
                list.map((item, index) => {
                    return <li key={index} className="h-10 hover:bg-black/10 rounded-lg mr-3 text-[#0f0f0f] px-3">
                                <Link to={item.path} className="h-full w-full flex items-center justify-start cursor-pointer"
                                    onClick={() => hideSidebar()}>
                                    <div className="mr-6">{item.icon}</div>
                                    <span className="text-sm leading-5 font-medium overflow-hidden max-w-full text-ellipsis whitespace-nowrap">{item.label}</span>
                                </Link>
                            </li>
                })
            }
        </ul>
    )
}

export default SidebarList;