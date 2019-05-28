import * as React from "react";
import AuthUserContext from "./AuthUserContext";

const withFirebaseProvider = Component =>
  class FirebaseAuthProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authInfo: {
          user: {},
          isUserAuthenticated: false,
          isFirebaseInitialized: false,
          isAnonymous: true,
          auth: props.auth,
          requiredGroup: props.requiredGroup,
          loginUrl: props.loginUrl
        }
      };
    }

    OnAuthenticationStateChange = (firebaseUser, token, groups) => {
      if (this.props.authenticationCallback) {
        this.props.authenticationCallback(firebaseUser, token, groups);
      }

      this.setState({
        authInfo: {
          ...this.state.authInfo,
          user: {
            name: firebaseUser ? firebaseUser.displayName : null,
            userId: firebaseUser ? firebaseUser.uid : null
          },
          isUserAuthenticated: firebaseUser ? true : false,
          isAnonymous: firebaseUser ? firebaseUser.isAnonymous : true,
          groups,
          isFirebaseInitialized: true
        }
      });
    };

    async componentDidMount() {
      this.fireBaseUnsubscriber = this.props.auth.onIdTokenChanged(
        async user => {
          if (user) {
            const idTokenResult = await this.props.auth.currentUser.getIdTokenResult();

            this.OnAuthenticationStateChange(
              user,
              idTokenResult.token,
              idTokenResult.claims.groups || []
            );
          } else {
            this.OnAuthenticationStateChange(null, null, []);
          }
        }
      );

      if (this.props.auth.currentUser) {
        const idTokenResult = await this.props.auth.currentUser.getIdTokenResult();
        this.OnAuthenticationStateChange(
          this.props.auth.currentUser,
          idTokenResult.token,
          idTokenResult.claims.groups || []
        );
      }
    }

    componentWillUnmount() {
      if (this.fireBaseUnsubscriber) {
        this.fireBaseUnsubscriber();
        this.fireBaseUnsubscriber = null;
      }
    }

    render() {
      const { authInfo } = this.state;
      if (!authInfo.isFirebaseInitialized) {
        return null;
      }

      return (
        <AuthUserContext.Provider value={authInfo}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export { withFirebaseProvider };
