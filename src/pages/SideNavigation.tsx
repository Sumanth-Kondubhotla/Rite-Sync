import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { List } from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardIcon from "../Icons/DashboardIcon";
import ConnectionsIcon from "../Icons/ConnectionsIcon";
import InstancesIcon from "../Icons/InstancesIcon";

const StyledListItem = styled(ListItemButton)(({ theme, selected }) => ({
  borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : "none",
  backgroundColor: selected ? theme.palette.action.selected : "transparent",
}));

const NAVIGATION_LIST = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Connections",
    icon: <ConnectionsIcon />,
  },
  {
    label: "Instances",
    icon: <InstancesIcon />,
  },
  {
    label: "Module Selector",
    icon: <MailIcon />,
  },
  {
    label: "Module Overview",
    icon: <InboxIcon />,
  },
  {
    label: "Users",
    icon: <MailIcon />,
  },
];

const SideNavigation = ({ open }: { open: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <List>
      {NAVIGATION_LIST.map(({ label, icon }, index) => (
        <ListItem key={label} disablePadding sx={{ display: "block" }}>
          <StyledListItem
            selected={
              !!selectedItem
                .toLocaleLowerCase()
                .includes(label.toLocaleLowerCase())
            }
            onClick={() => {
              navigate(label.toLocaleLowerCase());
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            {/* {!!selectedItem
              .toLocaleLowerCase()
              .includes(label.toLocaleLowerCase()) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )} */}
          </StyledListItem>
        </ListItem>
      ))}
    </List>
  );
};

export default SideNavigation;
