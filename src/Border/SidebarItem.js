import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {makeStyles} from "@material-ui/core/styles";
import {Hidden, Popover} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {Link, useRouteMatch} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    listItem: {
        [theme.breakpoints.up("md")]: {
            paddingTop: 0,
            paddingBottom: 0
        },
    },
    icon: {
        [theme.breakpoints.up("md")]: {
            fontSize: 83,
        },
    }
}));


export default function SidebarItem(props) {
    const {name, to, sidebarToggle} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const iconDesktop = React.cloneElement(props.children, {className: classes.icon});

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (<div>
            <ListItem button disableGutters={isDesktop} className={classes.listItem}
                      onClick={isDesktop? null: sidebarToggle}
                      component={Link} to={to}
                      selected={useRouteMatch({path: to, exact: to === "/"})}>
                <Hidden smDown>
                    <Button onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}>{iconDesktop}</Button>
                </Hidden>
                <Hidden mdUp>
                    <ListItemIcon style={{minWidth: "40px"}}>{props.children}</ListItemIcon>
                    <ListItemText primary={name}/>
                </Hidden>
            </ListItem>
            <Popover
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {name}
            </Popover>
        </div>


    );
}