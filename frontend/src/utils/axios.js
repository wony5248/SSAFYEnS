import axios from "axios";

const request = axios.create({
  baseURL:"http://i5a109.p.ssafy.io:8079",
//   baseURL: "http://127.0.0.1:8079",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "access_token" : window.sessionStorage.getItem("token")
  },
});

export const scheduleAPI = {
    getMonthly: async (date)=>{
        return await request.get(`/schedule/month/${date}`, {
            date
        })
    },
    addSchedule: async (title, started_at, deadline_at, date, notification, notificationtime=null)=>{
        return await request.post('/schedule', {
           date, title, context : 'test', started_at, deadline_at, notification, finished_at:deadline_at, notificationtime
        }
        
        ).then(function (response) {
          console.log(response);
        })
    },
    modifySchedule: async (schedule_id, date, title, notification, started_at, deadline_at, finished_at, notificationtime)=>{
        return await request.put(`/schedule/${schedule_id}`,{
            schedule_id, date, title, started_at, deadline_at, finished_at, notification, notificationtime
        })
    },
    deleteSchedule: async (schedule_id)=>{
        return request.delete(`/schedule/${schedule_id}`,{
            schedule_id
        })
    },
    getSchedule: async (schedule_id) =>{
        return await request.get(`/schedule/${schedule_id}`,{
            schedule_id
        })
    },
    getDailyAverage: async (date)=>{
        return request.get(`/average/daily/${date}`,{
            date
        })
    },
    getWeeklyAverage: async (date)=>{
        return await request.get(`/average/weekly/${date}`,{
          date
        })
    },
    getMonthlyAverage: async (date)=>{
        return await request.get(`/average/monthly/${date}`,{
            date
        })
    }
};

export const userAPI = {
    login: async (id, password) =>{
        return await request.post('/user/login', { 
            user_id:id, password
        }).then(response=>{
            const access_token = response.data.access_token;
            window.sessionStorage.setItem('token', access_token);
        }).catch(error=>{
            console.log(error);
        })
    },
    checkUserId: async (id)=>{
        return await request.get(`/user/duplicatecheckid/${id}`,{
            user_id: id
        })
    },
    checkUserPhone: async (number)=>{
        return await request.get(`/user/duplicatecheckcellphone/${number}`,{
            cellphone: number
        })
    },
    checkUserEmail: async (email)=>{
        return request.get(`/user/duplicatecheckemail/${email}`,{
            email
        })
    },
    addUser:async (id, name, email, number, password)=>{
        return await request.post(`/user`,{
            user_id: id, name, email, cellphone:number, password
        })
    },
    mypage: async (user_id)=>{
        return await request.get(`/user/${user_id}`,{
            user_id
        }).catch(e=>{
            console.log(e);
        })
    },
    logout:async ()=>{
        return await request.get(`/user/logout`)
    },
    findId: async (name, email)=>{
        return await request.post(`/user/id`,{
            name, email
        })
    },
    findPw: async (name, id, email)=>{
        return await request.post('/user/password',{
            name, user_id:id, email
        })
    },
    resetPw:async (id, password)=>{
        return await request.put('/user/password',{
            user_id:id, password
        })
    },
    getTrophy:async (user_id)=>{
        return await request.get(`/user/${user_id}/trophy`,{
            user_id
        }
        )
    },
    modifyUser:async (user_id, name, email, cellphone, password)=>{
        return await request.put(`/user/${user_id}`,{
            user_id, name, email, cellphone, password
        })
    }
}

export const groupAPI = {
  assignmentAdmin : async (group_id, user_id) => {
    return await request.post(
      `/group/${group_id}/group_admin/${user_id}`      
    );
  },
  addGroup: async (name, context) => {
    return await request.post(
      "/group",
      {
        name,
        context,
      },
      
    );
  },
  validateGroupName: async (name) => {
    return await request.post(
      `/group/namevalidation`,
      {
        name,
      },
      
    );
  },
  findAllGroup: async () => {
    return await request.post(`/group/search`, {
      q: "",
    });
  },
  getGroup: async (groupid) => {
    return await request.get(`/group/${groupid}` );
  },
  updateGroup: async (groupid, title, content) => {
    return await request.put(
      `/group/${groupid}`,
      { name: title, context: content },
    );
  },
  deleteGroup: async (groupid) => {
    return await request.delete(`/group/${groupid}`);
  },
  searchGroup: async (question) => {
    return await request.post(
      `/group/search`,
      {
        q: question,
      },
    );
  },
  // 그룹 가입 신청 목록
  applicantListGroup: async (groupid) => {
    return await request.get(`/group/${groupid}/applicant`);
  },
  // 그룹 가입 신청
  applicantGroup: async (groupid, reas) => {
    return await request.post(
      `/group/${groupid}/applicant`,
      {
        reason: reas,
      },
    );
  },
  // 그룹 가입 신청 취소?
  rejectGroup: async (groupid) => {
    return await request.delete(`/group/${groupid}/applicant`);
  },
  // 그룹 신청 승인
  joinGroup: async (groupid, userid) => {
    return await request.post(`/group/${groupid}/applicant/${userid}`);
  },
  //그룹 신청 거절
  exileGroup: async (groupid, userid) => {
    return await request.delete(`/group/${groupid}/applicant/${userid}`);
  },
  //그룹 추방 / 탈퇴
  exitGroup: async (groupid, userid) => {
    return await request.delete(`/group/${groupid}/member/${userid}`);
  },
};

export const challengeAPI = {
  addChallenge : async (group_id, name, content) => {
    return await request.post(
      `/challenge`,{group_id:group_id, name:name, content:content}     
    );
  },
  getChallenge : async () => {
    return await request.get(
      `/challenge`      
    );
  },
};

