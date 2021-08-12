import axios from 'axios';

const request = axios.create({
    baseURL:"http://i5a109.p.ssafy.io:8079",
    headers:{
        'content-type': 'application/json;charset=UTF-8'
    },
});


export const scheduleAPI = {
    getMonthly: (date)=>{
        return request.get(`/schedule/month/${date}`, {
            date
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    addSchedule:(title, started_at, deadline_at, date)=>{
        return request.post('/schedule', {
           date , title, context : 'test', expectstart_at : started_at, deadline_at, notificationtime : false
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    modifySchedule:(schedule_id)=>{
        return request.put(`/schedule/${schedule_id}`,{
            schedule_id
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    },
    deleteSchedule:(schedule_id)=>{
        return request.delete(`/schedule/${schedule_id}`,{
            schedule_id
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            } 
        })
    },
    getSchedule:(schedule_id) =>{
        return request.get(`/schedule/${schedule_id}`,{
            schedule_id
        },{
            headers:{
                access_token: window.sessionStorage.getItem('token')
            }
        })
    }
};

export const userAPI = {
    login: (id, password) =>{
        return request.post('/user/login', { 
            user_id:id, password
        }).then(response=>{
            const access_token = response.data.access_token;
            window.sessionStorage.setItem('token', access_token);
            
        }).catch(error=>{
            console.log(error);
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
        return request.get(`/user/logout`,{
            headers:{
                access_token : window.sessionStorage.getItem('token')
            }
        })
    }
}

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