import React from "react";
import styled from "styled-components";
import QuickCard from "../Quick-cards/QuickCard";
import Article from "../Article/Article";

const HomePage: React.FunctionComponent = () => {
  return (
    <HomeContainer>
      <QuickCard />
      <Article />
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #fff;
  // margin-top: 2rem;
`;
