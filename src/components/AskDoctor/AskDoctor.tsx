import React from 'react'
import ChatPage from '../Chatpage/chatpage';
import styled from 'styled-components';


const AskDoctor: React.FunctionComponent = () => {
    return (
        <AskDoctorContainer>
            <ChatPage user={{
                username: '',
                secret: ''
            }} />
        </AskDoctorContainer>
    )
}

export default AskDoctor


const AskDoctorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 100vh;
    background-color: #E0E0E0;
`