import axios from 'axios';

const request = axios.create({
    baseURL:"http://127.0.0.1:8079"
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

export const groupAPI = {
    addGroup:(name, context)=>{
        return request.post('/group', {
             name, context, 
        })
    },
    validateGroupName:(name)=>{
        return request.post(`/group/namevalidation`,{
            name
        })
    },
    findAllGroup:()=>{
        return request.post(`/group/search`,{
            q : ""
        })
    },
    getGroup:(id)=>{
        return request.get(`/group/${id}`)
    },
    updateGroup:(id)=>{
        return request.put(`/group/${id}`,{
        })
    },
    deleteGroup:(id)=>{
        return request.delete(`/group/${id}`,{
        })
    },
    searchGroup:(question)=>{
        return request.porst(`/group/search`,{
            q:question
        })
    },
}