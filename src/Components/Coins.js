import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera, faBook, faGear, faSearch, faTimes, faCheck, faCoins, faMoneyBill, faBank } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { updateUser } from '../Redux/Reducers/userReducer';
import { PaystackButton } from 'react-paystack';
import { setCourse, setEdit, setLogout, setMyCourses, setaddCourse, setTransactions, setFundCoins, setTransferCoins, setWithdrawCoins } from '../Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import UploadPix from './UploadPix';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { setalert, setload } from '../Redux/Reducers/displayReducer';
import { ProcessManager } from '../Process';
import { brown, lightGreen } from '@mui/material/colors';



function Coins() {
    const navFall = useSelector((state) => state.displayReducer.display.navigationFall);
    const user = useSelector((state) => state.userReducer.user);
    const { addCourse, uploadPix, myCourses, network, transactions, fundCoins, withdrawCoins, transferCoins } = useSelector((state) => state.generalReducer.general);

    const courses = useSelector((state) => state.generalReducer.general.courses);
    const [pereson, setPerson] = useState({ ...user });
    const [campuses, setcampuses] = useState([]);
    const [eNaira, seteNaira] = useState('')
    const [amount, setAmount] = useState(0);
    const { alert, locked } = useSelector((state) => state.displayReducer.display)
    const [charge, setcharge] = useState(0)
    const [pass, setpass] = useState('')
    const [id, setid] = useState('')
    const [processed, setprocessed] = useState(false)
    const [ben, setben] = useState({})


    const processes = () => {
        if (!amount > 0 || id === '') {
            dispatch(setalert({ ...alert, msg: 'Email cannot be empty and Amount must be greater than 0', type: 'danger', status: true, cap: 'Error' }))

        } else {
            axios.get(`${process.env.REACT_APP_BACKEND}users/` + id + '').then((res) => {
                if (res.data.success) {
                    setben(res.data.data[0]);
                    setprocessed(true)
                } else {
                    dispatch(setalert({ ...alert, msg: res.data.message, type: 'danger', status: true, cap: 'Error' }))
                }
            })
        }
    }


    useEffect(() => {

        if (locked) {
            navigate('/resume')
        }

    }, [locked])


  const columns = [
    {
      field: 'type', headerName: 'Trans. Type', width: 90, renderCell: ({ row: { type } }) => (
        <Box
          sx={{
            backgroundColor:
              type === "Credit"
                ? 'green'
                : 'brown',
            paddingX: "8px",
            borderRadius: "5px",
          }}
        >
          <Typography color="#fff">{type}</Typography>
        </Box>
      ),
},
    { field: 'transaction_id', headerName: 'Trans. ID', width: 90, editable:true },
    {
      field: 'item',
      headerName: 'Item',
      width: 150,

    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,

    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,

    },

    {
      field: 'date',
      headerName: 'Date',
      width: 150,


    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
  

    },
  ];





    const componentProps = {
        email: user.email,
        amount: (parseFloat(amount) + charge) * 100,
        metadata: {
            name: user.first_name + " " + user.surname,
            phone: user.phone,
        },
      publicKey: 'pk_live_fb900597742799bfb71394ddc6501da929054eec',
        text: "Pay Now",
        onSuccess: (msg) => {

            axios.post(`${process.env.REACT_APP_BACKEND}transactions`, { transaction_id: msg.reference, item: 'Wallet Funded', description_sender: 'Payment to fund Microskool eNaira wallet', description_receiver: 'Payment to fund Microskool eNaira wallet', sender: user.email, receiver: 'Microskool', amount, status: msg.message }).then((res) => {
                console.log(parseFloat(user.coins) + parseFloat(amount))
                axios.post(`${process.env.REACT_APP_BACKEND}users/` + user.email + '', { ...user, coins: parseFloat(user.coins) + parseFloat(amount) }).then((response) => {
                    dispatch(setalert({ ...alert, msg: res.data.message, type: 'success', status: true, cap: 'Success' }))
                    dispatch(setFundCoins(false))
                    axios.get(`${process.env.REACT_APP_BACKEND}transactions/` + user.email).then((response) => {
                        if (response.data.success) {
                            dispatch(setTransactions(response.data.data))
                            axios.get(`${process.env.REACT_APP_BACKEND}users/` + localStorage.getItem('email') + '').then((response) => {

                                if (response.data.success) {
                                    dispatch(updateUser(response.data.data[0]))

                                }

                            })
                        }
                    })
                })

            })
        },
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    }

    useEffect(() => {
        localStorage.setItem('last_page', location.hash)

    }, [])

    const [searchTeerm, setsearchTeerm] = useState("");
    const [departments, setdepartments] = useState([]);
    let added = false;
    let dispatch = useDispatch()
    let navigate = useNavigate();
    const [level, setlevel] = useState('');
    const [department, setdepartment] = useState('');
    const [code, setcode] = useState('');
    const [title, settitle] = useState('');
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}transactions/` + user.email).then((response) => {
            if (response.data.success) {
              const transacts = response.data.data.map((trans)=>{
      if(trans.sender===user.email){
        return {...trans, description:trans.description_sender, type:'Debit'}
      }else{
        return { ...trans, description: trans.description_receiver, type: 'Credit' }
      }
    })

              dispatch(setTransactions(transacts))
            }
        })

    }, [ ])


    const createCourse = ({ code, title, department, level }) => {

        if (network) {
            axios.post(`${process.env.REACT_APP_BACKEND}courses/`, { code, title, campus: user.campus, department, level, user: user.email }).then((res) => {
                if (res.data.success) {
                    dispatch(setalert({ ...alert, msg: res.data.message, type: 'success', status: true, cap: 'Success' }))
                    dispatch(setaddCourse(false))
                }
                else {
                    dispatch(setalert({ ...alert, msg: res.data.message, type: 'danger', status: true, cap: 'Error' }))
                }
            })
        } else {
            let feedback = '';
            feedback = ProcessManager.addProcess(
                () => {
                    axios.post(`${process.env.REACT_APP_BACKEND}courses/`, { code, title, campus: user.campus, department, level, user: user.email }).then((res) => {
                        if (res.data.success) {
                            dispatch(setalert({ ...alert, msg: res.data.message, type: 'success', status: true, cap: 'Success' }))
                        }
                        else {
                            dispatch(setalert({ ...alert, msg: res.data.message, type: 'danger', status: true, cap: 'Error' }))
                        }
                    })

                }
            )

            dispatch(setalert({ ...alert, msg: feedback, type: 'bad_network', status: true, cap: 'Processor' }))
            dispatch(setaddCourse(false))
            ProcessManager.addProcess(() => {
                location.reload()
            })
        }
    }


    const postCourse = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}courses/`, { code, title, campus: user.campus, department, level, user: user.email }).then((response) => {

        })
    }
    useEffect(() => {
        dispatch(setalert({ ...alert, msg: 'Select the courses for the Semester as features/services depends on your courses', cap: 'Info', status: true, type: 'info' }))


    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}courses/` + user.campus + '').then((response) => {

            if (response.data.success) {

                dispatch(setCourse(response.data.data))

            }
        })
        axios.get(`${process.env.REACT_APP_BACKEND}departments`).then((response) => {
            if (response.data.success) {
                setdepartments(response.data.data)
            }
        })
    }, [])


    return (
      <div>
        <Navigation active={"profile"} />
        <div className={navFall ? "board fall" : "board"}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card shadow">
                  <div className="card-header">
                    <div className="title">
                      <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> Mi
                      Wallet
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3"> 
                        <ul className=" list-group">
                          <h6>Wallet Actions</h6>
                          <li className="list-group-item">
                            <button
                              className="btn "
                              onClick={() => {
                                dispatch(setFundCoins(true));
                              }}
                            >
                              <FontAwesomeIcon
                               className=" text-microskool"
                                icon={faMoneyBill}
                              ></FontAwesomeIcon>{" "}
                              Fund Wallet
                            </button>
                            <button
                              className="btn "
                              onClick={() => {
                                dispatch(setTransferCoins(true));
                              }}
                            >
                              <FontAwesomeIcon className=" text-microskool" icon={faShare}></FontAwesomeIcon>{" "}
                              Transfer Coins
                            </button>
                            <button
                              className="btn "
                              onClick={() => {
                                dispatch(setWithdrawCoins(true));
                              }}
                            >
                              <FontAwesomeIcon  className=" text-microskool" icon={faBank}></FontAwesomeIcon>{" "}
                              Widthdraw
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="col-sm-9">
                        {addCourse ? (
                          <Modal
                            config={{ align: "flex-end", justify: "right" }}
                            header={"Create a New Course"}
                            body={
                              <>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      className="form-control"
                                      placeholder="Course Code"
                                      onChange={(e) => {
                                        setcode(e.target.value);
                                      }}
                                    />
                                  </div>

                                  <div className="col-sm-6">
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        setlevel(e.target.value);
                                      }}
                                    >
                                      <option>Select level</option>
                                      <option value="100">100</option>
                                      <option value="200">200</option>
                                      <option value="300">300</option>
                                      <option value="400">400</option>

                                      <option value="500">500</option>
                                    </select>
                                  </div>

                                  <div className="col-sm-6">
                                    <input
                                      className="form-control"
                                      placeholder="Course Title"
                                      onChange={(e) => {
                                        settitle(e.target.value);
                                      }}
                                    />
                                  </div>

                                  <div className="col-sm-6">
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        setdepartment(e.target.value);
                                      }}
                                    >
                                      <option>Select department</option>
                                      {departments.map((departmen) => {
                                        return (
                                          <option value={`${departmen.name}`}>
                                            {`${departmen.name}`}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            }
                            footer={
                              <>
                                <button
                                  className="btn microskool-button"
                                  onClick={() => {
                                    createCourse({
                                      code,
                                      title,
                                      department,
                                      level,
                                    });
                                  }}
                                >
                                  Add
                                </button>
                                <button
                                  className="btn-close"
                                  onClick={() => dispatch(setaddCourse(false))}
                                ></button>
                              </>
                            }
                          />
                        ) : (
                          <></>
                        )}

                        <h4 >
                          <FontAwesomeIcon
                            style={{ color: "gold" }}
                            icon={faCoins}
                          ></FontAwesomeIcon>{" "}
                          {parseFloat(user.coins).toFixed(2)}
                        </h4>
                        <div className=" table-responsive-lg">
                       
                          <div style={{ height: '420px' }}>
                          <DataGrid
                              rows={transactions}
                            columns={columns}
                           

                          />
                          </div>
                        </div>
                      </div>
                    </div>
                    {fundCoins ? (
                      <Modal
                        config={{ align: "flex-start", justify: "left" }}
                        header={"Fund your Wallet"}
                        body={
                          <>
                            <input
                              placeholder="Amount"
                              className="form-control"
                              type={"number"}
                              onChange={(e) => {
                                setAmount(e.target.value);
                                setcharge((0.9 * e.target.value) / 100);
                              }}
                            />
                            <span className="badge bg-secondary">
                              Transaction charge (0.9%):{" "}
                              <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>{" "}
                              {charge}
                            </span>
                          </>
                        }
                        footer={
                          <>
                            <PaystackButton
                              className="btn microskool-button"
                              {...componentProps}

                            />
                            <button
                              className="btn-close"
                              onClick={() => dispatch(setFundCoins(false))}
                            ></button>
                          </>
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </div>

                  {withdrawCoins ? (
                    <Modal
                      config={{ align: "flex-start", justify: "left" }}
                      header={"Withdraw to eNaira"}
                      body={
                        <>
                          <input
                            placeholder="Amount"
                            className="form-control"
                            type={"number"}
                            onChange={(e) => {
                              setAmount(e.target.value);
                              setcharge((0.9 * e.target.value) / 100);
                            }}
                          />
                          <input
                            placeholder="eNaira ID "
                            className="form-control"
                            type={"text"}
                            onChange={(e) => {}}
                          />
                        </>
                      }
                      footer={
                        <>
                          <button
                            className="btn microskool-button"
                            onClick={() => {
                              axios
                                .post(
                                  `${process.env.REACT_APP_BACKEND}transactions/validate`,
                                  {
                                    sender: user.email,
                                    amount,
                                    password: user.password,
                                  }
                                )
                                .then((resp) => {
                                  if (resp.data.success) {
                                    axios
                                      .post(
                                        `${process.env.REACT_APP_BACKEND}transactions`,
                                        {
                                          transaction_id:
                                            "T255" + Math.random() * 2344354,
                                          item: "Coins Withdrawal",
                                          description_sender:
                                            "Coins withdrawal request made by you",
                                          description_receiver: eNaira,
                                          sender: user.email,
                                          receiver: "Microskool",
                                          amount,
                                          status: "Pending",
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.success) {
                                          dispatch(
                                            setalert({
                                              ...alert,
                                              msg: "Withdrawal requested successfully, your request would be processed within 24 hours",
                                              type: "success",
                                              status: true,
                                              cap: "Success",
                                            })
                                          );
                                        } else {
                                          dispatch(
                                            setalert({
                                              ...alert,
                                              msg: res.data.message,
                                              type: "danger",
                                              status: true,
                                              cap: "Error",
                                            })
                                          );
                                        }
                                      });
                                  } else {
                                    dispatch(
                                      setalert({
                                        ...alert,
                                        msg: resp.data.message,
                                        type: "danger",
                                        status: true,
                                        cap: "Error",
                                      })
                                    );
                                  }
                                });
                            }}
                          >
                            Withdraw{" "}
                            <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                            {amount} Now{" "}
                          </button>{" "}
                          <button
                            className="btn-close"
                            onClick={() => dispatch(setWithdrawCoins(false))}
                          ></button>
                        </>
                      }
                    />
                  ) : (
                    <></>
                  )}

                  <div className="card-footer">
                    <button
                      className="btn btn-outline-secondary"
                      title="Profile"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      title="Settings"
                      onClick={() => {
                        navigate("/settings");
                      }}
                    >
                      <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>{" "}
                    </button>
                  </div>
                </div>
                {transferCoins ? (
                  <Modal
                    config={{ align: "flex-start", justify: "left" }}
                    header={"Transfer"}
                    body={
                      <>
                        <input
                          placeholder="Receiver's Email"
                          className="form-control"
                          type={"text"}
                          onChange={(e) => {
                            setid(e.target.value);
                          }}
                        />

                        <input
                          placeholder="Amount"
                          className="form-control"
                          type={"number"}
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                        />
                        {processed ? (
                          <div>
                            <img
                              src={ben.image}
                              alt="image"
                              style={{ width: "100px", borderRadius: "12px" }}
                            />
                            <h5>
                              {ben.first_name} {ben.surname}{" "}
                            </h5>
                            {ben.institution}
                            <input
                              placeholder="Confirm Password"
                              className="form-control"
                              type={"password"}
                              onChange={(e) => {
                                setpass(e.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    }
                    footer={
                      <>
                        {processed ? (
                          <button
                            className="btn microskool-button"
                            onClick={() => {
                              axios
                                .post(
                                  `${process.env.REACT_APP_BACKEND}transactions/validate`,
                                  {
                                    sender: user.email,
                                    amount,
                                    password: pass,
                                  }
                                )
                                .then((res) => {
                                  if (res.data.success) {
                                    axios
                                      .post(
                                        `${process.env.REACT_APP_BACKEND}transactions`,
                                        {
                                          transaction_id:
                                            "T255" + Math.random() * 2344354,
                                          item: "Coins Transfer",
                                          description_sender:
                                            "Coins Transfer made by you to " +
                                            ben.first_name +
                                            " " +
                                            ben.surname,
                                          description_receiver:
                                            "Coins transferred to you from " +
                                            user.first_name +
                                            " " +
                                            user.surname,
                                          sender: user.email,
                                          receiver: ben.email,
                                          amount,
                                          status: "Approved",
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.success) {
                                          axios
                                            .post(
                                              `${process.env.REACT_APP_BACKEND}users/` +
                                                user.email +
                                                "",
                                              {
                                                ...user,
                                                coins:
                                                  parseFloat(user.coins) -
                                                  parseFloat(amount),
                                              }
                                            )
                                            .then((response) => {
                                              dispatch(
                                                setalert({
                                                  ...alert,
                                                  msg: response.data.message,
                                                  type: "info",
                                                  status: true,
                                                  cap: "Info",
                                                })
                                              );
                                            });
                                          axios
                                            .post(
                                              `${process.env.REACT_APP_BACKEND}users/` +
                                                ben.email +
                                                "",
                                              {
                                                ...ben,
                                                coins:
                                                  parseFloat(ben.coins) +
                                                  parseFloat(amount),
                                              }
                                            )
                                            .then((response) => {
                                              dispatch(
                                                setalert({
                                                  ...alert,
                                                  msg: response.data.message,
                                                  type: "info",
                                                  status: true,
                                                  cap: "Info",
                                                })
                                              );
                                            });
                                          dispatch(
                                            setalert({
                                              ...alert,
                                              msg: res.data.message,
                                              type: "success",
                                              status: true,
                                              cap: "Success",
                                            })
                                          );
                                          dispatch(setTransferCoins(false));
                                          axios
                                            .get(
                                              `${process.env.REACT_APP_BACKEND}transactions/` +
                                                user.email
                                            )
                                            .then((response) => {
                                              if (response.data.success) {
                                                dispatch(
                                                  setTransactions(
                                                    response.data.data
                                                  )
                                                );
                                                axios
                                                  .get(
                                                    `${process.env.REACT_APP_BACKEND}users/` +
                                                      localStorage.getItem(
                                                        "email"
                                                      ) +
                                                      ""
                                                  )
                                                  .then((response) => {
                                                    if (response.data.success) {
                                                      dispatch(
                                                        updateUser(
                                                          response.data.data[0]
                                                        )
                                                      );
                                                    }
                                                  });
                                              }
                                            });
                                        } else {
                                          dispatch(
                                            setalert({
                                              ...alert,
                                              msg: "Transaction Failed",
                                              type: "danger",
                                              status: true,
                                              cap: "Error",
                                            })
                                          );
                                        }
                                      });
                                  } else {
                                    dispatch(
                                      setalert({
                                        ...alert,
                                        msg: res.data.message,
                                        type: "danger",
                                        status: true,
                                        cap: "Error",
                                      })
                                    );
                                  }
                                });
                            }}
                          >
                            Send {amount}
                          </button>
                        ) : (
                          <button
                            className="btn microskool-button"
                              onClick={processes}
                          >
                            Process
                          </button>
                        )}
                        <button
                          className="btn-close"
                          onClick={() => dispatch(setTransferCoins(false))}
                        ></button>
                      </>
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Coins