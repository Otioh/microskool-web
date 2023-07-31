import React from 'react';
import Navigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";

function CBT() {
    const navFall = useSelector(
        (state) => state.displayReducer.display.navigationFall
    );
    
  return (
   <>
   
          <Navigation active={"dashboard"} />
          <div className={navFall ? "board fall" : "board"}>
<div className='container'>
    <div>
        <header className='title'>
General Studies Exams
        </header>
    </div>
<div className='row'>
<div className='col-sm-6 bg-light ' style={{padding:'20px', border:'10px'}} >
    <div style={{backgroundColor:'whitesmoke', borderRadius:'10px', padding:'10px', fontSize:'large'}}>
Questions
                              Questions Questions Questions Questions QuestionsQuestionsQuestions QuestionsQuestionsQuestionsv Questions Questions Questions    
    </div>
</div>
                      <div className='col-sm-6 bg-light' style={{ padding: '20px', border: '10px' }}>
<h4>

Options
</h4>
<div className='exam-option' style={{backgroundColor:'whitesmoke', padding:'10px', borderRadius:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}}>
                              <input type='radio' id='A' name='option' />
                              <label for='A' style={{ flex: 1, paddingLeft: '20px', cursor: 'pointer' }}>
        Option One
    </label>
</div>

                          <div className='exam-option' style={{ backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                              <input type='radio' id='B' name='option' />
                              <label for='B' style={{ flex: 1, paddingLeft: '20px', cursor: 'pointer' }}>
                                  Option Two
                              </label>
                          </div>

                          <div className='exam-option' style={{ backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                              <input type='radio' id='C' name='option' />
                              <label for='C' style={{ flex: 1, paddingLeft: '20px', cursor: 'pointer' }}>
                                  Option Three
                              </label>
                          </div>

                          <div className='exam-option' style={{ backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                              <input type='radio' id='D' name='option' />
                              <label for='D' style={{ flex: 1, paddingLeft: '20px', cursor: 'pointer' }}>
                                  Option Four
                              </label>
                          </div>    


</div>
</div>



    </div>







            </div>


            </>
  )
}

export default CBT