import React, {useState, useEffect} from 'react';
import {Grid, Button, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import Wrapper from './styles';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {userAPI, scheduleAPI, groupAPI} from '../../utils/axios';

const MainSession = () =>{
    const [select, setSelect] = useState(false);
    const [query, setQuery] = useState("react");
    const [data, setData] = useState([]);
    const [groupList, setGroup] = useState([]);
    const [scheduleList, setSchedule] = useState([]);

    const groupSettings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow: 1,
        slideseToScroll:1,
    };

    const scheduleSettings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow: 1,
        slideseToScroll:1,
    };

    useEffect(() => {
        let completed = false;
    
        async function getMyPage() {
            try{
                let result = await userAPI.mypage(
                window.sessionStorage.getItem('id')
                );
                setData(result.data);
                
                if(result.data.mygroups.length>0) {
                    setGroup(result.data.mygroups);
                }else{
                    setGroup([{group_id:0, name:'가입한 그룹이 없습니다.', ranking:'그룹에 가입해보세요 !'}]);
                }

                result = await scheduleAPI.getMonthly(moment().format('YYYY-MM-DD'));
                let lst = [];
                for(let i=0; i<result.data.length;i++){
                    if(moment(result.data[i].date).format('YYYY-MM-DD')===moment().format('YYYY-MM-DD')){
                        lst = lst.concat(result.data[i]);
                    }
                }
                if(lst.length>0){
                    setSchedule(lst);
                }else{
                    setSchedule([{schedule_id:0, title:'오늘 일정이 없습니다.'}]);
                }
                console.log(result.data);
            }catch (err) {
                console.log(err);
            }
        }
        getMyPage();
        return () => {
          completed = true;
        };
      }, [query]);
    
    return(
        <Wrapper>
            {/* schedule */}
            <div style={{margin:'30px', border: '1px solid #A3CCA3', borderRadius: 25, width:'500px', height:'300px'}}>
                <Typography variant="overline" style={{fontSize: 30, margin:'15px'}}>MY SCHEDULE</Typography>
                <Grid style={{width:'450px', margin:'15px'}}>
                    <Slider {...scheduleSettings}>
                        {scheduleList.map(item=>{
                            return(
                                <Card key={item.schedule_id} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h4" style={{margin:'1px'}}>{item.title}</Typography>
                                        <Typography variant="h6" style={{margin:'1px'}}>{moment(item.started_at).format('HH:mm')} 에 일정 시작</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={()=>select? null : window.location.replace(`/planlist/${moment().format('YYYY-MM-DD')}`) }>SCHEDULE LIST</Button>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Slider>
                </Grid>
            </div>
            {/* group */}
            <div style={{margin:'30px', border: '1px solid #A3CCA3', borderRadius: 25, width:'500px', height:'300px'}}>
                <Typography variant="overline" style={{fontSize: 30, margin:'15px'}}>MY GROUP</Typography>
                <Grid style={{width:'450px', margin:'15px'}}>
                    <Slider {...groupSettings}>
                        {groupList.map(item=>{
                            return(
                                <Card key={item.group_id} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h4" style={{margin:'1px'}}>{item.name}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={()=>select? null : window.location.replace(`/group/${item.group_id}`) }>GROUP HOME</Button>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Slider>
                </Grid>
            </div>
            
        </Wrapper>
    );
};

export default MainSession;