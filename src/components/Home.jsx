import SidebarMini from './SidebarMini';
import FilterChips from './FilterChips';
import VideoContainer from './VideoContainer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) navigate("/login");
  }, []);

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
