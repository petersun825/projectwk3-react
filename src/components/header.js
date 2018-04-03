import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Button, FormControl, Input, InputLabel, Toolbar, Typography, withStyles} from "material-ui";
import axios from "axios";

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

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingSaved: false
        }
    }

    switchView() {
        this.props.handleViewUsers();
        this.setState({showingSaved : !this.state.showingSaved})
    }

    render() {
        // const {classes} = this.props;
        return (
            <div className={this.props.classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                            NYC Open data
                        </Typography>
                        <FormControl>
                            <InputLabel htmlFor="rows-input" className={this.props.classes.input}>Quantity of rows</InputLabel>
                            <Input id="rows-input" className={this.props.classes.input} defaultValue={120} onChange={this.props.handleLimit}/>
                        </FormControl>
                        {!this.state.showingSaved ?
                            <Button color="secondary" variant="raised" size={'medium'} onClick={() => this.switchView()}>
                                SHOW SAVED
                            </Button> :
                            <Button color="secondary" variant="raised" size={'medium'} onClick={() => this.switchView()}>
                                BACK
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);