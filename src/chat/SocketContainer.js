import React, { useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from 'history';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { actions as socketActions } from '@redux/socket/state';
import SubmitModal from './components/SubmitModal';



const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid rgb(220,220,220);
    padding: 30px;
    border-radius: 30px;
    min-height: 500px;
    margin-bottom: 100px;
    position: ${props => props.scrollable};
`;
const Items = styled.div`
  width: 100%;
  padding: 20px 50px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid rgb(230,230,230);
  display: flex;
  align-items: center;
  & > div {
    font-size: 24px;
    padding: 10px;
    border-radius: 30px;
    margin-right: 20px;
    background-color: rgb(230,230,230);
  }
  &:hover {
    background-color: rgb(240,240,240);
    cursor: pointer;
  }
`;

function SocketContainer() {
  const dispatch = useDispatch();
  const {tasks} = useSelector((state) => state.socket);
  const tasksRef = useRef(0);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const onClickItem = (e) => {
    setSelected(e.target.dataset.id);
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
  }

  // 소켓데이터 수신하는 채널 "tasks" 생성
  useEffect(() => {
      dispatch(socketActions.waitTask());
  }, []);

  // 새로 소켓요청이 도착했을경우 모달 열기 length가 1인 경우에만
  useEffect(() => {
    const before = tasksRef.current;
    if (tasks.length === 1 && !modal && tasks.length !== before) {
      setSelected(tasks[tasks.length-1].id);
      setModal(true);
      tasksRef.current = tasks.length;
    }
  }, [tasks.length, modal])

  return (
    <Container scrollable={modal? 'fixed' : 'static'}>
        {
            tasks.map((v,index) => (
              <Items data-id={v.id} onClick={onClickItem} key={`item${index}`}>
                <div>{v.id}</div> {v.time} 의 요청 
              </Items>
            ))
        }
        <SubmitModal on={modal} onClickClose={closeModal} id={selected}/>
    </Container>
  );
}

export default SocketContainer;