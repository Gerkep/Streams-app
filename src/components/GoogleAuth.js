import React from 'react';

class GoogleAuth extends React.Component{
    state = {isSignedIn: null};

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '515562514394-tug38eoplbeogc7bb1oamaf08614bgkt.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
            });
        });
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return <div>Idk if yore signed in</div>
        }else if(this.state.isSignedIn){
            return <div>Signed in</div>
        }else{
            return <div>Not Signed in</div>
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;