import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import UserComponent from './UserComponent';
import ResourceComponent from './ResourceComponent';
import AuthComponent from './AuthComponent';

const ListComponent = () => {
    return <ListGroup>
                <h2>User component</h2>
                <UserComponent/>
                <h2>Resource component</h2>
                <ResourceComponent/>
                <h2>Auth component</h2>
                <AuthComponent/>
            </ListGroup>
}

export default ListComponent;