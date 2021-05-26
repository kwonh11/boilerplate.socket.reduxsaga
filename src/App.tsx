import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from 'history';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { actions as commonActions } from '@redux/common/state';
import SocketContainer from '@chat/SocketContainer';
import socket from './config/socket';

const GlobalFontStyle = createGlobalStyle`
`;
const GlobalStyle = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  };
  * {
    box-sizing : border-box;
    text-decoration: none;
    font-family: 'S-CoreDream-3Light' !important;
  }
  body {
    background-color: rgb(249, 249, 249);
  }
  section {
    padding-top: 80px;
  }
`;
const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
`;
const Connection= styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  height: 50px;
  padding: 50px 50px;
  margin: 0 auto;
  align-items: center;
  color: ${props => props.connected === "on" ? "green" : "red"};
  & > div {
    width: 20px;
    height: 20px;
    border-radius: 40px;
    background-color: ${props => props.connected === "on" ? "green" : "red"};  
  }
`;

const ConnectionStatus = ({connected}) => {
  console.log(connected , "connected")
  return (
    <Connection connected={connected ? "on" : "off"}>
      <div /> {connected ? "연결됨" : "끊김"} 
    </Connection>
  )
}

// useHistory 훅을 사용하기위해 createBrowserHistory로 생성한 객체를 Router객체에 삽입
const history = createBrowserHistory();
function App() {
  const [on, setOn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      setOn(true);
    })
    socket.on("disconnect", () => {
      setOn(false);
      socket.connect();
    })
  }, []);
  return (
    <React.Fragment>
      <GlobalFontStyle />
      <GlobalStyle />
      <ConnectionStatus connected={on} />
      <Router history={history}>
        {/* <Switch>
          <Route path="/" exact component={SwitchContainer} />
        </Switch> */}
        <AppContainer>
          <SocketContainer />
        </AppContainer>
        {/* <Route path="/" exact component={Footer} /> */}
      </Router>
    </React.Fragment>
  );
}

export default App;