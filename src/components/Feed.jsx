import { Outlet, useLocation } from "react-router-dom"
import SidebarMini from "./SidebarMini"

const Feed = () => {

    return (
        <>
            <SidebarMini />
            <div className="md:ml-[72px]">
                <Outlet />
            </div>
        </>
    )
}

export default Feed
