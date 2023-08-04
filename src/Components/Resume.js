import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera, faMoneyBill, faBoxOpen, faBarsProgress, faArrowRightFromBracket, faEye } from '@fortawesome/free-solid-svg-icons';

import icon from '../Images/micro.png';
import { useNavigate } from 'react-router-dom';
import { setalert, setLocked } from '../Redux/Reducers/displayReducer';
import { updateUser } from '../Redux/Reducers/userReducer';

function Resume() {
    const user = useSelector((state) => state.userReducer.user);
    const alert = useSelector((state) => state.displayReducer.display.alert)
    const [password, setpassword] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch()


    return (
        <div style={{ backgroundColor: 'rgb(83,83,170)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', overflow: 'auto', flexDirection: 'column' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', padding: '20px', backgroundColor: 'lightgray', borderRadius: '50%' }}>


                <img alt='Logo' style={{ width: '90px' }} src={icon} />
            </div>
            <br />
            <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '7px', color: 'white' }}>
                <center>
                    <h4>{user.surname} {user.first_name} </h4>
                    <h6> {user.matric} </h6>

                </center>
            </div>
            <div style={{ display: 'flex' }}>
                <input placeholder='Confirm Password' className='form-control' type={'password'} onChange={(e) => {
                    setpassword(e.target.value)
                    dispatch(setalert({ ...alert, status: false }))
                }} />
            </div>
            <div>
                <button className='btn btn-danger' style={{ margin: '5px' }} onClick={() => {
                    dispatch(updateUser({}))
                    localStorage.clear();
                }}>
                    <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
                </button>
                <button className='btn btn-success' style={{ margin: '5px' }} onClick={() => {
                    if (password === user.password) {

                        dispatch(setLocked(false))
                        if (localStorage.getItem('last_page') !== null && localStorage.getItem('last_page') !== '#/login' && localStorage.getItem('last_page') !== '#/resume') {
                            location.hash = localStorage.getItem('last_page')
                        } else {
                            navigate('/dashboard')
                        }
                    } else {
                        dispatch(setalert({ ...alert, msg: 'Wrong Password', type: 'danger', status: true, cap: 'Error' }))

                    }
                }}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>  Resume
                </button>

            </div>
        </div>
    )
}

export default Resume