import Header from './Header'
import { Outlet } from 'react-router-dom'
import SidebarMain from './SidebarMain';

const Body = () => {

  return (
    <div className='font-roboto text-[#0f0f0f]'>
      <Header />
      <SidebarMain />
      <main className='mt-14'>
        <Outlet />
      </main>
    </div>
  )
}

export default Body
