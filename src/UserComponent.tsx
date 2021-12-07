import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import IResponse from './DTO/Response';

const url = "https://reqres.in/api/users";

interface IEmployee {
    id: number,
    name: string,
    job: string,
    createdAt: number
    updatedAt: number
}

interface IUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

const getUserList = async (page: number) : Promise<IResponse<IUser[]>> => {
    const response = await fetch(`${url}?page=${page}`);
    return await response.json();
}

const getDelayedUserList = async (delay: number) : Promise<IResponse<IUser[]>> => {
    const response = await fetch(`${url}?delay=${delay}`);
    return await response.json();
}

const getUser = async (id: number) : Promise<IResponse<IUser>> => {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
}

const postUser = async (name: string, job: string) : Promise<IEmployee> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, job: job })
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
}

const updateUser = async (id: number, name: string, job: string) : Promise<IEmployee> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, job: job})
    }
    const response = await fetch(`${url}/${id}`, requestOptions);
    return await response.json();
}

const modifyUser = async (id: number, name: string, job: string) : Promise<IEmployee> => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, job: job})
    }
    const response = await fetch(`${url}/${id}`, requestOptions);
    return await response.json();
}

// const deleteUser = async (id: number) : Promise<void> => {
//     const response = await fetch(`${url}/${id}`, {method: 'DELETE'});
//     return await response.json();
// }

const UserComponent = () => {

    const [userList, setUserList] = React.useState<IResponse<IUser[]> | null>(null);
    const [user, setUser] = React.useState<IResponse<IUser> | null>(null);
    const [createdUser, setCreatedUser] = React.useState<IEmployee | null>(null);
    const [updatedUser, setUpdatedUser] = React.useState<IEmployee | null>(null);
    const [modifiedUser, setModifiedUser] = React.useState<IEmployee | null>(null);
    const [delayedUserList, setDelayedUserList] = React.useState<IResponse<IUser[]> | null>(null);

    useEffect(() => {
        async function init() {
            const userList = await getUserList(2);
            setUserList(userList);
            const user = await getUser(2);
            setUser(user);
            const createdUser = await postUser("morpheus", "leader");
            setCreatedUser(createdUser);
            const updatedUser = await updateUser(2, "morpheus", "zion resident");
            setUpdatedUser(updatedUser);
            const modifiedUser = await modifyUser(2, "morpheus", "zion resident");
            setModifiedUser(modifiedUser);
            const delayedUserList = await getDelayedUserList(3);
            setDelayedUserList(delayedUserList);
        }

        init();
    }, []);

    return (<>
                {userList?.data.map(item => (
                    <Card as="li" key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.email}</Card.Title>
                            <Card.Text>{item.first_name} {item.last_name}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <Card as="li" key={user?.data.id}>
                    <Card.Body>
                        <Card.Title>{user?.data.email}</Card.Title>
                        <Card.Text>{user?.data.first_name} {user?.data.last_name}</Card.Text>
                     </Card.Body>
                </Card>
                <Card as="li" key={createdUser?.id}>
                    <Card.Body>
                        <Card.Title>{createdUser?.name}</Card.Title>
                        <Card.Text>{createdUser?.job} {createdUser?.createdAt}</Card.Text>
                    </Card.Body>
                </Card>
                <Card as="li" key={updatedUser?.id}>
                    <Card.Body>
                        <Card.Title>{updatedUser?.name}</Card.Title>
                        <Card.Text>{updatedUser?.job} {updatedUser?.updatedAt}</Card.Text>
                    </Card.Body>
                </Card>
                <Card as="li" key={modifiedUser?.id}>
                    <Card.Body>
                        <Card.Title>{modifiedUser?.name}</Card.Title>
                        <Card.Text>{modifiedUser?.job} {modifiedUser?.updatedAt}</Card.Text>
                    </Card.Body>
                </Card>
                {delayedUserList?.data.map(item => (
                    <Card as="li" key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.email}</Card.Title>
                            <Card.Text>{item.first_name} {item.last_name}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </>);
}

export default UserComponent;