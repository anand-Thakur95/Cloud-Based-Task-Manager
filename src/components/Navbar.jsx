import { useSidebar } from './ui/sidebar';
function Navbar() {

  const {toggleSidebar} = useSidebar()
  
  return (
    <div className=' w-full flex justify-between items-center bg-pink-400  px-4 py-3 2xl:py-4 fixed z-10 top-0 left-10'>
    <div className='flex justify-between gap-4'>
      <div className=''>
        <button
          onClick={ toggleSidebar }
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>
      </div>
        search
      </div>

      <div>
        avatar
      </div>
      
    </div>
  )
}

export default Navbar
