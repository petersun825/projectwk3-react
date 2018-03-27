import React, {Component} from 'react'
import Header from './header'
import PropTypes from 'prop-types';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "material-ui";

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
            save: false,
            itemSaved: 'Not Saved',
            saveColumn: []
           
        };

        this.handleLimit = this.handleLimit.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(`https://data.cityofnewyork.us/resource/buex-bi6w.json?$limit=${this.state.limit}`)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data});
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

    toggleEditSave = () => {
        // saveColumn.id = data.request_id;
        // var joined = this.state.saveColumn.concat();
        // this.setState({ saveColumn: joined })
        const save = !this.state.save;
        this.setState({save});
      };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header handleLimit={this.handleLimit.bind(this)}/>
                <Paper className={classes.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Short title</TableCell>
                                <TableCell>Agency Name</TableCell>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Section Name</TableCell>
                                <TableCell>Start date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((k, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{k.short_title} </TableCell>
                                        <TableCell>{k.agency_name}</TableCell>
                                        <TableCell>{k.request_id} </TableCell>
                                        <TableCell>{k.section_name}</TableCell>
                                        <TableCell>{k.start_date}</TableCell>
                                        <TableCell> <span>{this.state.itemSaved}</span>
                                                    <button variant="raised" color = "primary" onClick={this.toggleEditSave}>
                                                    { this.state.save ? 'Saved' : 'Save'} </button> 

                                        </TableCell>
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(TableComponent)