import { CiSettings, CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import HostDetails from "../pages/Main/Host/HostDetails";
import { FaServicestack } from "react-icons/fa6";
import Setting from "../pages/Main/Setting/Setting";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import { IoSettingsOutline } from "react-icons/io5";
import {  BookOpen } from "lucide-react";
import Books from "../pages/Main/Parties/Books";
import Notifications from "../pages/Main/Notifications/Notifications";
import UsersList from "../pages/Main/Transaction/UsersList";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "Users",
    path: "users",
    icon: CiUser,
    element: <UsersList />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },

  {
    name: "Books",
    path: "books",
    icon: BookOpen,
    element: <Books />,
  },
  // {
  //   name: "Transaction",
  //   path: "transaction",
  //   icon: BadgePoundSterling,
  //   element: <TransactionHome />,
  // },

  {
    name: "Setting",
    path: "settings",
    icon: IoSettingsOutline,
    element: <Setting />,
  },
  {
    path: "/hosts/:id",
    element: <HostDetails />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: <ChangePassword />,
      },
      {
        path: "settings/change-password/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: <VerifyEmail />,
      },
      // {
      //   name: "Terms & Condition",
      //   icon: FaServicestack,
      //   path: "settings/terms-conditions",
      //   element: <TermsConditions />,
      // },
      // {
      //   path: "settings/terms-conditions/edit",
      //   element: <EditTermsConditions />,
      // },
      // {
      //   name: "Privacy Policy",
      //   icon: MdOutlineSecurityUpdateWarning,
      //   path: "settings/privacy-policy",
      //   element: <PrivacyPolicy />,
      // },
      // {
      //   path: "settings/privacy-policy/edit",
      //   element: <EditPrivacyPolicy />,
      // },
      // {
      //   name: "Trust & Safety",
      //   icon: BiMessageSquareDetail,
      //   path: "settings/trust-safety",
      //   element: <Trust />,
      // },
      // {
      //   path: "settings/trust-safety/edit",
      //   element: <EditTrust />,
      // },
    ],
  },
];
