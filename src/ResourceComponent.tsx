import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import IResponse from './DTO/Response';

const url = "https://reqres.in/api/unknown";

interface IResource {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string
}

const getResourceList = async () : Promise<IResponse<IResource[]>> => {
    const response = await fetch(url);
    return await response.json();
}

const getResource = async (id: number) : Promise<IResponse<IResource>> => {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
}

const ResourceComponent = () => {

    const [resourceList, setUserList] = React.useState<IResponse<IResource[]> | null>(null);
    const [resource, setUser] = React.useState<IResponse<IResource> | null>(null);

    useEffect(() => {
        async function init() {
            const resourceList = await getResourceList();
            setUserList(resourceList);
            const resource = await getResource(2);
            setUser(resource);
        }

        init();
    }, []);

    return (<>
                {resourceList?.data.map(item => (
                    <Card as="li" key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.year} {item.color} {item.pantone_value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <Card as="li" key={resource?.data.id}>
                    <Card.Body>
                        <Card.Title>{resource?.data.name}</Card.Title>
                        <Card.Text>{resource?.data.year} {resource?.data.color} {resource?.data.pantone_value}</Card.Text>
                     </Card.Body>
                </Card>
            </>);
}

export default ResourceComponent;