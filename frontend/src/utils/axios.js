import axios from 'axios';

const request = axios.create({
    baseURL:"http://i5a109.p.ssafy.io:8079"
});

export const scheduleAPI = {
    getMonthly: (year, month)=>{
        return request.get(`/mvp/getMonthly/${year}/${month}`, {
            year, month
        })
    },
    addSchedule:(title, started_at, deadline_at, date)=>{
        return request.post('/mvp/addSchedule', {
            user_id : 'jbj', date , title, context : 'test'
            , started_at, finished_at : '2021-08-31', deadline_at, point : 10, is_finished : false
        })
    }
};

export const userAPI = {
    addUser:(id, name, email, number, passwd)=>{
        return request.post('/user', {
            user_id:id, name, email, cellphone:number, password:passwd
        })
    }
};