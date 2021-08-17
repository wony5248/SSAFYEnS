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
    width: 150,
  },
  {
    field: "user_id",
    headerName: "그룹원 ID",
    headerClassName: "super-app-theme--header",
    width: 350,
  },
  {
    field: "name",
    headerName: "그룹원 이름",
    headerClassName: "super-app-theme--header",
    width: 350,
  },
  {
    field: "joined_at",
    headerName: "가입 날자",
    headerClassName: "super-app-theme--header",
    width: 350,
  },
  {
    field: "is_group_admin",
    headerName: "그룹장 여부",
    headerClassName: "super-app-theme--header",
    width: 230,
  },
];

const application = [
  {
    field: "id",
    headerName: "번호",
    headerClassName: "super-app-theme--header",
    width: 160,
  },
  {
    field: "user_id",
    headerName: "지원자 ID",
    headerClassName: "super-app-theme--header",
    width: 250,
  },
  {
    field: "reason",
    headerName: "가입 문구",
    headerClassName: "super-app-theme--header",
    width: 640,
  },
  {
    field: "applied_at",
    headerName: "가입 요청 날자",
    headerClassName: "super-app-theme--header",
    width: 240,
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

const GroupNamediv = styled1.button`
  height: 100%;
  background-color: #a3cca3;
  padding: 0 48px;
  border: none;
  border-radius: 45px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:20px;
  cursor: pointer;
  &:hover{
    background-color: #69a569;
  }
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
  const [select, setSelect] = useState("");
  const [select2, setSelect2] = useState("");
  const [title, setTitle] = useState("");
  const [applier, setApplier] = useState([]);
  const [member, setMember] = useState([]);
  const openCreateModal = () => {
    setCreateopen(true);
  };

  const closeCreateModal = () => {
    setCreateopen(false);
  };
  const { id } = props;
  const Delete = async () => {
    if (window.confirm(`${title} 그룹을 삭제 하시겠습니까?`)) {
      await groupAPI
        .deleteGroup(id)
        .then((data) => {
          window.alert(`${title} 그룹이 삭제되었습니다.`);
          window.location.href = "/group";
        })
        .catch((e) => {
          window.alert("그룹원을 다 추방시키고 다시 시도해 주십시오.");
        });
    } else {
      window.alert("그룹 삭제가 취소되었습니다.");
    }
  };
  const Accept = async () => {
    if (select2) {
      if (
        window.confirm(
          `${applier[select2 - 1].user_id}의 가입 신청을 승인하시겠습니까?`
        )
      ) {
        await groupAPI
          .joinGroup(id, applier[select2 - 1].user_id)
          .then((data) => {
            window.alert(
              `${applier[select2 - 1].user_id}의 가입 신청이 승인되었습니다.`
            );
            window.location.reload();
          })
          .catch((e) => {
            window.alert("가입 승인이 되지 않았습니다.");
          });
      } else {
        window.alert("가입 승인이 취소 되었습니다.");
      }
    } else {
      window.alert("승인할 신청자를 골라주세요.");
    }
  };
  const Reject = async () => {
    if (select2) {
      if (
        window.confirm(
          `${applier[select2 - 1].user_id}의 가입 신청을 거절하시겠습니까?`
        )
      ) {
        await groupAPI
          .exileGroup(id, applier[select2 - 1].user_id)
          .then((data) => {
            window.alert(
              `${applier[select2 - 1].user_id}의 가입 신청이 거절되었습니다.`
            );
            window.location.reload();
          })
          .catch((e) => {
            window.alert("가입 거절이 되지 않았습니다.");
          });
      } else {
        window.alert("가입 거절이 취소 되었습니다.");
      }
    } else {
      window.alert("거절할 신청자를 골라주세요.");
    }
  };
  const Exile = async () => {
    console.log(select - 1);
    if (select) {
      if (window.confirm(`${member[select - 1].user_id}을 추방하시겠습니까?`)) {
        await groupAPI
          .exitGroup(id, member[select - 1].user_id)
          .then((data) => {
            window.alert(`${member[select - 1].user_id}이 추방 되었습니다.`);
            window.location.reload();
          })
          .catch((e) => {
            window.alert("추방이 되지 않았습니다.");
          });
      } else {
        window.alert("추방이 취소 되었습니다.");
      }
    } else {
      window.alert("추방할 그룹원을 골라주세요.");
    }
  };

  useEffect(() => {
    async function loadMember() {
      console.log(id);
      await groupAPI
        .getGroup(id)
        .then(({ data }) => {
          
          for (let i = 0; i < data.members.length; i++) {
            data.members[i].id = i + 1;
            data.members[i].joined_at = moment(
              data.members[i].joined_at
            ).format("YYYY년MM월DD일");
            if (
              data.members[i].user_id === window.sessionStorage.getItem("id") &&
              data.members[i].is_group_admin === true
            ) {
              setIsleader(true);
            }
          }
          setTitle(data.name);
          setMember(data.members);
          console.log(data.members);
        })
        .catch((e) => {
          console.log("여기..");
        });
    }
    async function loadApplier() {
      console.log(id);
      await groupAPI
        .applicantListGroup(id)
        .then(({ data }) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            data[i].id = i + 1;
            data[i].applied_at = moment(data[i].applied_at).format(
              "YYYY년MM월DD일"
            );
          }
          console.log(data);
          setApplier(data);
        })

        .catch((e) => {
          console.log("여기..");
        });
    }
    loadMember();
    loadApplier();
  }, []);
  return (
    <div style={{ padding: "24px 0" }}>
      {isleader ? (
        <Wrapper>
          <Grouptitlediv>
            <Challengebtn onClick={() => (window.location.href = "/group")}>
              뒤로 가기
            </Challengebtn>
            <GroupNamediv onClick={() => window.location.href= `/group/${id}`}>{title}</GroupNamediv>
            <Challengebtn onClick={openCreateModal}>
              그룹 정보 변경
            </Challengebtn>
          </Grouptitlediv>
          <Joineddiv>
            <Availablediv>그룹 구성원</Availablediv>
            <Create open={createopen} close={closeCreateModal} groupid={id} />
            <Challengebtn onClick={Delete}>그룹 삭제</Challengebtn>
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
          <div style={{ height: "51px" }}>
              <Acceptbtn onClick={console.log("그룹장 위임")}>그룹장 위임</Acceptbtn>
              <Joinbtn onClick={Exile}>추방하기</Joinbtn>
            </div>
          </Joindiv>
          <Divider style={{ backgroundColor: "#a3cca3", margin: "40px 0" }} />
          <Joineddiv>
            <Availablediv>가입 신청 목록</Availablediv>
            <div
              style={{ width: "25%", display: "flex", alignItems: "center" }}
            >
            </div>
          </Joineddiv>
          <div style={{ height: 400, width: "100%" }}>
            <Muidatagrid
              rows={applier}
              columns={application}
              pageSize={5}
              onSelectionModelChange={(itm) => setSelect2(itm)}
            />
          </div>
          <Joindiv>
            <div style={{ height: "51px" }}>
              <Acceptbtn onClick={Accept}>승인하기</Acceptbtn>
              <Joinbtn onClick={Reject}>거절하기</Joinbtn>
            </div>
          </Joindiv>
        </Wrapper>
      ) : (
        <Wrapper
          style={{
            display: "flex",
            marginTop: "0px",
            justifyContent: "center",
            fontSize: "60px",
            textAlign: "center",
          }}
        >
          그룹장만 관리할 수 있습니다.
        </Wrapper>
      )}
    </div>
  );
};

export default Groupmanage;
