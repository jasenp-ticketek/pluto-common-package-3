import * as React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withFirebaseAuthentication } from "./withFirebaseAuthentication";

class PrivateRouteComponent extends React.Component {
  constructor(props) {
    super(props);

    const { authInfo, requiredGroup } = this.props;

    const isAuthenticated =
      authInfo.isUserAuthenticated && !authInfo.isAnonymous;

    const finalRequiredGroup = requiredGroup || authInfo.requiredGroup;
    const isInRequiredGroup = authInfo.groups.some(group =>
      finalRequiredGroup.includes(group)
    );

    const isAutherised =
      isAuthenticated &&
      ((!requiredGroup && !authInfo.requiredGroup) || isInRequiredGroup);

    this.state = { wasAutherised: isAutherised };
  }

  render() {
    const { authInfo, requiredGroup, ...restProps } = this.props;
    const { wasAutherised } = this.state;
    const isAuthenticated =
      authInfo.isUserAuthenticated && !authInfo.isAnonymous;

    const finalRequiredGroup = requiredGroup || authInfo.requiredGroup;
    const isInRequiredGroup = authInfo.groups.some(group =>
      finalRequiredGroup.includes(group)
    );

    const isAutherised =
      isAuthenticated &&
      ((!requiredGroup && !authInfo.requiredGroup) || isInRequiredGroup);

    if (isAutherised) {
      return <Route {...restProps} />;
    } else if (wasAutherised) {
      // window.history.pushState(null, null, authInfo.loginUrl);
      // window.location.href = `${authInfo.loginUrl}`;
      window.history.pushState(null, null, authInfo.loginUrl);
      window.location.href = `${authInfo.loginUrl}`;
      return null;
    } else {
      window.history.pushState(
        null,
        null,
        `${authInfo.loginUrl}?redirectUrl=${
          window.location.pathname
        }&isAbsolute=true`
      );
      window.location.href = `${authInfo.loginUrl}?redirectUrl=${
        window.location.pathname
      }&isAbsolute=true`;
      return null;
    }
  }
}

PrivateRouteComponent.propTypes = {
  authInfo: PropTypes.shape({
    auth: PropTypes.object,
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string
    }),
    isFirebaseInitialized: PropTypes.bool,
    isUserAuthenticated: PropTypes.bool,
    isAnonymous: PropTypes.bool,
    loginUrl: PropTypes.string
  }),
  requiredGroup: PropTypes.string
};

const PrivateRoute = withFirebaseAuthentication(PrivateRouteComponent);

export { PrivateRoute };
