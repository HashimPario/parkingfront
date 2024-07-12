"use client"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import ToggleSwitch from '../Switch';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CustomTable = () => {

    // let userInfo = props.myValues;
    const[userData,setUserData] = useState([]);

    useEffect(()=>{
      getUsers();
    },[])
  
    const getUsers = async () => {
      axios.get('https://parkingback.vercel.app/getUsers')
        .then((response)=> {
          // console.log(response.data);
          setUserData(response.data)  
        })   
    }
    let allUsers = userData.filter(item => item.email !== 'admin@gmail.com')
    const[userBlock, setUserBlock] = useState();


    const blockUser = (val,blockStatus) => {
        blockStatus === "true" ? blockStatus = "false" : blockStatus = "true"   
        const res = axios.post(`https://parkingback.vercel.app/blockUser/${val}`,{
            blockStatus
        }).then((res)=>{
            console.log("THEN: ", res)
            getUsers();
            
        }).catch((res)=>{
            console.log("CATCH: ", res)
        })
    }

    return (
        <div>
            <TableContainer className='tablecontainer_class'>
                <Table
                    className='table_class'>
                    <TableHead>
                        <TableRow className='table_head_class'>
                            <TableCell className='tableHeading'>S.No</TableCell>
                            <TableCell className='tableHeading'>Name</TableCell>
                            <TableCell className='tableHeading'>Email</TableCell>
                            <TableCell className='tableHeading'>Status</TableCell>
                            <TableCell className='tableHeading'>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers && allUsers.map((item, index) =>
                            <TableRow className='table_head_class'>
                                <TableCell className='tableHeading'>{index + 1}</TableCell>
                                <TableCell className='tableHeading'>{item.name}</TableCell>
                                <TableCell className='tableHeading'>{item.email}</TableCell>
                                <TableCell className='tableHeading'>{item.isBlocked === "true" ? 'Blocked' : 'Un-Blocked'}</TableCell>
                                <TableCell className='tableHeading'><Button onClick={()=>blockUser(item._id, item.isBlocked)}>Click me</Button></TableCell>
                            </TableRow>
                        
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
export default CustomTable;