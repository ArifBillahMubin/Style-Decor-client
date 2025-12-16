import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoBookmarksSharp } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineMiscellaneousServices}
        label='Manage Services & Packages'
        address='manage-services'
      />
      <MenuItem icon={FaUserCog} label='Manage Decorators' address='manage-Decorators' />
      <MenuItem icon={IoBookmarksSharp} label='Manage Bookings' address='manage-Bookings' />
      <MenuItem icon={FaMoneyCheckAlt} label='Revenue Monitoring' address='revenue-monitoring' />
    </>
  )
}

export default AdminMenu
