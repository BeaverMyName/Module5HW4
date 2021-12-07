import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';

const registerUrl = "https://reqres.in/api/register";
const loginUrl = "https://reqres.in/api/login"

interface IAuthorisationResponse {
    id: number,
    token: string
}

interface IErrorText {
    error: string
}

const authorise = async (email: string, password: string, url: string) : Promise<IAuthorisationResponse> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    }

    const response = await fetch(url, requestOptions);
    return await response.json();
}

const unsuccessfulAuthorise = async (email: string, url: string) : Promise<IErrorText> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    }

    const response = await fetch(url, requestOptions);
    return await response.json();
}

const AuthComponent = () => {
    const [registered, setRegistered] = React.useState<IAuthorisationResponse | null>(null);
    const [logined, setLogined] = React.useState<IAuthorisationResponse | null>(null);
    const [registerError, setRegisterError] = React.useState<IErrorText | null>(null);
    const [loginError, setLoginError] = React.useState<IErrorText | null>(null);

    useEffect(() => {
        async function init() {
            const registered = await authorise("eve.holt@reqres.in", "pistol", registerUrl);
            setRegistered(registered);
            const logined = await authorise("eve.holt@reqres.in", "cityslicka", loginUrl);
            setLogined(logined);
            const registerError = await unsuccessfulAuthorise("sydney@fife", registerUrl);
            setRegisterError(registerError);
            const loginError = await unsuccessfulAuthorise("peter@klaven", loginUrl);
            setLoginError(loginError);
        }

        init();
    }, [])

    return <>
                <Card key={registered?.id}>
                    <Card.Body>
                        <Card.Title>{registered?.id}</Card.Title>
                        <Card.Text>{registered?.token}</Card.Text>
                    </Card.Body>
                </Card>
                <Card key={logined?.id}>
                    <Card.Body>
                        <Card.Title>{logined?.id}</Card.Title>
                        <Card.Text>{logined?.token}</Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Text>{registerError?.error}</Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Text>{loginError?.error}</Card.Text>
                    </Card.Body>
                </Card>
           </>
}

export default AuthComponent;