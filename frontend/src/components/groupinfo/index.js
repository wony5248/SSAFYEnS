import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "./styles";

const Topdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 51px;
`;
const Namediv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 263px;
  background-color: #a3cca3;
  color: white;
  border-radius: 45px;
  font-size: 20px;
  height: 100%;
`;
const Seconddiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 32px;
`;
const Secondcontent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  height: 600px;
`;
const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 263px;
  background-color: #a3cca3;
  color: white;
  border-radius: 45px;
  font-size: 20px;
  height: 51px;
`;
const Joinbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: 130px;
  width: 199px;
  background-color: #a3cca3;
  color: white;
  border: none;
  border-radius: 45px;
  font-size: 20px;
  height: 51px;
  &:hover {
    background-color: #69a569;
  }
`;
const Secondleftdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 100%;
  margin-top: 24px;
  border-radius: 20px;
  height: 500px;
  border: 1px solid #a3cca3;
`;
const Secondrightdiv = styled.div`
  display: flex;
  align-items: center;
  width: 84%;
  margin-top: 24px;
  border-radius: 20px;
  height: 300px;
  border: 1px solid #a3cca3;
  padding: 0 8%;
  font-size: 16px;
  color: #000000;
  overflow: auto;
`;
const Challengetitlediv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 263px;
  color: #000000;
  border: 1px solid #a3cca3;
  border-radius: 45px;
  margin-top: 27px;
  margin-left: 27px;
  font-size: 16px;
  height: 51px;
`;
const Summarydiv = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  width: 178px;
  border: 1px solid #a3cca3;
  margin-top: 27px;
  margin-right: 27px;
  font-size: 14px;
  overflow: auto;
  height: 104px;
`;
const Progressdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  border: 1px solid #a3cca3;
  margin-top: 32px;
  margin-left: 27px;
  margin-bottom: 27px;
  font-size: 14px;
  height: 220px;
  overflow: auto;
`;
const Challengeaddbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 31px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 45px;
  margin-top: 27px;
  background-color: #a3cca3;
  &:hover {
    background-color: #69a569;
  }
`;
const Groupinfo = (props) => {
  const { id } = props;
  console.log(props);
  const [ismember, setIsmember] = useState(true);
  return (
    <div style={{ padding: "24px 0" }}>
      {ismember ? (
        <Wrapper>
          <Topdiv>
            <Namediv>CS 스터디</Namediv>
          </Topdiv>
          <Seconddiv>
            <Secondcontent>
              <Titlediv>현재 진행중인 챌린지</Titlediv>
              <Secondleftdiv>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Challengetitlediv>이산 수학 마스터 하기</Challengetitlediv>
                  <Challengeaddbtn>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M 14.955 7.909 C 14.955 7.407 15.362 7 15.864 7 L 23.136 7 C 23.638 7 24.045 7.407 24.045 7.909 L 24.045 14.955 L 31.091 14.955 C 31.593 14.955 32 15.362 32 15.864 L 32 23.136 C 32 23.638 31.593 24.045 31.091 24.045 L 24.045 24.045 L 24.045 31.091 C 24.045 31.593 23.638 32 23.136 32 L 15.864 32 C 15.362 32 14.955 31.593 14.955 31.091 L 14.955 24.045 L 7.909 24.045 C 7.407 24.045 7 23.638 7 23.136 L 7 15.864 C 7 15.362 7.407 14.955 7.909 14.955 L 14.955 14.955 Z"
                        fill="rgb(255, 255, 255)"
                      ></path>
                    </svg>
                  </Challengeaddbtn>
                </div>
                <Summarydiv></Summarydiv>
                <Progressdiv></Progressdiv>
              </Secondleftdiv>
            </Secondcontent>
            <Secondcontent>
              <Titlediv>그룹 소개</Titlediv>
              <Secondrightdiv>
                아 ! 죽여줘 하시는 분들의 모임. <br />주 1회 모여서 스터디
                합니다. <br /> 코딩에 깔려 죽으실꺼 같은 분들 환영입니다.
              </Secondrightdiv>
              <Joinbtn>관리하기</Joinbtn>
            </Secondcontent>
          </Seconddiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <Topdiv>
            <Namediv>CS 스터디</Namediv>
          </Topdiv>
          <Seconddiv>
            <Secondcontent>
              <Titlediv>현재 진행중인 챌린지</Titlediv>
              <Secondleftdiv>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Challengetitlediv>이산 수학 마스터 하기</Challengetitlediv>
                </div>
                <Summarydiv></Summarydiv>
                <Progressdiv></Progressdiv>
              </Secondleftdiv>
            </Secondcontent>
            <Secondcontent>
              <Titlediv>그룹 소개</Titlediv>
              <Secondrightdiv>
                아 ! 죽여줘 하시는 분들의 모임. <br />주 1회 모여서 스터디
                합니다. <br /> 코딩에 깔려 죽으실꺼 같은 분들 환영입니다.
              </Secondrightdiv>
              <Joinbtn>가입하기</Joinbtn>
            </Secondcontent>
          </Seconddiv>
        </Wrapper>
      )}
    </div>
  );
};

export default Groupinfo;
