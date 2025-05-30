import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import "./App.css";


export default function App() {
  return (
    <Provider store={appStore}>
      <Body />
    

    </Provider>
  );
}
 