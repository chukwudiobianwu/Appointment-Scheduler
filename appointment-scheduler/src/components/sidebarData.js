import React from "react"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [

{
    title: "Profile",
    icon: <RiIcons.RiAccountCircleLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
        {
            title: "User Information",
            path: "/profile",
            icon: <IoIcons.IoIosPaper />,
        },
    ],
},
    
{
    title: "Upcoming Appointments",
    path: "/UAppointments",
    icon: <RiIcons.RiTimeLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
},

{
    title: "Settings",
    path: "/Settings",
    icon: <RiIcons.RiSettings4Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
},

{
    title: "Contact",
    path: "/contact",
    icon: <FaIcons.FaPhone />,
},

{
    title: "Log Out",
    icon: <RiIcons.RiLogoutBoxLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
},
];
