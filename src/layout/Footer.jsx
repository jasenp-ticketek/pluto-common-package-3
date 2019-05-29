import React from "react";
import PropTypes from "prop-types";
// import facebookImage from "../images/facebook_logo.png";
// import instagramImage from "../images/instagram-logo.png";
// import twitterImage from "../images/twitter-icon.png";
// import youtubeImage from "../images/youtube-logo.png";

class Footer extends React.Component {
  renderFooterCells = links => {
    const elems = links.map((link, index) => {
      return (
        <div key={index} className="text-left col col-md-3 col-6">
          <a className="footer-links" href={link.url}>
            {link.text}
          </a>
        </div>
      );
    });
    return elems;
  };

  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 list-container order-1 order-md-0">
                <div className="row">
                  {this.renderFooterCells(this.props.links)}
                </div>
              </div>
              <div
                className="col-md-8 col-xs-12 float-left order-2 order-md-1"
                style={{ display: "inline-block" }}
              >
                &copy;2018 Ticketek Pty Ltd (ABN 92 010 129 110) All rights
                reserved. Version 18.02.01
              </div>
              <div className="col-md-4 col-xs-12 order-0 order-md-2">
                <div className="row justify-content-center mb-4 mb-md-0">
                  <div className="icons-container">
                    <a href="https://www.facebook.com/TicketekAustralia">
                      <i className="fa fa-facebook-square icons" />
                    </a>
                    <a href="https://twitter.com/ticketek_au">
                      <i className="fa fa-twitter-square icons" />
                    </a>
                    <a href="http://www.youtube.com/user/TicketekAustralia">
                      <i className="fa fa-youtube-play icons" />
                    </a>
                    <a href="http://instagram.com/ticketekaustralia/">
                      <i className="fa fa-instagram icons" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  links: PropTypes.array
};

export { Footer };
