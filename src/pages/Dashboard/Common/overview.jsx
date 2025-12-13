import AdminOverview from "../../../components/Dashboard/Statistics/AdminOverview"
import CustomerOverview from "../../../components/Dashboard/Statistics/CustomerOverview"
import DecoratorOverview from "../../../components/Dashboard/Statistics/DecoratorOverview"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const Statistics = () => {
  const { role, iseRoleLoading } = useRole();
  if(iseRoleLoading) <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      {role === 'customer' && <CustomerOverview></CustomerOverview>}
      {role === 'decorator' && <DecoratorOverview></DecoratorOverview>}
      {role === 'admin' && <AdminOverview></AdminOverview>}
    </div>
  )
}

export default Statistics
