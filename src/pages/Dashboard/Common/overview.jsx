import AdminOverview from "../../../components/Dashboard/Statistics/AdminOverview"
import CustomerOverview from "../../../components/Dashboard/Statistics/CustomerOverview"
import DecoratorOverview from "../../../components/Dashboard/Statistics/DecoratorOverview"

const Statistics = () => {
  return (
    <div>
      <AdminOverview></AdminOverview>
      <CustomerOverview></CustomerOverview>
      <DecoratorOverview></DecoratorOverview>
    </div>
  )
}

export default Statistics
