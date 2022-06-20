import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./assets/styles/normalize.css";
import "./assets/styles/components.css";
import "./assets/styles/web-fonts.css";
import "./assets/styles/ceho.css";
import "./assets/styles/main_cs.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import WholeApp from "./wholeApp";
const Index = () => {
   return (
    <React.StrictMode>
      <Provider store={store}>
        <WholeApp />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
