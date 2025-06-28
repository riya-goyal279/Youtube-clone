import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../utils/sidebarSlice";

const HeaderLeft = () => {
  const dispatch = useDispatch();

  const sidebarToggle = () => {
    dispatch(toggleSidebar());
  }

  return (
    <div className='flex items-center h-14'>
        <button type="button" 
          className='w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/10' 
          title="guide" 
          aria-label="Toggle menu"
          onClick={() => sidebarToggle()}>
            <RxHamburgerMenu size={24}/>
        </button>
        <Link to="/" className="flex items-center px-3" title='mini-sidebar-item'>
            <FaYoutube size={30} color="#FF0033" />
            <span className="text-xl font-oswald font-semibold ml-0.5">YouTube</span>
        </Link>
        {/* back */}
    </div>
  )
}

export default HeaderLeft
