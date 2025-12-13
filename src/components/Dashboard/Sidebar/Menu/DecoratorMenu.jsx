import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const DecoratorMenu = () => {
  return (
    <>
      <MenuItem icon={MdHomeWork} label='My Assigend Project' address='my-assigned-projects' />
      <MenuItem icon={MdHomeWork} label='Today Schedule' address='today-schedule' />
      <MenuItem icon={MdHomeWork} label='Earning Summary' address='decorator-earnings' />
    </>
  )
}

export default DecoratorMenu
