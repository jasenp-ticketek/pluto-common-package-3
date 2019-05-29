import React from "react";

import LocalizationContext from "./LocalizationContext";

export const withLocalization = Component =>
  class LocalizedComponent extends React.Component {
    render() {
      return (
        <LocalizationContext.Consumer>
          {localization => (
            <Component localization={localization} {...this.props} />
          )}
        </LocalizationContext.Consumer>
      );
    }
  };
