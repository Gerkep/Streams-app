import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '515562514394-tug38eoplbeogc7bb1oamaf08614bgkt.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAutchChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAutchChange);
            });
        });
    }

    onAutchChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn();
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn(this.auth.currentUser.get().getId());
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon"></i>
                Sign Out
            </button>
            )
        }else{
            return (
            <button onClick={this.onSignInClick} className="ui red google button">
               <i className="google icon"></i>
                Sign In With Google
            </button>
            )
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);