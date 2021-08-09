import React, {useState} from 'react';
import styled from 'styled-components';
import Wrapper from './styles';
import CloseIcon from '@material-ui/icons/Close';
import { TextareaAutosize } from '@material-ui/core';
const Headdiv = styled.div`
    width:100%;
    height:60px;
    background-color: #a3cca3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`
const Bodydiv = styled.div`
    width:100%;
    height:100%;
    background-color: #ffffff;
    z-index:2;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`
const Titlediv = styled.div`
    width:95%;
    height:50px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 12px 2.5%;
    color:black;
`
const Contentdiv = styled.div`
    width:95%;
    height:400px;
    display: flex;
    padding: 0 2.5%;
    align-items: center;
    justify-content:space-between;
    color:black;
`
const Bottomdiv = styled.div`
    width:95%;
    height:60px;
    padding: 0 2.5%;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    color: black;
`
const Rounddiv = styled.div`
    width:180px;
    height:40px;
    border-radius: 45px;
    background-color: #a3cca3;
    color:white;
    display:flex;
    justify-content: center;
    align-items: center;
`
const Closebtn = styled.button`
    height:60px;
    margin-right:12px;
    background-color: #a3cca3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border: none;
    cursor: pointer;
`
const Textcontent = styled.textarea`
    height:85%;
    resize: none;
    width: 510px;
    border-radius:45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    padding: 20px;
    &:focus{
        outline: none;
      }
`
const Texttitle = styled.textarea`
    resize: none;
    height:20px;
    width: 45%;
    border-radius:45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    padding: 8px;
    &:focus{
        outline: none;
      }
`
const Duplicatebtn = styled.button`
    height:40px;
    background-color: #a3cca3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 8px;
    border:none;
    &:hover{
        background-color: #69a569;
    }
    
`
const Createbtn = styled.button`
    height:50px;
    width:60px;
    background-color: #a3cca3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:16px;
    color: white;
    border-radius: 8px;
    border:none;
    &:hover{
        background-color: #69a569;
    }
    
`
const Create = (props) =>{
    const { open, close } = props;
    return(
        <div>
            {open? (
                <Wrapper>
                    <Headdiv>
                        <div></div>
                        <div>그룹생성</div>
                        <Closebtn onClick={close}><CloseIcon></CloseIcon></Closebtn>
                    </Headdiv>
                    <Bodydiv>
                        <Titlediv>
                            <Rounddiv>그룹 이름</Rounddiv>
                            <Texttitle ></Texttitle>
                            <Duplicatebtn>중복 확인</Duplicatebtn>
                        </Titlediv>
                        <Contentdiv>
                            <Rounddiv>그룹 설명</Rounddiv>
                            <Textcontent></Textcontent>
                            </Contentdiv>
                        <Bottomdiv><Createbtn onClick={close}>생성</Createbtn></Bottomdiv>
                    </Bodydiv>
                </Wrapper>
            ) : null}
        </div>
    );
};

export default Create;