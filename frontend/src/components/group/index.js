import React, { useState, useEffect } from "react";
import Wrapper from "./styles";
import { DataGrid } from "@material-ui/data-grid";
import styled1 from "styled-components";
import { styled, makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import Create from "../groupcreate";
import axios from "axios";
import { groupAPI } from "../../utils/axios";
const columns = [
  {
    field: "group_id",
    headerName: "그룹 번호",
    headerClassName: "super-app-theme--header",
    width: 140,
  },
  {
    field: "name",
    headerName: "그룹 이름",
    headerClassName: "super-app-theme--header",
    width: 460,
    editable: true,
  },
  {
    field: "context",
    headerName: "그룹 설명",
    headerClassName: "super-app-theme--header",
    width: 460,
    editable: true,
  },
  {
    field: "pax",
    headerName: "그룹 인원",
    headerClassName: "super-app-theme--header",
    width: 140,
    editable: true,
  },
  {
    field: "ranking",
    headerName: "그룹 랭킹",
    headerClassName: "super-app-theme--header",
    width: 140,
    editable: true,
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

const Joineddiv = styled1.div`
  display:flex;
  justify-content: space-between;
  height: 51px;
  margin-bottom: 2.5%;
`;

const Joinedbtn = styled1.button`
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
  const [createopen, setCreateopen] = useState(false);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [row, setRow] = useState([]);
  const [isleader, setIsleader] = useState(true);
  const openCreateModal = () => {
    setCreateopen(true);
  };

  const closeCreateModal = () => {
    setCreateopen(false);
  };
  const handleMove = () => {
    if (isleader === true) {
      window.location.replace(`/group/${select2[0]}/manage`)
    }
    else{
      window.location.replace(`/group/${select2[0]}`)
    }
  }
  useEffect(() => {
    async function loadGroup() {
      await groupAPI
        .findAllGroup()
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            data[i].id = data[i].group_id;
          }
          setRow(data);
        })
        .catch((e) => {});
    }
    loadGroup();
  }, []);
  return (
    <div>
      <Wrapper>
        <Joineddiv>
          <Availablediv>가입 가능한 그룹</Availablediv>
          <Create open={createopen} close={closeCreateModal} />
          <Joinedbtn onClick={openCreateModal}>그룹 생성</Joinedbtn>
        </Joineddiv>

        <div style={{ height: 400, width: "100%" }}>
          <Muidatagrid
            rows={row}
            columns={columns}
            pageSize={5}
            onSelectionModelChange={(itm) => setSelect(itm)}
          />
        </div>
        <Joindiv>
          <Joinbtn
            onClick={() =>
              window.confirm("선택한 그룹 정보화면으로 이동하시겠습니까?")
                ? select[0]
                  ? window.location.replace(`/group/${select[0]}`)
                  : window.alert("그룹을 선택해 주세요")
                : console.log("아무일 없음")
            }
          >
            가입
          </Joinbtn>
        </Joindiv>
      </Wrapper>
      <Divider style={{ backgroundColor: "#a3cca3" }} />
      {isgroup ? (
        <Wrapper>
          <Joineddiv>
            <Availablediv>내가 가입한 그룹</Availablediv>
            <Joinedbtn
              onClick={() =>
                select2[0]
                  ? handleMove()
                  : window.alert("그룹을 선택해 주세요")
              }
            >
              그룹 관리
            </Joinedbtn>
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={row}
              columns={columns}
              pageSize={5}
              onSelectionModelChange={(itm) => setSelect2(itm)}
            />
          </div>
          <Joindiv>
            <Joinbtn
              onClick={() =>
                window.confirm(`${select2[0]}그룹을 정말 탈퇴하시겠습니까?`)
              }
            >
              탈퇴
            </Joinbtn>
          </Joindiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <Joineddiv>
            <Availablediv>내가 가입한 그룹</Availablediv>
          </Joineddiv>
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
