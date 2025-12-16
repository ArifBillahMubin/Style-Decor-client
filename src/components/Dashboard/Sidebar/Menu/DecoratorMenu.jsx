import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
const DecoratorMenu = () => {
  return (
    <>
      <MenuItem icon={MdAssignmentTurnedIn} label='My Assigned Project' address='my-assigned-projects' />
      <MenuItem icon={FaRegCalendarCheck} label='Today Schedule' address='today-schedule' />
      <MenuItem icon={FaMoneyCheckAlt} label='Earning Summary' address='decorator-earnings' />
    </>
  )
}

export default DecoratorMenu
