import React, { useState, useEffect } from "react";
import Wrapper from "./styles";
import { DataGrid } from "@material-ui/data-grid";
import styled1 from "styled-components";
import { styled, makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Create from "../groupchange";
import { groupAPI } from "../../utils/axios";
import moment from "moment";
const columns = [
  {
    field: "id",
    headerName: "번호",
    headerClassName: "super-app-theme--header",
    width: 120,
  },
  {
    field: "name",
    headerName: "그룹원 이름",
    headerClassName: "super-app-theme--header",
    width: 500,
  },
  {
    field: "joined_at",
    headerName: "가입 날자",
    headerClassName: "super-app-theme--header",
    width: 500,
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
    field: "name",
    headerName: "지원자 이름",
    headerClassName: "super-app-theme--header",
    width: 200,
  },
  {
    field: "reason",
    headerName: "가입 문구",
    headerClassName: "super-app-theme--header",
    width: 600,
  },
  {
    field: "applied_at",
    headerName: "가입 요청 날자",
    headerClassName: "super-app-theme--header",
    width: 200,
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
  const [select, setSelect] = useState([]);
  const [title, setTitle] = useState("")
  const [applier, setApplier] = useState([])
  const [member, setMember] = useState([])
  const openCreateModal = () => {
    setCreateopen(true);
  };

  const closeCreateModal = () => {
    setCreateopen(false);
  };
  const { id } = props;
  // console.log(id);
  // console.log(select);
  useEffect(() => {
    async function loadMember() {
      console.log(id)
      await groupAPI
        .getGroup(id)
        .then(({ data }) => {
          setTitle(data.name)
          setMember(data.members)
          for (let i =0; i< data.members.length; i++)
          {
            data.members[i].id = i+1
            data.members[i].joined_at = moment(data.members[i].joined_at).format("YYYY년MM월DD일")
          }
          console.log(data.members)
        })
        .catch((e) => {console.log("여기..")});
    }
    async function loadApplier() {
      console.log(id)
      await groupAPI
        .applicantListGroup(id)
        .then(({ data }) => {
          setApplier(data)
          for (let i =0; i< data.length; i++)
          {
            data[i].id = i+1
            data.members[i].applied_at = moment(data[i].applied_at).format("YYYY년MM월DD일")
          }
          console.log(data)
        })
        .catch((e) => {console.log("여기..")});
    }
    loadMember();
    // loadApplier();
    
  }, []);
  return (
    <div style={{ padding: "24px 0" }}>
      {isleader ? (
        <Wrapper>
          <Grouptitlediv>
            <Challengebtn onClick={() => window.location.href = "/group"}>
              뒤로 가기
            </Challengebtn>
            <GroupNamediv>{title}</GroupNamediv>
            <Challengebtn onClick={openCreateModal}>그룹 정보 변경</Challengebtn>
          </Grouptitlediv>
          <Joineddiv>
            <Availablediv>그룹 구성원</Availablediv>
            <Create open={createopen} close={closeCreateModal} groupid={id} />
            <Challengebtn onClick={openCreateModal}>그룹 삭제</Challengebtn>
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={member}
              columns={columns}
              pageSize={5}
              onSelectionModelChange={(itm) => setSelect(itm)}
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
              rows={member}
              columns={application}
              pageSize={5}
              onSelectionModelChange={(itm) => setSelect(itm)}
            />
          </div>
          <Joindiv>
            <div style={{ height: "51px" }}>
              <Acceptbtn
                onClick={() => window.confirm("정말 승인하시겠습니까?")}
              >
                승인하기{select[0]}
              </Acceptbtn>
              <Joinbtn onClick={() => window.confirm("정말 거절하시겠습니까?")}>
                거절하기
              </Joinbtn>
            </div>
          </Joindiv>
        </Wrapper>
      ) : (
        <Wrapper>
          그룹장만 관리할 수 있습니다.
        </Wrapper>
      )}
    </div>
  );
};

export default Groupmanage;
