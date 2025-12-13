import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageDecorators'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/overview'
import MainLayout from '../layouts/MainLayout'
import ManageOrders from '../pages/Dashboard/Decorator/MyAssigendProject'
import { createBrowserRouter } from 'react-router'
import ManageServices from '../pages/Dashboard/Admin/ManageServices'
import ServicesPage from '../pages/Services/ServicesPage'
import ServiceDetailsPage from '../pages/Services/ServiceDetailsPage'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import MyBookings from '../pages/Dashboard/Customer/MyBookings'
import PaymentHistoryPage from '../pages/Dashboard/Customer/PaymentHistoryPage'
import ManageDecorators from '../pages/Dashboard/Admin/ManageDecorators'
import ManageBookings from '../pages/Dashboard/Admin/ManageBookings'
import RevenueMonitoring from '../pages/Dashboard/Admin/RevenueMonitoring'
import MyAssigendProject from '../pages/Dashboard/Decorator/MyAssigendProject'
import TodaySchedule from '../pages/Dashboard/Decorator/TodaySchedule'
import DecoratorEarnings from '../pages/Dashboard/Decorator/DecoratorEarnings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/services',
        element: <ServicesPage></ServicesPage>

      },
      {
        path: '/services/:id',
        element: <ServiceDetailsPage></ServiceDetailsPage>,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-services',//admin
        element: (
          <PrivateRoute>
            <ManageServices></ManageServices>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-assigned-projects', //decorator
        element: (
          <PrivateRoute>
            <MyAssigendProject></MyAssigendProject>
          </PrivateRoute>
        ),
      },
      {
        path: 'today-schedule', //decorator
        element: (
          <PrivateRoute>
            <TodaySchedule></TodaySchedule>
          </PrivateRoute>
        ),
      },
      {
        path: 'decorator-earnings', //decorator
        element: (
          <PrivateRoute>
            <DecoratorEarnings></DecoratorEarnings>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-Decorators',//admin 
        element: (
          <PrivateRoute>
            <ManageDecorators></ManageDecorators>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-Bookings',//admin 
        element: (
          <PrivateRoute>
            <ManageBookings></ManageBookings>
          </PrivateRoute>
        ),
      },
      {
        path: 'revenue-monitoring',//admin 
        element: (
          <PrivateRoute>
            <RevenueMonitoring></RevenueMonitoring>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-Bookings', //customer
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path:'payment-history', //customer
        element:<PaymentHistoryPage></PaymentHistoryPage>
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
