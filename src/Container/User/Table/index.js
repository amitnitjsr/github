import React from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
import './Table.css';
import Axios from 'axios';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchText: '',
            searchData: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        Axios.get('https://api.github.com/users')
            .then((response) => {
                this.props.setUserData({ allData: response.data });
            })
            .catch((error) => {
                console.log('Error', error)
            })
    }

    searchHandler = (value) => {
        this.setState({ searchText: value }, () => {
            Axios.get('https://api.github.com/users/' + this.state.searchText)
                .then((response) => {
                    console.log('res', response)
                    // this.props.setUserData({ allData: response.data });
                    let t = [];
                    t.push(response.data);
                    console.log("t", t)
                    this.setState({ searchData: t });
                })
                .catch((error) => {
                    console.log('Error', error)
                })
        })
    }

    render() {
        const { list } = this.props;
        return (
            <div>
                <Navbar />
                <div style={{ padding: '5%' }}>
                    <input type="search" value={this.state.searchText}
                        className="inputstyle" placeholder="search..."
                        onChange={(event) => this.searchHandler(event.target.value)} />


                    {this.state.searchData && this.state.searchData.length > 0 ?
                        <div>
                            <label style={{ position: "relative", left: '2%' }}>Search results</label>
                            <ReactTable
                                data={this.state.searchData ? this.state.searchData : []}
                                columns={[
                                    {
                                        Header: () => <div className="ID">S. No.</div>,
                                        accessor: 'id',
                                        className: 'text-center',
                                        sortable: false,
                                        filterable: false,
                                        foldable: true,
                                        width: 75
                                    },
                                    {
                                        Header: () => <div className="Header" >User Name</div>,
                                        accessor: 'name',
                                        className: 'text-center',
                                        foldable: true
                                    },
                                    {
                                        Header: () => <div className="Header" >Avatar</div>,
                                        accessor: 'email',
                                        foldable: true,
                                        className: 'text-center',
                                        Cell: (row) => {
                                            return (
                                                <span className="action">
                                                    <img src={row.row._original.avatar_url} style={{ width: '45px' }} alt="no_img" />
                                                </span>
                                            );
                                        }
                                    },
                                    {
                                        Header: () => <div className="Header" >Followers</div>,
                                        accessor: 'followers',
                                        foldable: true,
                                        className: 'text-center',
                                    },
                                    {
                                        Header: () => <div className="Header" >Following</div>,
                                        accessor: 'following',
                                        foldable: true,
                                        className: 'text-center',
                                    },
                                    {
                                        Header: () => <div className="Header" >Star</div>,
                                        accessor: 'phone',
                                        foldable: true,
                                        className: 'text-center',
                                    },

                                ]}
                                pageSize={this.state.searchData && this.state.searchData.length > 0 ? this.state.searchData.length : 0}
                                showPaginationBottom={false}
                            />

                        </div>
                        : ""}
                    <br />
                    <label style={{ position: "relative", left: '2%' }}>User List</label>
                    <ReactTable
                        data={list ? list : []}
                        columns={[
                            {
                                Header: () => <div className="ID">S. No.</div>,
                                accessor: 'id',
                                className: 'text-center',
                                sortable: false,
                                filterable: false,
                                foldable: true,
                                width: 75
                            },
                            {
                                Header: () => <div className="Header" >User Name</div>,
                                accessor: 'login',
                                className: 'text-center',
                                foldable: true
                            },
                            {
                                Header: () => <div className="Header" >Avatar</div>,
                                accessor: 'email',
                                foldable: true,
                                className: 'text-center',
                                Cell: (row) => {
                                    return (
                                        <span className="action">
                                            <img src={row.row._original.avatar_url} style={{ width: '45px' }} alt="no_img" />
                                        </span>
                                    );
                                }
                            },
                            {
                                Header: () => <div className="Header" >Followers</div>,
                                accessor: 'phone',
                                foldable: true,
                                className: 'text-center',
                            },
                            {
                                Header: () => <div className="Header" >Star</div>,
                                accessor: 'phone',
                                foldable: true,
                                className: 'text-center',
                            },
                        ]}
                        pageSize={list && list.length > 0 ? list.length : 0}
                        showPaginationBottom={false}
                    />
                </div >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("table", state.user.userDetails, state.user)
    return {
        list: state.user.userDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))