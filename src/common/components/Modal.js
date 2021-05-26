
/* tslint:disable */
import styled from "styled-components";
import device from "@utils/devices";
import { useRef, useEffect } from 'react';

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  visibility: ${(props) => (props.on === "on" ? "visible" :"hidden")};
  z-index: ${(props) => (props.on === "on" ? 9999 : -1)};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.on === "on" ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0)"};
  transition: background-color 0.15s ease-out;
`;
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  background-color: white;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 6px 13px -5px rgba(133, 133, 133, 1);
  min-width: 480px;
  min-height: 400px;
  max-height: 90%;
  border-radius: 10px;
  overflow-y: scroll;
`;
const ExitWrap = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: flex-end;
  padding: 15px;
  font-size: 1.5rem;
  color: rgb(134, 142, 150);
  transition: all ease 0.1s;
  width: 1000px;
  position: fixed;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

export default function Modal(props) {
  const { on, onClickClose, children } = props;
  const containerRef = useRef();

  const onKeyHandler = (e) => {
    // 숫자키로 스크롤이동 가능
    if (e.key > 0) {
        containerRef.current.scrollTo({top: 330 * (e.key-1) + 54, left: 0})
    }
  }

  // 모달창 켜질 때마다 스크롤 탑
  useEffect(() => {
    if (on) {
        console.log("effect");
        containerRef.current.focus();
        containerRef.current.scrollTo({top:0});
    }
  }, [on]);

  return (
    <ModalContainer on={on ? "on" : "off"} >
      <ModalBox onKeyUp={onKeyHandler} on={on ? "on" : "off"} ref={containerRef} tabIndex="0">
        <ExitWrap onClick={onClickClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            tabIndex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </ExitWrap>
        {children}
      </ModalBox>
    </ModalContainer>
  );
}
