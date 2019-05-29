import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { PrivateRoute } from "./auth/PrivateRoute";
import { withFirebaseAuthentication } from "./auth/withFirebaseAuthentication";
import { withFirebaseProvider } from "./auth/withFirebaseProvider";
import { AuthenticationRouter } from "./auth/AuthenticationRouter";
import { ApiHelper } from "./helpers/ApiHelper";
import { debounce } from "./helpers/debounce";
import { withLocalization } from "./helpers/withLocalization";
import { withLocalizationProvider } from "./helpers/withLocalizationProvider";
import { LocalizationProvider } from "./helpers/LocalizationProvider";

const TestComponent = () => <h1>Test Component</h1>;

export {
  Header,
  Footer,
  PrivateRoute,
  withFirebaseAuthentication,
  withFirebaseProvider,
  AuthenticationRouter,
  ApiHelper,
  debounce,
  withLocalization,
  withLocalizationProvider,
  LocalizationProvider,
  TestComponent
};
