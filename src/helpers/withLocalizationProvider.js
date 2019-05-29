import React from "react";
import LocalizationProvider from "./LocalizationProvider";

export const withLocalizationProvider = Component =>
  class WithLocalizationProvider extends React.Component {
    render() {
      const { localization, ...resetProps } = this.props;

      return (
        <LocalizationProvider localization={localization}>
          <Component {...resetProps} />
        </LocalizationProvider>
      );
    }
  };
