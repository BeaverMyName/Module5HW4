import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import IResponse from './DTO/Response';

const url = "https://reqres.in/api/users";

interface IEmployee {
    id: number | undefined,
    name: string | undefined,
    job: string | undefined,
    createdAt: number | undefined,
    updatedAt: number | undefined
}

interface IUser {
    id: number | undefined,
    email: string | undefined,
    first_name: string | undefined,
    last_name: string | undefined,
    avatar: string | undefined
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

const UserCardComponent = (props: IUser) => {
    return  <Card as="li" key={props?.id}>
                <Card.Body>
                    <Card.Title>{props?.email}</Card.Title>
                    <Card.Text>{props?.first_name} {props?.last_name}</Card.Text>
                </Card.Body>
            </Card>
}

const EmployeeCardComponent = (props: IEmployee) => {
    return  <Card as="li" key={props?.id}>
                <Card.Body>
                    <Card.Title>{props?.name}</Card.Title>
                    <Card.Text>{props?.job} {props?.updatedAt} {props?.createdAt}</Card.Text>
                </Card.Body>
            </Card>
}

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
                    <UserCardComponent id={item.id} first_name={item.first_name} last_name={item.last_name} email={item.email} avatar={item.avatar}/>
                ))}
                <UserCardComponent id={user?.data.id} first_name={user?.data.first_name} last_name={user?.data.last_name} email={user?.data.email} avatar={user?.data.avatar}/>
                <EmployeeCardComponent id={createdUser?.id} name={createdUser?.name} job={createdUser?.job} createdAt={createdUser?.createdAt} updatedAt={createdUser?.updatedAt}/>
                <EmployeeCardComponent id={updatedUser?.id} name={updatedUser?.name} job={updatedUser?.job} createdAt={updatedUser?.createdAt} updatedAt={updatedUser?.updatedAt}/>
                <EmployeeCardComponent id={modifiedUser?.id} name={modifiedUser?.name} job={modifiedUser?.job} createdAt={modifiedUser?.createdAt} updatedAt={modifiedUser?.updatedAt}/>
                {delayedUserList?.data.map(item => (
                    <UserCardComponent id={item.id} first_name={item.first_name} last_name={item.last_name} email={item.email} avatar={item.avatar}/>
                ))}
            </>);
}

export default UserComponent;