import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Manage Services & Packages'
        address='manage-services'
      />
      <MenuItem icon={FaUserCog} label='Manage Decorators' address='manage-Decorators' />
      <MenuItem icon={FaUserCog} label='Manage Bookings' address='manage-Bookings' />
    </>
  )
}

export default AdminMenu
