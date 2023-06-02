import React from 'react'
import styled from 'styled-components';
import KidsCard from '../KidsCard/KidsCard';

const FirstAid: React.FunctionComponent = () => {
    return (
        <FirstAidContainer>
            <KidsCard/>
        </FirstAidContainer>
    )
}

export default FirstAid;

const FirstAidContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-left: 15.5rem;
  background-color: #e0e0e0;
  width:83%;
  overflow:auto;
`;
