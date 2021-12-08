import React from 'react';
import UserComponent from './UserComponent';
import ResourceComponent from './ResourceComponent';
import AuthComponent from './AuthComponent';



const App = () => {
    return  <>
                <h2>User component</h2>
                <UserComponent/>
                <h2>Resource component</h2>
                <ResourceComponent/>
                <h2>Auth component</h2>
                <AuthComponent/>
            </>
}

export default App;
