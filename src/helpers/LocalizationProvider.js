import React from "react";
import LocalizationContext from "./LocalizationContext";

export class LocalizationProvider extends React.Component {
  constructor(props) {
    super(props);
    const setLanguage = props.localization.setLanguage;
    props.localization.setLanguage = language => {
      setLanguage(language);
      this.forceUpdate();
    };
  }

  render() {
    const { localization, children } = this.props;

    return (
      <LocalizationContext.Provider value={localization}>
        {children}
      </LocalizationContext.Provider>
    );
  }
}
