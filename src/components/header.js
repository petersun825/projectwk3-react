import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Button, FormControl, Input, InputLabel, Toolbar, Typography, withStyles} from "material-ui";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    input : {
        color : '#fffcf6'
    }
};

function Header(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        NYC Open data
                    </Typography>
                    <FormControl>
                        <InputLabel htmlFor="rows-input" className={classes.input}>Quantity of rows</InputLabel>
                        <Input id="rows-input" className={classes.input} defaultValue={120} onChange={props.handleLimit}/>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(Header);