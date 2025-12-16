import { BsFingerprint } from 'react-icons/bs'
import { TbCoinTakaFilled } from "react-icons/tb";
import MenuItem from './MenuItem'
// import { useState } from 'react'
import { IoBookmarksSharp } from "react-icons/io5";
const CustomerMenu = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
      <MenuItem icon={IoBookmarksSharp} label='My Bookings' address='my-bookings' />
      <MenuItem icon={TbCoinTakaFilled} label='Payment History' address='payment-history' />
    </>
  )
}

export default CustomerMenu
