import React from "react"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import Profile from "../Profile/Profile.js";

export const SidebarData = [

{
    title: "Profile",
    icon: <AiIcons.AiFillHome />,
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
    icon: <RiIcons.RiSettings4Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
        {
            title: "Change Password",
            path: "Change",
            icon: <IoIcons.IoIosPaper />,
        },
        {
            title: "Change Username",
            path: "/Change",
            icon: <IoIcons.IoIosPaper />,
        },

        {
            title: "Delete Account",
            path: "/Change",
            icon: <IoIcons.IoIosPaper />,
        },
        
        
    ],
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
