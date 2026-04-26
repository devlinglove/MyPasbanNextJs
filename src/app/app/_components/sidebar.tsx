'use client'

import { Box, Collapse, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PasListItem from "./pas-menu-Item";
import { useLogout } from "@/lib/auth";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { paths } from "@/config/paths";
//import DraftsIcon from '@mui/icons-material/Drafts';

export interface MenuItem {
    menuId: number;
    menuName: string;
    link?: string | null;
    icon: string;
    parentId?: number | null;
    children: MenuItem[];
}

export default function Sidebar() {

    const [navigations, setNavigations] = useState<MenuItem[]>([])
    //const [menuExpanded, setMenuExpanded] = useState({})
    const [menuExpanded, setMenuExpanded] = useState<Record<string, boolean>>({});
    const router = useRouter()
    const pathname = usePathname()
    const logout = useLogout({
        onSuccess: () => router.push(paths.auth.login.getHref(pathname)),
    });

    async function getData() {
        try {
            const response = await fetch('http://localhost:5161/api/UserManagement/user-menus-by-role', {
                credentials: 'include'
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setNavigations(data)

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    const handleClick = (item: string | number) => {
        //setMenuExpanded(prev => prev === id ? null : id);
        setMenuExpanded(prev => ({ ...prev, [item]: !prev[item] }));
    }

    const handleNavigation = (nav: MenuItem) => {
        const hasChildren = nav.children && nav.children.length > 0;

        if (!hasChildren) {
            return (
                <ListItem key={nav.menuId}>
                    <ListItemIcon><Icon icon={nav.icon} /></ListItemIcon>
                    <ListItemText primary={nav.menuName} />
                </ListItem>
            );
        }

        return (
            <>
                <ListItemButton onClick={() => handleClick(nav.menuId)} key={nav.menuId}>
                    <ListItemIcon>
                        <Icon icon={nav.icon} />
                    </ListItemIcon>
                    <ListItemText primary={nav.menuName} />
                    <Icon icon={menuExpanded[nav.menuId] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
                </ListItemButton>

                <Collapse
                    //in={menuExpanded === nav.menuId}
                    in={!!menuExpanded[nav.menuId]}
                    timeout="auto"
                    unmountOnExit
                >
                    {nav.children.map((child: any) => (
                        <Box key={child.menuId} sx={{ pl: 2 }}>
                            {handleNavigation(child)}
                        </Box>
                    ))}
                </Collapse>
            </>
        );
    };

    console.log('ssss', navigations)

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            

            <Drawer
                variant="persistent"
                open={true}
            >
                <h1>Dashboard</h1>
                <List sx={{ width: 250 }}>
                    {navigations.map((item: MenuItem) => (
                        // <>
                        //   {handleNavigation(item)}
                        // </>
                        <PasListItem nav={item} key={item.menuId} />
                    ))}
                </List>
                <button onClick={() => logout.mutate()}>Logout</button>
            </Drawer>

            

        </>


    );
}
