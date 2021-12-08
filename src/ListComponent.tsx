import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface IListProps {
    children: React.ReactNode;
}

const ListComponent = (props: IListProps) => {
    return <ListGroup>
                {props.children}
            </ListGroup>
}

export default ListComponent;