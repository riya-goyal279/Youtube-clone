import SidebarMini from './SidebarMini';
import FilterChips from './FilterChips';
import VideoContainer from './VideoContainer';
import { Outlet, useSearchParams } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <SidebarMini />
      <FilterChips />
      <div className='md:ml-[72px] pt-14'>
        <Outlet />
        <VideoContainer />
      </div>
    </div>
  )
}

export default Home
