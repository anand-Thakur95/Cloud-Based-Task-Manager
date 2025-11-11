import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
function Navbar() {

  const {user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  return (
    <div>
      
    </div>
  )
}

export default Navbar
