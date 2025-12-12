import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageDecorators'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import { createBrowserRouter } from 'react-router'
import ManageServices from '../pages/Dashboard/Admin/ManageServices'
import ServicesPage from '../pages/Services/ServicesPage'
import ServiceDetailsPage from '../pages/Services/ServiceDetailsPage'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import MyBookings from '../pages/Dashboard/Customer/MyBookings'
import PaymentHistoryPage from '../pages/Dashboard/Customer/PaymentHistoryPage'
import ManageDecorators from '../pages/Dashboard/Admin/ManageDecorators'

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
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-Decorators',//admin updated working conver manage services
        element: (
          <PrivateRoute>
            <ManageDecorators></ManageDecorators>
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
