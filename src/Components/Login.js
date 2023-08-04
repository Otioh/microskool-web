import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MicroskoolIcon from '../Images/micro.png';
import { faLock, faKey, faUserLock, faEye } from '@fortawesome/free-solid-svg-icons';

import { updateUser } from '../Redux/Reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { funSeque } from 'flame-tools';
import { useSelector, useDispatch } from 'react-redux';
import { setalert, setload, setspin } from '../Redux/Reducers/displayReducer';
import { data, query } from '../App.Config';
import { DataGrid } from '@mui/x-data-grid'



function Login() {


    const dispatch = useDispatch()
    const user = useSelector((state) => {
        return state.userReducer.user;
    })
    const alert = useSelector((state) => state.displayReducer.display.alert)
    const { spin } = useSelector((state) => state.displayReducer.display);
    const [email, setEmail] = useState(user.email);
    const [password, setpassword] = useState(user.password)
    let next = '/synch';
    let navigate = useNavigate();


    useEffect(() => {

        setTimeout(() => {
            if (localStorage.getItem('email') !== null) {

                navigate('/synch')
            }
        }, 1000);

    }, [])

    const verified = () => {
        dispatch(setspin(true))

        axios.get(`${process.env.REACT_APP_BACKEND}auth/` + email).then((response) => {
            dispatch(setspin(false))
            if (response.data.success) {

                if (response.data.data) {
                    dispatch(setalert({ status: true, type: 'success', cap: 'Success', msg: response.data.message }));
                    next = ('/verifymail');

                } else {
                    dispatch(setalert({ status: true, type: 'success', cap: 'Success', msg: response.data.message }));

                }
                setTimeout(() => {
                    processes()
                    console.log(next)

                }, 2000);
            } else {

                dispatch(setalert({ status: true, type: 'warning', msg: response.data.message }));


            }

        }).catch(err => alert(('yes')))


    }







    const processes = () => {
        let ss = false;




        axios.post(`${process.env.REACT_APP_BACKEND}auth`, { email, password }).then((response) => {
            dispatch(setspin(false))
            if (response.data.success) {
                funSeque({ delaySeconds: 2, isPromise: false }, () => {
                    dispatch(updateUser(response.data.data[0]))
                    localStorage.setItem('email', response.data.data[0].email)
                    localStorage.setItem('first_name', response.data.data[0].first_name)
                    localStorage.setItem('surname', response.data.data[0].surname)
                    localStorage.setItem('phone', response.data.data[0].phone)
                    localStorage.setItem('matric', response.data.data[0].matric)
                    localStorage.setItem('institution', response.data.data[0].institution)
                    localStorage.setItem('department', response.data.data[0].department)
                    localStorage.setItem('level', response.data.data[0].level)
                    localStorage.setItem('campus', response.data.data[0].campus)
                    localStorage.setItem('coins', response.data.data[0].coins + '')
                    localStorage.setItem('image', response.data.data[0].image)
                    localStorage.setItem('password', response.data.data[0].password)
                },
                    () => {

                        dispatch(setalert({ status: true, cap: 'Email Verification', type: 'danger', msg: response.data.message }))

                        dispatch(setalert({ cap: 'Congrats', status: true, type: 'success', msg: response.data.message }))
                        dispatch(setspin(false))
                        return true

                    },
                    () => {

                    },
                    () => {

                        navigate(next);
                    }

                )
            } else {

                dispatch(setalert({ status: true, type: 'danger', cap: 'Error', msg: response.data.message }))
                dispatch(setload(false))
            }


        }).then(() => {
            ss = true
        }).catch(err => {
            dispatch(setspin(true))
            dispatch(setalert({ status: true, type: 'danger', cap: 'Error', msg: err + ", please try again" }))
        })
        return ss;

    }

    useEffect(() => {


        return () => {

            dispatch(setalert({ status: false, type: 'info' }))
        };
    }, [email, password]);

    return (
        <>

            <div className='mother centered'>

                <div className='card shadow margin'>
                    <div className='card-header'>
                        <img alt='Logo' className='microskool-icon' src={MicroskoolIcon} />
                        <b style={{ float: "right" }} className='microskool-title'>
                            Login
                        </b>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        e.persist()
                        verified()
                    }}>
                        <div className='card-body'>



                            <input required type='email' className='form-control' value={email} placeholder='E-Mail' onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <span style={{ display: 'flex' }}>
                                <input type='password' id='password' className='form-control' value={password} placeholder='Password ' onChange={(e) => {
                                    setpassword(e.target.value)
                                }} /><button style={{ outline: 0, border: 'none' }} className='btn' id='btn' onClick={() => {
                                    document.getElementById('password').type = 'text';
                                    document.getElementById('btn').disabled = true
                                }}  ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></button>
                            </span>
                        </div>
                        <div className='card-footer'>

                            <button disabled={spin} className='btn microskool-button' >
                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login
                            </button>
                            <br />
                            <Link to='/reset'>
                                <FontAwesomeIcon icon={faKey}></FontAwesomeIcon> Reset Password
                            </Link>
                            <Link to='/signup'>

                                <button className='btn microskool-text'>
                                    <FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon> Sign Up
                                </button>
                            </Link>

                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default Login