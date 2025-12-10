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
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
    </>
  )
}

export default AdminMenu
