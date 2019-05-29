import React from "react";
import { withFirebaseAuthentication } from "../auth/withFirebaseAuthentication";
import PropTypes from "prop-types";
import logoImage from "../images/new-logo.png";

class HeaderComponent extends React.Component {
  state = {
    dropdownOpen: false
  };

  showMenu = e => {
    e.preventDefault();

    this.setState({ dropdownOpen: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = e => {
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ dropdownOpen: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  handleTogglerClicked = e => {
    e.preventDefault();
    this.toggle();
  };

  signOut = () => {
    this.props.authInfo.auth.signOut().then(() => {
      if (this.props.signOutCallback) {
        this.props.signOutCallback();
      }
    });
  };

  renderSignOut = (isUserLoginWithUsernameAndPassword, name) => {
    return isUserLoginWithUsernameAndPassword ? name : "Sign Out";
  };

  renderDropdownList = () => {
    const { authInfo } = this.props;
    const { isUserAuthenticated, isAnonymous, loginUrl, user } = authInfo;
    const { name } = user;
    const isUserLoginWithUsernameAndPassword =
      isUserAuthenticated && !isAnonymous;

    return (
      <div className="header-dropdown">
        <div className="dropdown-menu-toggler">
          {isUserLoginWithUsernameAndPassword ? (
            // user logged in
            <a
              href="#"
              target="_self"
              className="header-login-text"
              onClick={this.showMenu}
            >
              <i className="fa fa-user-circle fa-lg icon-left" />
              <span className="user-name text-uppercase">
                {this.renderSignOut(isUserLoginWithUsernameAndPassword, name)}
              </span>
              <i className="fa fa-chevron-down icon-right" />
            </a>
          ) : (
            // user not logged in
            <a href={loginUrl} target="_self" className="header-login-text">
              <span className="siginin-text">Sign in/Sign Up</span>
            </a>
          )}
        </div>

        {this.state.dropdownOpen && isUserLoginWithUsernameAndPassword && (
          <ul
            className="header-dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <li>
              <a href="/accountmanagement/purchasedtickets" target="_self">
                <i className="fa fa-ticket" /> Order History
              </a>
            </li>
            <li>
              <a href="/accountmanagement/listings" target="_self">
                <i className="fa fa-list" />
                Ticket Listings
              </a>
            </li>
            <li>
              <a href="/accountmanagement/accountdetails" target="_self">
                <i className="fa fa-user" />
                Account Details
              </a>
            </li>
            <li>
              <a
                href={isUserLoginWithUsernameAndPassword ? "" : loginUrl}
                target="_self"
                onClick={this.signOut}
              >
                <i
                  className={`fa fa-${
                    isUserLoginWithUsernameAndPassword ? "sign-out" : "sign-in"
                  }`}
                />
                {isUserLoginWithUsernameAndPassword
                  ? this.renderSignOut(false, "Sign Out")
                  : "Sign in/Sign Up"}
              </a>
            </li>
          </ul>
        )}
      </div>
    );
  };

  render() {
    const { authInfo, imageUrl, styles = {} } = this.props;
    const { isUserAuthenticated, isAnonymous, loginUrl } = authInfo;
    const returnUrl =
      window.location.pathname === authInfo.loginUrl
        ? "/"
        : window.location.pathname;
    const encodedReturnUrl = encodeURI(returnUrl);
    const calculatedLoginUrl = `${loginUrl}?redirectUrl=${encodedReturnUrl}&isAbsolute=true`;

    return (
      <div className="header-wrapper">
        <div className="header">
          <div className="row-left">
            <a href="/">
              <img
                src={imageUrl ? imageUrl : logoImage}
                alt="logo-image"
                style={{ height: "47px", ...styles.logoImage }}
              />
            </a>
          </div>
          <div className="row-right">{this.renderDropdownList()}</div>
        </div>
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  imageUrl: PropTypes.string,
  authInfo: PropTypes.shape({
    auth: PropTypes.object,
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string
    }),
    isFirebaseInitialized: PropTypes.bool,
    isAnonymous: PropTypes.bool,
    isUserAuthenticated: PropTypes.bool,
    loginUrl: PropTypes.string,
    styles: PropTypes.instanceOf(Object)
  }),
  signOutCallback: PropTypes.func
};

const Header = withFirebaseAuthentication(HeaderComponent);
export { Header };
