import styled from 'styled-components';
import Modal from '@common/components/Modal';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import {actions} from '@redux/socket/state';


const FormContainer = styled.div`
    width: 1000px;
    margin-top: 30px;
`;
const ImageItem = styled.div`
    width: 100%;
    height: 330px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(220,220,220);
`;
const Image = styled.img`
    height: 300px;
    width: 50%;
`;
const Buttons= styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`;
const Button = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 25px;
    padding: 0 30px;
    border-radius: 20px;
    background-color: ${props => props.selected === "y" ? "rgb(220,220,220)" : 'white'};
    color: ${props => props.selected === "y" ? "black" : 'rgb(130,130,130)'};
    font-weight: ${props => props.selected === "y" ? "bold" : 'normal'};
    border: ${props => props.selected === "y" ? '2px solid rgb(130,130,130)' : '1px solid rgb(220,220,220)'};
    &:hover{
        cursor: pointer;
    }
`;
const ButtonWrapper = styled.div`
    margin: 50px 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        font-size: 30px;
        font-weight: bold;
        border: 2px solid rgb(100,100,100);
    }
`;

export default function SubmitModal(props) {
    const containerRef = useRef();
    const dispatch = useDispatch();
    const {tasks} = useSelector((state) => state.socket);
    const {on, onClickClose, id} = props;
    const [currentTask, setCurrentTask] = useState({
        id: 0,
        images: [],
    });
    const [damageType, setDamageType] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const onKeyHandler = (e) => {
        // 전송
        if (e.key === "Enter") {
            submitData();
        }
        // 취소
        if (e.key === "Escape") {
            onClickClose();
        }
    };

    const onClickDamageType = (e) => {
        const {value, index} = e.target.dataset;
        if (damageType[index]) {
            const checked = damageType[index].includes(value);
            setDamageType({
                ...damageType,
                [index]: !checked ? [...damageType[index], value] : [...damageType[index].filter(v => v !== value )]
            })
        } else {
            setDamageType({
                ...damageType,
                [index]: [value],
            })
        }
    };

    const submitData = () => {
        console.log('submit');
        console.log(damageType);
        completeTask();
    }
    const completeTask = () => {
        dispatch(actions.completeTask(id));
        onClickClose();
        setDamageType({});
    }
    console.log(id);

    useEffect(() => {
        if (tasks.findIndex(item => item.id == id) >= 0) {
            setCurrentTask(tasks.find(item => item.id == id));
        }
        setDamageType({});
    }, [id]);
    useEffect(() => {
        if (on) {
            containerRef.current.focus();
        }
    }, [on]);

    return (
        <Modal on={on} onClickClose={onClickClose}>
            <FormContainer tabIndex="0" onKeyUp={onKeyHandler} ref={containerRef}>
                {currentTask.images?.map((url, i) => (
                    <ImageItem key={`images${i}`}>
                        <Image src={url} />
                        <Buttons>
                            <Button selected={!!damageType[i]?.includes("dent") ? "y":"n"} data-value="dent" data-index={i} onClick={onClickDamageType}>찌그러짐</Button>
                            <Button selected={!!damageType[i]?.includes("tear") ? "y":"n"} data-value="tear" data-index={i} onClick={onClickDamageType}>찍힘</Button>
                            <Button selected={!!damageType[i]?.includes("scratch") ? "y":"n"} data-value="scratch" data-index={i} onClick={onClickDamageType}>스크래치</Button>
                        </Buttons>
                    </ImageItem>
                ))}
                <ButtonWrapper>
                    <Button onClick={submitData}>
                        {isLoading ? "전 송 중" : "전송하기 (ENTER)"}
                    </Button>
                </ButtonWrapper>
            </FormContainer>
        </Modal>
    )
}