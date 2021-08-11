import axios from 'axios';

const request = axios.create({
    baseURL:"http://i5a109.p.ssafy.io:8079",
});

export const scheduleAPI = {
    getMonthly: (date)=>{
        return request.get(`/schedule/month/${date}`, {
            date
        })
    },
    addSchedule:(title, started_at, deadline_at, date)=>{
        return request.post('/schedule', {
           date , title, context : 'test', expectstart_at : started_at, deadline_at, notificationtime : false
        })
    }
};

export const userAPI = {
    login: (id, password) =>{
        return request.post('/user/login', { 
            user_id:id, password
        }).then(response=>{
            const accessToken = response.data.access_token;
            window.sessionStorage.setItem("token", `${accessToken}`);
        })
    },
    checkUserId: (id)=>{
        return request.get(`/user/duplicatecheckid/${id}`,{
            user_id: id
        })
    },
    checkUserPhone: (number)=>{
        return request.get(`/user/duplicatecheckcellphone/${number}`,{
            cellphone: number
        })
    },
    checkUserEmail: (email)=>{
        return request.get(`/user/duplicatecheckemail/${email}`,{
            email
        })
    },
    addUser:(id, name, email, number, password)=>{
        return request.post(`/user`,{
            user_id: id, name, email, cellphone:number, password
        })
    },
    mypage: (id)=>{
        return request.get(`/user/${id}`,{
            user_id:id
        })
    },
    logout:()=>{
        console.log(window.sessionStorage.getItem("token"));
        return request.get(`/user/logout`,{
            headers:{
                access_token: window.sessionStorage.getItem("token")
            }
        })
    }
}