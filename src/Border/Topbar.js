import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Badge, Popover} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        padding: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    popover: {
        pointerEvents: 'none',
    },
}));

export default function Topbar(props) {
    const {sidebarToggle} = props;
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorName, setAnchorName] = React.useState("");

    const handlePopoverOpen = (event, name) => {
        setAnchorName(name);
        setAnchorEl(event.currentTarget);

    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <div style={{width: "100%"}}>
                <Box display="flex"
                     justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <IconButton
                            onClick={sidebarToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    <Box>
                        <IconButton onMouseEnter={(e) => handlePopoverOpen(e, "通知")}
                                    onMouseLeave={handlePopoverClose} aria-label={"notification"}>
                            <Badge badgeContent={"2"} overlap={"circle"} color={"secondary"}>
                                <NotificationsIcon fontSize={"large"}/>
                            </Badge>
                        </IconButton>
                        <IconButton onMouseEnter={(e) => handlePopoverOpen(e, "登录")}
                                    onMouseLeave={handlePopoverClose} aria-label={"account"}
                                    component={Link} to={"/login"}>
                            <AccountCircleIcon fontSize={"large"}/>
                        </IconButton>

                    </Box>
                </Box>
            </div>
        </Toolbar>
        <Popover
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            {anchorName}
        </Popover>
    </AppBar>);
}