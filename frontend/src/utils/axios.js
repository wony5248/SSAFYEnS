import axios from 'axios';

const request = axios.create({
    baseURL:"http://i5a109.p.ssafy.io:8079"
});

export const scheduleAPI = {
    getMonthly: (date)=>{
        return request.get(`/schedule/month/${date}`, {
            date
        })
    },
    addSchedule:(title, started_at, deadline_at, date)=>{
        return request.post('/schedule', {
            date , title, context : 'test'
            , started_at, deadline_at, is_finished : false
        })
    }
};

export const userAPI = {
    addUser:(id, name, email, number, passwd)=>{
        return request.post('/user', {
            user_id:id, name, email, cellphone:number, password:passwd
        })
    },
    checkUserId:(id)=>{
        return request.get(`/user/duplicatecheckid/${id}`,{
            id
        })
    },
    checkUserEmail:(email)=>{
        return request.get(`/user/duplicatecheckemail/${email}`,{
            email
        })
    },
    checkUserPhone:(number)=>{
        return request.get(`/user/duplicatecheckcellphone/${number}`,{
            cellphone:number
        })
    }
};