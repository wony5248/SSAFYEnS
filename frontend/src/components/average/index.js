import React, {useState} from 'react';
import {Grid, Typography, FormControl, Select,MenuItem  } from '@material-ui/core';
import Daily from './daily';
import Weekly from './weekly';
import Monthly from './monthly';
import Wrapper from './styles';

const PlanAverage = () =>{
    const [menu, setMenu] = useState('daily');

    const handleMenu = (event) =>{
        setMenu(event.target.value);
    }

    const titleMenu=()=>{
        let result = [];
        if (menu === 'daily'){
            result = result.concat(<Typography variant="h3" style={{textAlign: 'center'}}>일별 일정 평가 확인</Typography>);
        }else if (menu === 'weekly'){
            result = result.concat(<Typography variant="h3" style={{textAlign: 'center'}}>주간 일정 평가 확인</Typography>);
        }else if (menu === 'monthly'){
            result = result.concat(<Typography variant="h3" style={{textAlign: 'center'}}>월별 일정 평가 확인</Typography>);
        }
        return result;
    }

    const contentMenu=()=>{
        let result = [];
        if (menu === 'daily'){
            result = result.concat(<Daily/>);
        }else if (menu === 'weekly'){
            result = result.concat(<Weekly/>);
        }else if (menu === 'monthly'){
            result = result.concat(<Monthly/>);
        }
        return result;
    }

    return(
        <Wrapper>
            {/* header */}
            <div style={{margin:'15px'}}>
                <Grid container direction="row" style={{width: '100%'}}>
                    <div>
                        <FormControl variant="outlined" style={{width:'150px'}}>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={menu}
                            onChange={handleMenu}
                            >
                            <MenuItem value={'daily'}>Daily</MenuItem>
                            <MenuItem value={'weekly'}>Weekly</MenuItem>
                            <MenuItem value={'monthly'}>Monthly</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{width:'85%'}}>
                        {titleMenu()}
                    </div>
                </Grid>
                <div style={{width: '100%', height: '1px', background:'#A3CCA3', marginTop: '20px'}}></div>
            </div>
            {contentMenu()}
        </Wrapper>
    );
};

export default PlanAverage;