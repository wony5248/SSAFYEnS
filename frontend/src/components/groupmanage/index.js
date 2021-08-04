import React, { useState, useEffect } from "react";
import Wrapper from "./styles";
import { DataGrid } from "@material-ui/data-grid";
import styled1 from "styled-components";
import { styled, makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Create from "../challengecreate";
const columns = [
  {
    field: "id",
    headerName: "번호",
    headerClassName: "super-app-theme--header",
    width: 120,
  },
  {
    field: "memberName",
    headerName: "그룹원 이름",
    headerClassName: "super-app-theme--header",
    width: 500,
    editable: true,
  },
  {
    field: "joinDate",
    headerName: "가입 날자",
    headerClassName: "super-app-theme--header",
    width: 500,
    editable: true,
  },
];
const application = [
  {
    field: "id",
    headerName: "번호",
    headerClassName: "super-app-theme--header",
    width: 120,
  },
  {
    field: "applierName",
    headerName: "지원자 이름",
    headerClassName: "super-app-theme--header",
    width: 200,
    editable: true,
  },
  {
    field: "introduction",
    headerName: "가입 문구",
    headerClassName: "super-app-theme--header",
    width: 600,
    editable: true,
  },
  {
    field: "applyDate",
    headerName: "가입 요청 날자",
    headerClassName: "super-app-theme--header",
    width: 200,
    editable: true,
  },
];
const possiblegroup2 = [
  {
    id: 1,
    memberName: "장범진",
    joinDate: "2021.08.03",
  },
];
const possiblegroup = [
  {
    id: 1,
    memberName: "장범진",
    joinDate: "2021.08.03",
  },
  {
    id: 2,
    memberName: "이태용",
    joinDate: "2021.08.03",
  },
  {
    id: 3,
    memberName: "김지환",
    joinDate: "2021.08.03",
  },
  {
    id: 4,
    memberName: "허애리",
    joinDate: "2021.08.03",
  },
  {
    id: 5,
    memberName: "신은지",
    joinDate: "2021.08.03",
  },
  {
    id: 11,
    memberName: "모두",
    joinDate: "2021.08.03",
  },
];

const joinedgroup = [
  {
    id: 1,
    applierName: "장범진",
    introduction: "받아만 주신다면 뼈를 묻겠습니다.",
    applyDate: "2021.08.03",
  },
  {
    id: 2,
    applierName: "이태용",
    introduction: "좋은 말로 할때 받아주시죠",
    applyDate: "2021.08.03",
  },
  {
    id: 3,
    applierName: "신은지",
    introduction: "제가 곧 임베디드고 임베디드가 곧 나이다.",
    applyDate: "2021.08.03",
  },
  {
    id: 4,
    applierName: "허애리",
    introduction: "죽여줘",
    applyDate: "2021.08.03",
  },
  {
    id: 5,
    applierName: "김지환",
    introduction: "강알리 등킨드나쓰 무봤나",
    applyDate: "2021.08.03",
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
  height: 100%;
  background-color: #a3cca3;
  border-radius: 45px;
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

const GroupNamediv = styled1.div`
  height: 100%;
  background-color: #a3cca3;
  padding: 0 48px;
  border-radius: 45px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:20px;
`;

const Grouptitlediv = styled1.div`
  width:100%;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 44px;
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
  z-index:1;
  &:hover{
    background-color: #69a569;
  }
`;

const Acceptbtn = styled1.button`
  width:100px;
  height: 100%;
  border-radius: 8px;
  margin-right: 7px;
  font-size: 16px;
  background-color: #a3cca3;
  border:none;
  color: white;
  &:hover{
    background-color: #69a569;
  }
`;

const Joineddiv = styled1.div`
  display:flex;
  justify-content: space-between;
  height: 51px;
  margin-bottom: 2.5%;
`;

const Challengebtn = styled1.button`
  width: 140px;
  height: 100%;
  border-radius: 20px;
  font-size: 16px;
  background-color: #a3cca3;
  align-content:flex-end;

  border:none;
  color: white;
  &:hover{
    background-color: #69a569;
  }
`;

const Searchbtn = styled1.button`
  border:none;
  background-color:white;
  display:flex;
  align-items: center;
  cursor:pointer;
  
`;
const Groupinput = styled1.input`
  width:95%;
  height: 100%;
  border-radius: 16px;
  padding-right: 8px;
  font-size: 20px;
  display:flex;
  align-items:center;
  border:1px solid #a3cca3;
  &:focus{
      outline:none;
  }
`;
const Groupmanage = (props) => {
  const [isleader, setIsleader] = useState(true);
  const [createopen, setCreateopen] = useState(false);

  const openCreateModal = () => {
    setCreateopen(true);
  };

  const closeCreateModal = () => {
    setCreateopen(false);
  };
  const { id } = props;
  console.log(id);
  return (
    <div style={{ padding: "24px 0" }}>
      {isleader ? (
        <Wrapper>
          <Grouptitlediv>
            <Challengebtn onClick={() => window.location.replace("/group")}>
              뒤로 가기
            </Challengebtn>
            <GroupNamediv>JBJ와 함께하는 Electron</GroupNamediv>
            <Challengebtn onClick={openCreateModal}>챌린지 만들기</Challengebtn>
          </Grouptitlediv>
          <Joineddiv>
            <Availablediv>그룹 구성원</Availablediv>
            <Create open={createopen} close={closeCreateModal} />
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={possiblegroup}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
          <Joindiv>
            <Joinbtn onClick={() => window.confirm("정말 추방하시겠습니까?")}>
              추방하기
            </Joinbtn>
          </Joindiv>
          <Divider style={{ backgroundColor: "#a3cca3", margin: "40px 0" }} />
          <Joineddiv>
            <Availablediv>가입 신청 목록</Availablediv>
            <div
              style={{ width: "25%", display: "flex", alignItems: "center" }}
            >
              <Groupinput></Groupinput>
              <Searchbtn>
                <SearchIcon
                  fontSize="large"
                  style={{ color: "#a3cca3" }}
                ></SearchIcon>
              </Searchbtn>
            </div>
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={joinedgroup}
              columns={application}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
          <Joindiv>
            <div style={{ height: "51px" }}>
              <Acceptbtn
                onClick={() => window.confirm("정말 승인하시겠습니까?")}
              >
                승인하기
              </Acceptbtn>
              <Joinbtn onClick={() => window.confirm("정말 거절하시겠습니까?")}>
                거절하기
              </Joinbtn>
            </div>
          </Joindiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <Grouptitlediv>
            <div style={{ width: "140px" }}></div>
            <GroupNamediv>JBJ와 함께하는 Electron</GroupNamediv>
            <div style={{ width: "140px" }}></div>
          </Grouptitlediv>
          <Joineddiv>
            <Availablediv>그룹 구성원</Availablediv>
            <div
              style={{ width: "25%", display: "flex", alignItems: "center" }}
            >
              <Groupinput value="장범진" dir="rtl"></Groupinput>
              <Searchbtn>
                <SearchIcon
                  fontSize="large"
                  style={{ color: "#a3cca3" }}
                ></SearchIcon>
              </Searchbtn>
            </div>
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={possiblegroup2}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default Groupmanage;
