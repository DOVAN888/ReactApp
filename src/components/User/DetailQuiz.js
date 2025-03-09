
import { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = (props) => {

    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    // lay tung cau hoi 
    const [dataQuiz ,setDataquiz]=useState([])
    const [index ,setIndex]=useState(0)
    console.log("check param",params);
    console.log("check location",location);
    useEffect(() => {
        fetchQuestion();
    }, [quizId])
    
    const fetchQuestion = async() => {
        let res = await getDataQuiz(quizId)
        console.log("check quest", res)
        
        if (res && res.EC === 0) {
            let raw = res.DT
          let data = _.chain(raw)
             // Nhóm các phần tử của mảng theo thuộc tính 'color'
               .groupBy("id")
             // 'key' là tên nhóm (cung id), 'value' là mảng các object có cùng màu
              .map((value, key) => {
                  console.log('value', value, 'key', key)
                  let answers = []
                  let questionDescription, image= null
                  value.forEach((item, index) => {
                      if (index === 0) {
                          questionDescription = item.description;
                          image = item.image
                      }
                      
                      answers.push(item.answers)
                  })
                 

                 // detail.questionId =key
                 return { questionId: key, answers,questionDescription,image }
              })
               .value()
            console.log("check data",data)
            setDataquiz(data)

        }
        
    }
    console.log("check dataQuiz", dataQuiz)
    

    // viet ham prew va next
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index -1)
    }

    // ham next 
    const handleNext = () => {
        if(dataQuiz && dataQuiz.length>index+1)
        setIndex(index +1)

        
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">Quiz{ quizId}:{location?.state?.quizTitle}</div>
               <hr/>
                <div className="q-body"> <img /> </div>
                <div className="q-content">
                    <Question
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">

                    <button className="btn btn-secondary"  onClick={()=>handlePrev()}>
                        
                        Prev</button>
                    <button className="btn btn-primary"  onClick={()=>handleNext()}>
                        Next</button>
                </div>

        </div>
            <div className="right-content">
                count down

        </div>

    </div>
    )
}


export default DetailQuiz


//Khi quizId thay đổi (hoặc khi component render lần đầu), hàm fetchQuestion() sẽ được gọi.
// .map((value, key) => {
//     console.log("Nhóm câu hỏi:", key);
// cai nay de lap gia tri cua gruoup
// })

// value.forEach((item, index) => {
//     console.log("Câu hỏi thứ", index, "trong nhóm có id =", item.id);
// })
//cai nay de lap gia tri tong value 
