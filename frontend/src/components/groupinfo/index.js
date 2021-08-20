import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "./styles";
import Join from "../groupjoin";
import { challengeAPI, groupAPI } from "../../utils/axios";
import Challengecreate from "../challengecreate";
const Topdiv = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-top: 130px;
  float: right;
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
  height: 500px;
  border: 1px solid #a3cca3;
  overflow: auto;
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
  align-self: center;
  width: 263px;
  color: #000000;
  border-bottom: 1px solid #a3cca3;
  font-size: 16px;
  height: 51px;
`;
const Challengecontentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 263px;
  color: #000000;
  font-size: 16px;
  height: 200px;
`;
const Progressdiv = styled.div`
  justify-content: center;
  align-items: center;
  width: 480px;
  border: 1px solid #a3cca3;
  margin-top: 32px;
  margin-left: 27px;
  margin-bottom: 27px;
  font-size: 14px;
  height: 300px;
  overflow: auto;
`;
const Challengeaddbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 45px;
  margin-right: 12px;
  background-color: #a3cca3;
  &:hover {
    background-color: #69a569;
  }
`;
const Backbtn = styled.button`
  width: 140px;
  height: 100%;
  border-radius: 20px;
  font-size: 16px;
  background-color: #a3cca3;
  align-content: flex-end;

  border: none;
  color: white;
  &:hover {
    background-color: #69a569;
  }
`;
const Progressbardiv = styled.div`
  height: 40px;
  width: 300px;
  display: flex;
  color: black;
  justify-content: flex-start;
  min-height: 20px;
  margin-top: 8px;
  margin-left: 8px;
  align-items: center;
