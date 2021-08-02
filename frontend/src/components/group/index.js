import React, { useState, useEffect } from "react";
import Wrapper from "./styles";
import { DataGrid } from "@material-ui/data-grid";
import styled1 from "styled-components";
import { styled, makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
const columns = [
  {
    field: "id",
    headerName: "그룹 번호",
    headerClassName: "super-app-theme--header",
    width: 140,
  },
  {
    field: "groupName",
    headerName: "그룹 이름",
    headerClassName: "super-app-theme--header",
    width: 480,
    editable: true,
  },
  {
    field: "description",
    headerName: "그룹 설명",
    headerClassName: "super-app-theme--header",
    width: 480,
    editable: true,
  },
  {
    field: "leader",
    headerName: "그룹장 이름",
    headerClassName: "super-app-theme--header",
    width: 140,
    editable: true,
  },
  {
    field: "member",
    headerName: "그룹 인원",
    headerClassName: "super-app-theme--header",
    width: 140,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    groupName: "JBJ와 함께하는 Electron",
    description: "Electron 정복기",
    leader: "장범진",
    member: "1",
  },
  {
    id: 2,
    groupName: "LTY와 함께하는 Swagger",
    description: "Swagger 정복기",
    leader: "이태용",
    member: "4",
  },
  {
    id: 3,
    groupName: "KJH와 함께하는 Node.js",
    description: "Node.js 정복기",
    leader: "김지환",
    member: "4",
  },
  {
    id: 4,
    groupName: "HER와 함께하는 React.js",
    description: "React.js 정복기",
    leader: "허애리",
    member: "2",
  },
  {
    id: 5,
    groupName: "SEJ와 함께하는 Embedded",
    description: "Embedded 정복기",
    leader: "신은지",
    member: "2",
  },
  {
    id: 6,
    groupName: "JBJ와 함께하는 Raspberry pi",
    description: "Raspberry pi 정복기",
    leader: "장범진",
    member: "2",
  },
  {
    id: 7,
    groupName: "LTY와 함께하는 mongoDB",
    description: "mongoDB 정복기",
    leader: "이태용",
    member: "4",
  },
  {
    id: 8,
    groupName: "KJH와 함께하는 Jenkins",
    description: "Jenkins 정복기",
    leader: "김지환",
    member: "5",
  },
  {
    id: 9,
    groupName: "HER와 함께하는 Framer",
    description: "Framer 정복기",
    leader: "허애리",
    member: "2",
  },
  {
    id: 10,
    groupName: "SEJ와 함께하는 stt & tts",
    description: "stt & tts 정복기",
    leader: "신은지",
    member: "1",
  },
  {
    id: 11,
    groupName: "모두가 함께하는 식사",
    description: "식사 정복기",
    leader: "모두",
    member: "5",
  },
  {
    id: 12,
    groupName: "모두가 같이하는 코딩",
    description: "코딩 정복기",
    leader: "모두",
    member: "5",
  },
];

// const useStyles = makeStyles({
//   root: {
//     '& .super-app-theme--header': {
//       backgroundColor: '#a3cca3',
//     },
//   },
// });

const Muidatagrid = styled(DataGrid)({
  border: "1px solid #a3cca3",
  borderBottom: "1px solid #a3cca3",
});

const Availablediv = styled1.div`
  width:263px;
  height: 51px;
  background-color: #a3cca3;
  border-radius: 45px;
  margin-bottom: 2.5%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:20px;
`;
const Joindiv = styled1.div`
  width:100%;
  height: 56px;
  margin-top: 2.5%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Nogroupdiv = styled1.div`
  width:100%;
  height: 400px;
  color: #666666;
  font-size:36px;
  line-height:1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #a3cca3;
`;

const Nogrouptextdiv = styled1.div`
  width:38%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`;

const Joinbtn = styled1.button`
  width:100px;
  height: 100%;
  border-radius: 8px;
  font-size: 16px;
  background-color: #a3cca3;
  border:none;
  color: white;
  &:hover{
    background-color: #69a569;
  }
`;
const Group = () => {
  const [isgroup, setIsgroup] = useState(true);
  return (
    <div>
      <Wrapper>
        <Availablediv>가입 가능한 그룹</Availablediv>
        <div style={{ height: 400, width: "100%" }}>
          <Muidatagrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <Joindiv>
          <Joinbtn onClick={() => window.confirm("정말 가입하시겠습니까?")}>
            가입
          </Joinbtn>
        </Joindiv>
      </Wrapper>
      <Divider style={{ backgroundColor: "#a3cca3" }} />
      {isgroup ? (
        <Wrapper>
          <Availablediv>내가 가입한 그룹</Availablediv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
          <Joindiv>
            <Joinbtn onClick={() => window.confirm("정말 탈퇴하시겠습니까?")}>
              탈퇴
            </Joinbtn>
          </Joindiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <Availablediv>내가 가입한 그룹</Availablediv>
          <Nogroupdiv>
            <Nogrouptextdiv>
              가입되어 있는 그룹이 없습니다. 그룹에 가입해 보세요!
            </Nogrouptextdiv>
          </Nogroupdiv>
          <Joindiv>
            <Joinbtn onClick={() => window.confirm("정말 탈퇴하시겠습니까?")}>
              탈퇴
            </Joinbtn>
          </Joindiv>
        </Wrapper>
      )}
    </div>
  );
};

export default Group;
