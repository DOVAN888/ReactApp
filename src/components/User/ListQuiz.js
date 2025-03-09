import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getQuizByUser } from "../../services/apiServices";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    //nagivate
    const navigate = useNavigate()
    
    // tao state
    const [arrQuiz, setArrayQuiz] = useState([])
    
    // ham nay ko truyen gi vao trong thi no se duoc goi mot lan sau khi render 
    useEffect(() => {
         getQuizByData()
    }, []);


    // 
    const getQuizByData= async() => {
        const res = await getQuizByUser()
        console.log("check",res)
        if (res && res.EC === 0) {
            setArrayQuiz(res.DT)
        }
     
    }

    return (
        <div className="list-quiz-container container">
             {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                              <div key={(index)} className="card" style={{ width: "18rem" }}>
               
                            <img src={quiz.image ? `data:image/jpeg;base64,${quiz.image}` : "default-image.jpg"} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz{ index +1}</h5>
                                    <p className="card-text">{ quiz.description}</p>
                                    <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle:quiz.description} })}>Start Now</button>
                                </div>
                            </div>
                        )
                    })
            }
            
            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    you don't have any quiz now ...
                </div>
            }
          
        </div>
    );
};

export default ListQuiz;
