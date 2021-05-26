import io from 'socket.io-client';

// 소켓 연결 객체
export default io("http://localhost:3000", {path: "/socket"});