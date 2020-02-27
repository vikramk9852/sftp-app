import React from 'react';
// import { withRouter } from 'react-router';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Loader from '../components/Loader';
import Header from '../components/Header';
import HomePage from '../containers/HomePage';
import './index.scss';

const { Content } = Layout;

class AppRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <Layout className="layout">
                <Layout>
                    {
                        this.state.showLoader ?
                            <Loader />
                            :
                            <Content className="ui-container">
                                <div style={{ marginBottom: this.state.showHeader ? "7em" : "2em" }}>
                                    {this.state.showHeader && <Header handleClick={this.handleClick} />}
                                </div>
                                <Switch>
                                    <Route exact path='/' component={HomePage} />
                                </Switch >
                            </Content>
                    }
                </Layout>
            </Layout>
        );
    }

}

export default withRouter(AppRouter);

