import React, {Component} from 'react'
import Header from './header'
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "material-ui";
import {HOST} from "../configs/config";
import axios from "axios";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1.5,
        overflowX: 'auto',
    }
});

class TableComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            limit: 120,
            showingSaved: false, 
        };

        this.handleLimit = this.handleLimit.bind(this);
        this.handleViewUsers = this.handleViewUsers.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$limit=${this.state.limit}`)
            .then(response => response.json())
            .then(data => {
                this.setState({data});
            })
            .catch(error => {
                alert('Can not load data ' + error.status)
            });
    }

    handleLimit(e) {
        e.preventDefault();
        this.setState({limit: e.target.value});
        setTimeout(() => {
            this.getData()
        }, 700);
    }

    handleSaveBtnClick = async (newCity, Id) => {
        try {
            fetch.path('/city/${id}', newCity);
            console.log("after .patch statement");
        } catch (error) {
            console.log("trouble retriving information");
            console.log(error);
        }
    }
    // handleSaveBtnClick(data) {
    //     fetch(`${HOST}`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     }).then(result => {
    //         console.log('SAVED');
    //     });
    // }

    handleRemoveBtnClick(id) {
        fetch(`${HOST}${id}`, {
            method: 'DELETE'
        }).then(result => {
            if (result.status === 200) {
                let temp = this.state.data;
                var indexOf = temp.indexOf(this.state.data.find(k => k.id === id));
                temp.splice(indexOf,1);
                this.setState({data: temp});
            }
        }).catch(error => {
            console.log(error, ' ERROR ');
        })
    }


    handleViewUsers() {
        let {showingSaved} = this.state;
        if (!showingSaved) {
            fetch(HOST)
                .then(response => response.json())
                .then(data => {
                    this.setState({data: data, showingSaved: !this.state.showingSaved})
                })
                .catch(error => {
                    alert('Can not load data ' + error.status)
                });
        } else {
            fetch(`https://randomuser.me/api/?inc=id,name,login&results=${this.state.limit}&nat=us`)
                .then(response => response.json())
                .then(data => {
                    this.setState({data: data.results, showingSaved: !this.state.showingSaved});
                })
                .catch(error => {
                    alert('Can not load data ' + error.status)
                });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header handleLimit={this.handleLimit.bind(this)}
                        handleViewUsers={this.handleViewUsers.bind(this)}/>
                <Paper className={classes.root}>
             
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Section</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Agency Name</TableCell>
                                <TableCell>TItle</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                    
                            <TableBody>
                                {this.state.data.map((k, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{k.section_name}</TableCell>
                                            <TableCell>{k.request_id}</TableCell>
                                            <TableCell>{k.agency_name}</TableCell>
                                            <TableCell>{k.short_title}</TableCell>
                                            <TableCell>{k.start_date}</TableCell>
                                            <TableCell>
                                                <Button color="primary" variant="raised"
                                                        onClick={() => this.handleSaveBtnClick({
                                                            title: k.short_title,
                                                            agency: k.agency_name,
                                                            request_id: k.request_id,
                                                            sectionName: k.section_name,
                                                            start: k.start_date,
                                                        })}>Save</Button>
                                            </TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                            :
                            <TableBody>
                                {this.state.data.map((k, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{k.section_name}</TableCell>
                                            <TableCell>{k.request_id}</TableCell>
                                            <TableCell>{k.agency_name}</TableCell>
                                            <TableCell>{k.shot_title}</TableCell>
                                            <TableCell>{k.start_date}</TableCell>
                                            <TableCell>
                                                <Button color="secondary" variant="raised"
                                                        onClick={() => this.handleRemoveBtnClick(k.id)}>REMOVE</Button>
                                            </TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>}
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(TableComponent)