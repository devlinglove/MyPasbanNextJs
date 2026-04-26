'use client'
import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "./sidebar";


const NavItemLink = ({ link, name, }: { link: string | null | undefined, name: string }) => {

    if (link) {
        return (
            <Link href={link}>
                <ListItemText>{name}</ListItemText>
            </Link>
        )
    }

    return (
        <ListItemText>{name}</ListItemText>
    )
}

const PasListItem = ({ nav }: { nav: MenuItem }) => {
    const pathname = usePathname();

    const isChildActive = (item: MenuItem): boolean => {
        if (item.link === pathname) return true;
        if (item.children?.length) return item.children.some(isChildActive);
        return false;
    };

    const [menuExpanded, setMenuExpanded] = useState<Record<string, boolean>>(() => {
        const expanded: Record<string, boolean> = {};
        if (isChildActive(nav)) {
            expanded[nav.menuId] = true;
        }
        return expanded;
    });

    const hasChildren = nav.children && nav.children.length > 0;

    if (!hasChildren) {
        return (
            <ListItemButton key={nav.menuId}
               selected={pathname === nav.link}
            >
                <ListItemIcon><Icon icon={nav.icon} /></ListItemIcon>
                <NavItemLink link={nav.link} name={nav.menuName} />
            </ListItemButton>
        );
    }

    const handleClick = (item: string | number) => {
        //setMenuExpanded(prev => prev === id ? null : id);
        setMenuExpanded(prev => ({ ...prev, [item]: !prev[item] }));
    }

    return (
        <>
            <ListItemButton
                onClick={() => handleClick(nav.menuId)} key={nav.menuId}
                selected={pathname === nav.link}
            >
                <ListItemIcon>
                    <Icon icon={nav.icon} />
                </ListItemIcon>
                {/* <NavItemLink link={nav.link} name={nav.menuName} /> */}
                <ListItemText>{nav.menuName}</ListItemText>
                <Icon icon={menuExpanded[nav.menuId] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemButton>
            <Collapse
                //in={menuExpanded === nav.menuId}
                in={!!menuExpanded[nav.menuId]}
                timeout="auto"
                unmountOnExit
            >
                {nav.children.map((child: MenuItem) => (
                    <Box key={child.menuId} sx={{ pl: 1 }}>
                        <PasListItem nav={child} key={child.menuId} />
                    </Box>
                ))}
            </Collapse>
        </>
    );
}

export default PasListItem