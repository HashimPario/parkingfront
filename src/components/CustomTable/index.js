"use client"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react';

const CustomTable = () => {
    const[userData,setUserData] = useState([]);

    useEffect(()=>{
      getUsers();
    },[])
  
    const getUsers = async () => {
      axios.get('https://parkingback.vercel.app/getUsers')
        .then((response)=> {
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
            getUsers();
        }).catch((res)=>{

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers && allUsers.map((item, index) =>
                            <TableRow className='table_head_class'>
                                <TableCell className='tableHeading'>{index + 1}</TableCell>
                                <TableCell className='tableHeading'>{item.name}</TableCell>
                                <TableCell className='tableHeading'>{item.email}</TableCell>
                                <TableCell className='tableHeading'><Button variant="contained" className="block-btn" color={item.isBlocked === "true" ? 'error' : 'success'} onClick={()=>blockUser(item._id, item.isBlocked)}>{item.isBlocked === "true" ? 'Blocked' : 'Un-Blocked'}</Button></TableCell>
                            </TableRow>
                        
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
export default CustomTable;