import React, {Component} from 'react'
import Header from './header'
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "material-ui";
import {HOST} from "../configs/config";
import axios from "axios";
// import City from '/city'

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
                this.setState({ data, showingSaved: false});
            })
            .catch(error => {
                alert('Can not load data ' + error.status)
            });
    }
    async componentWillMount(){
        try {
            const response = await axios.get('/city')
            this.setState({city:response.data})
        } catch (error){
            console.log('Error retrieving city!')
            console.log(error)
        }
    }

    handleLimit(e) {
        e.preventDefault();
        this.setState({limit: e.target.value});
        setTimeout(() => {
            this.getData()
        }, 700);
    }

    handleSaveBtnClick = async (record) => {
        try {
            const newCityResponse = await axios.post('/city', record)
            console.log(newCityResponse);
            const updatedCityList = [...this.state.city]
            updatedCityList.push(newCityResponse.data)
            this.setState({city: updatedCityList})
        } catch (error) {
            console.log("trouble retriving information");
            console.log(error);
        }
    }

    handleRemoveBtnClick(id) {
         axios.get(`/city/${id}`, {
        method: 'DELETE'
        }).then(result => {
            if (result.status === 200) {
                let temp = this.state.data;
                var indexOf = temp.indexOf(this.state.data.find(k => k.id === id));
                temp.splice(indexOf,1);
                this.setState({city: temp});
            }
        }).catch(error => {
            console.log(error, ' ERROR ');
        })
    }


    handleViewUsers() {
        let { showingSaved } = this.state;
        if (!showingSaved) {
            axios.get('/switch').then(response => {
                this.setState({data: response.data, showingSaved: !this.state.showingSaved})
                console.log(response)
            
            }).catch(error => {
                    console.log(error)
                    alert('Can not load data ' + error.status)
                });   
        } else { this.getData()}
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
                                                            short_title: k.short_title,
                                                            agency_name: k.agency_name,
                                                            request_id: k.request_id,
                                                            section_name: k.section_name
                                    
                                                        })}>Save</Button>
                                            <Button color="secondary" variant="raised"
                                                        onClick={() => this.handleRemoveBtnClick(
                                                            k.id
                                                        )}>Delete</Button>
                                            </TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                            {/* :
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
                            </TableBody>} */}
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(TableComponent)