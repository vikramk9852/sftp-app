import React from 'react';
import { Button, Table } from 'antd';
import moment from 'moment';
import Loader from '../../components/Loader';

class ListDir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlStack: [],
            dataSource: []
        };
        this.columns = [
            {
                title: "File Name",
                dataIndex: "filename"
            },
            {
                title: "Last Accessed",
                dataIndex: "lastAccessed"
            },
            {
                title: "Last Modified",
                dataIndex: "lastModified"
            }
        ]
    }
    componentDidMount() {
        this.fetchData("home");
    }

    fetchData = (filePath) => {
        let urlStack = this.state.urlStack;
        urlStack.push(filePath);
        this.setState({ showLoader: true }, () => {
            return fetch(`/api/listdir/${urlStack}`).then(res => {
                console.log(res);
                return res.text();
            }).then(res => {
                let dataSource = [];
                res = JSON.parse(res);
                for (let index in res) {
                    console.log(res[index])
                    dataSource.push({
                        key: index,
                        filename: res[index].filename,
                        lastAccessed: moment(res[index].attrs.atime).unix("DD-MM-YYYY"),
                        lastModified: moment(res[index].attrs.mtime).unix("DD-MM-YYYY"),
                    })
                }
                this.setState({ dataSource, urlStack: urlStack, showLoader: false });
            }).catch(err => {
                console.error(err);
            })
        })
    }

    handleRowClick = (row) => {
        this.fetchData(row.filename);
    }

    render() {
        return (
            <>
                {this.state.showLoader && <Loader />}
                {this.state.dataSource.length > 0 &&
                    < Table
                        columns={this.columns}
                        onRowClick={this.handleRowClick}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                }
            </>
        )
    }
}

export default ListDir;