`;
const Groupinfo = (props) => {
  const { id } = props;
  const [ismember, setIsmember] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  const [challenge, setChallenge] = useState([]);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [createopen, setCreateopen] = useState(false);
  const [joinopen, setJoinopen] = useState(false);
  const openCreateModal = () => {
    setCreateopen(true);
  };

  const closeCreateModal = () => {
    setCreateopen(false);
  };
  const openJoinModal = () => {
    setJoinopen(true);
  };

  const closeJoinModal = () => {
    setJoinopen(false);
  };
  useEffect(() => {
    async function loadGroup() {
      await groupAPI
        .getGroup(id)
        .then(({ data }) => {
          for (let i = 0; i < data.members.length; i++) {
            if (data.members[i].user_id === sessionStorage.getItem("id")) {
              if (data.members[i].is_group_admin) {
                setIsadmin(true);
                setIsmember(true);
              } else {
                setIsmember(true);
              }
            }
          }
          setTitle(data.name);
          setContext(data.context);
        })
        .catch((e) => {});
    }
    async function loadChallenge() {
      var arr = [];
      await challengeAPI
        .getChallenge()
        .then(({ data }) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (data[i].group_id === Number(id)) {
              arr.push(data[i]);
            }
          }
          setChallenge(arr);
          console.log(arr);
        })
        .catch((e) => {});
    }
    loadChallenge();
    loadGroup();
  }, []);
  return (
    <div style={{ padding: "24px 0px" }}>
      {" "}
      {ismember ? (
        createopen ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Challengecreate
              open={createopen}
              close={closeCreateModal}
              groupid={id}
            />
          </div>
        ) : (
          <Wrapper>
            <div>
              <Topdiv>
                <Backbtn onClick={() => (window.location.href = "/group")}>
                  뒤로 가기{" "}
                </Backbtn>{" "}
                <Namediv>{title}</Namediv>{" "}
                <div style={{ width: "200px" }}> </div>{" "}
              </Topdiv>
              <Seconddiv>
                <Secondcontent>
                  <Titlediv> 챌린지 </Titlediv>{" "}
                  {challenge.length === 0 ? (
                    <Secondleftdiv
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        fontSize: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "24px",
                        }}
                      >
                        등록된 챌린지가 없습니다.
                        {isadmin ? (
                          <Challengeaddbtn onClick={openCreateModal}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                            >
                              <path
                                d="M 14.955 7.909 C 14.955 7.407 15.362 7 15.864 7 L 23.136 7 C 23.638 7 24.045 7.407 24.045 7.909 L 24.045 14.955 L 31.091 14.955 C 31.593 14.955 32 15.362 32 15.864 L 32 23.136 C 32 23.638 31.593 24.045 31.091 24.045 L 24.045 24.045 L 24.045 31.091 C 24.045 31.593 23.638 32 23.136 32 L 15.864 32 C 15.362 32 14.955 31.593 14.955 31.091 L 14.955 24.045 L 7.909 24.045 C 7.407 24.045 7 23.638 7 23.136 L 7 15.864 C 7 15.362 7.407 14.955 7.909 14.955 L 14.955 14.955 Z"
                                fill="rgb(255, 255, 255)"
                              ></path>{" "}
                            </svg>{" "}
                          </Challengeaddbtn>
                        ) : null}
                      </div>
                    </Secondleftdiv>
                  ) : (
                    <Secondleftdiv>
                      <div
                        style={{
                          alignItems: "center",
                        }}
                      >
                        {challenge.map((item) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              widows: "100%",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #a3cca3",
                                marginLeft: "27px",
                              }}
                            >
                              <Challengetitlediv>{item.name}</Challengetitlediv>
                              <Challengecontentdiv>
                                {" "}
                                {item.content}
                              </Challengecontentdiv>
                            </div>
                            {isadmin ? (
                              <Challengeaddbtn onClick={openCreateModal}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                >
                                  <path
                                    d="M 14.955 7.909 C 14.955 7.407 15.362 7 15.864 7 L 23.136 7 C 23.638 7 24.045 7.407 24.045 7.909 L 24.045 14.955 L 31.091 14.955 C 31.593 14.955 32 15.362 32 15.864 L 32 23.136 C 32 23.638 31.593 24.045 31.091 24.045 L 24.045 24.045 L 24.045 31.091 C 24.045 31.593 23.638 32 23.136 32 L 15.864 32 C 15.362 32 14.955 31.593 14.955 31.091 L 14.955 24.045 L 7.909 24.045 C 7.407 24.045 7 23.638 7 23.136 L 7 15.864 C 7 15.362 7.407 14.955 7.909 14.955 L 14.955 14.955 Z"
                                    fill="rgb(255, 255, 255)"
                                  ></path>{" "}
                                </svg>{" "}
                              </Challengeaddbtn>
                            ) : null}
                          </div>
                        ))}
                      </div>{" "}
                    </Secondleftdiv>
                  )}
                </Secondcontent>{" "}
                <Join
                  open={joinopen}
                  close={closeJoinModal}
                  groupid={id}
                ></Join>
                <Secondcontent>
                  <Titlediv> 그룹 소개 </Titlediv>{" "}
                  <Secondrightdiv>{context}</Secondrightdiv>{" "}
                  <Joinbtn
                    onClick={() => window.alert("이미 이 그룹의 일원입니다.")}
                  >
                    {" "}
                    가입 하기{" "}
                  </Joinbtn>{" "}
                </Secondcontent>{" "}
              </Seconddiv>
            </div>
          </Wrapper>
        )
      ) : (
        <Wrapper>
          {createopen ? (
            <div>
              <Challengecreate
                open={createopen}
                close={closeCreateModal}
                groupid={id}
              />
            </div>
          ) : (
            <div>
              <Topdiv>
                <Backbtn onClick={() => (window.location.href = "/group")}>
                  뒤로 가기{" "}
                </Backbtn>{" "}
                <Namediv> {title} </Namediv>{" "}
                <div style={{ width: "200px" }}> </div>{" "}
              </Topdiv>
              <Seconddiv>
                <Secondcontent>
                  <Titlediv> 챌린지 </Titlediv>{" "}
                  {challenge.length === 0 ? (
                    <Secondleftdiv
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        fontSize: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "24px",
                        }}
                      >
                        등록된 챌린지가 없습니다.
                        {isadmin ? (
                          <Challengeaddbtn onClick={openCreateModal}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                            >
                              <path
                                d="M 14.955 7.909 C 14.955 7.407 15.362 7 15.864 7 L 23.136 7 C 23.638 7 24.045 7.407 24.045 7.909 L 24.045 14.955 L 31.091 14.955 C 31.593 14.955 32 15.362 32 15.864 L 32 23.136 C 32 23.638 31.593 24.045 31.091 24.045 L 24.045 24.045 L 24.045 31.091 C 24.045 31.593 23.638 32 23.136 32 L 15.864 32 C 15.362 32 14.955 31.593 14.955 31.091 L 14.955 24.045 L 7.909 24.045 C 7.407 24.045 7 23.638 7 23.136 L 7 15.864 C 7 15.362 7.407 14.955 7.909 14.955 L 14.955 14.955 Z"
                                fill="rgb(255, 255, 255)"
                              ></path>{" "}
                            </svg>{" "}
                          </Challengeaddbtn>
                        ) : null}
                      </div>
                    </Secondleftdiv>
                  ) : (
                    <Secondleftdiv>
                      <div
                        style={{
                          alignItems: "center",
                        }}
                      >
                        {challenge.map((item) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              widows: "100%",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #a3cca3",
                                marginLeft: "27px",
                              }}
                            >
                              <Challengetitlediv>{item.name}</Challengetitlediv>
                              <Challengecontentdiv>
                                {" "}
                                {item.content}
                              </Challengecontentdiv>
                            </div>
                            {isadmin ? (
                              <Challengeaddbtn onClick={openCreateModal}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                >
                                  <path
                                    d="M 14.955 7.909 C 14.955 7.407 15.362 7 15.864 7 L 23.136 7 C 23.638 7 24.045 7.407 24.045 7.909 L 24.045 14.955 L 31.091 14.955 C 31.593 14.955 32 15.362 32 15.864 L 32 23.136 C 32 23.638 31.593 24.045 31.091 24.045 L 24.045 24.045 L 24.045 31.091 C 24.045 31.593 23.638 32 23.136 32 L 15.864 32 C 15.362 32 14.955 31.593 14.955 31.091 L 14.955 24.045 L 7.909 24.045 C 7.407 24.045 7 23.638 7 23.136 L 7 15.864 C 7 15.362 7.407 14.955 7.909 14.955 L 14.955 14.955 Z"
                                    fill="rgb(255, 255, 255)"
                                  ></path>{" "}
                                </svg>{" "}
                              </Challengeaddbtn>
                            ) : null}
                          </div>
                        ))}
                      </div>{" "}
                    </Secondleftdiv>
                  )}
                </Secondcontent>{" "}
                <Secondcontent>
                  <Titlediv> 그룹 소개 </Titlediv>{" "}
                  {joinopen ? (
                    <Join
                      open={joinopen}
                      close={closeJoinModal}
                      groupid={id}
                    ></Join>
                  ) : (
                    <Secondrightdiv>{context}</Secondrightdiv>
                  )}
                  <Joinbtn onClick={openJoinModal}> 가입 하기 </Joinbtn>{" "}
                </Secondcontent>
              </Seconddiv>
            </div>
          )}
        </Wrapper>
      )}{" "}
    </div>
  );
};

export default Groupinfo;
