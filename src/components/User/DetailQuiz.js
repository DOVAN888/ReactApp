
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
                      item.answers.isSelected = false;// gan selected vao ans
                      answers.push(item.answers)// day mang item vua lap vao mang anserwer vua tao 
                  })
                 

                 // detail.questionId =key
                 return { questionId: key, answers,questionDescription,image }
              })
               .value()
            //console.log("check data",data)
            setDataquiz(data)

        }
        
    }
    //console.log("check dataQuiz", dataQuiz)
    

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
    // checkBox
    //cloneDeep ham nay se sao chep tat ca Object
    // con neu dung ham clone no chi sao chep duoc o tang ngoai thoi 
    // them dau cong dang truoc de neu chuyen nham chuoi string thi no se chuyen thanh kieu so douple
     // dung ham foreach no se khong tra ra mang moi ,nhung dung ham map no se tra ra mang moi

      
  const handleCheckbox = (answerId, questionId) => {
      let dataQuizClone = _.cloneDeep(dataQuiz);// copy toan bo object dataquiz thanh mang moi // clone nghia la ban sao hay sao chep
                                                // react hook ko co khai niem merger state nen ta danh phai clone 
    let question = dataQuizClone.find(item => +item.questionId === +questionId)//ten item la ten tuy y ban dat item la ten trong mang moi
    if (question && question.answers) {
        question.answers = question.answers.map(item => {
            if (+item.id === +answerId) {
                item.isSelected = !item.isSelected; // Cho phép check/uncheck
            }
            return item;
        })
    }
    //// Tìm vị trí (index) của phần tử này trong mảng 
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
        dataQuizClone[index] = question;
    }

    setDataquiz(dataQuizClone);
}


    // ham handle fisnish 
    const handleFinishQuiz = () => {
        console.log((">> check data sau khi submit", dataQuiz))
        let payload = {
            quizId: +quizId,// quizId chinh bang Id lay tren param
            answers: []
        };
        let answers=[];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                //dong nay de lap answer
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                    
                });
                 // push hai bien tren vao mang 
                 answers.push({
                    questionId: +questionId,
                    userAnswerId :userAnswerId
                })
            })
            payload.answers = answers;
            console.log("check answer",payload)
            };
           
        }
//ket qua cua doan nay se co dang 
//     check answer 
// {quizId: 1, answers: Array(3)}
// answers
// : 
// Array(3)
// 0
// : 
// {questionId: 1, userAnswerId: Array(0)}
// 1
// : 
// {questionId: 2, userAnswerId: Array(0)}
// 2
// : 
// {questionId: 3, userAnswerId: Array(0)}
// length
// : 
// 3
// [[Prototype]]
// : 
// Array(0)
// quizId
// : 
// 1
// [[Prototype]]
// : 
// Object
    

//     Giả sử dataQuiz hiện tại:

// js
// コピーする
// 編集する
// [
//   {
//     questionId: "1",
//     questionDescription: "Câu 1 là gì?",
//     image: "img1.png",
//     answers: [
//       { id: 11, description: "Đáp án A", isSelected: false },
//       { id: 12, description: "Đáp án B", isSelected: false }
//     ]
//   },
//   {
//     questionId: "2",
//     questionDescription: "Câu 2 là gì?",
//     image: "img2.png",
//     answers: [
//       { id: 21, description: "Đáp án A", isSelected: false }
//     ]
//   }
// ]
// Khi bạn gọi:
// js
// コピーする
// 編集する
// handleCheckbox(12, 1);
// cloneDeep sao chép dataQuiz.
// Tìm câu hỏi có questionId === 1.
// Trong answers của câu hỏi đó, tìm câu trả lời có id === 12 và đặt isSelected = true.
// Gán lại vào danh sách câu hỏi.


    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">Quiz{ quizId}:{location?.state?.quizTitle}</div>
               <hr/>
                <div className="q-body"> <img/> </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">

                    <button className="btn btn-secondary"  onClick={()=>handlePrev()}>
                        
                        Prev</button>
                    <button className="btn btn-primary"  onClick={()=>handleNext()}>
                        Next</button>
                      <button className="btn btn-warning"  onClick={()=>handleFinishQuiz()}>
                        Finish</button>
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



// 👉 Ví dụ dễ hiểu:

// Giả sử API trả về raw:

// js
// コピーする
// 編集する
// [
//   { id: 1, description: "Câu 1 là gì?", image: "img1.png", answers: { id: 11, description: "Đáp án A" }},
//   { id: 1, description: "Câu 1 là gì?", image: "img1.png", answers: { id: 12, description: "Đáp án B" }},
//   { id: 2, description: "Câu 2 là gì?", image: "img2.png", answers: { id: 21, description: "Đáp án A" }},
// ]
// Sau khi .groupBy("id"), ta sẽ có:

// js
// コピーする
// 編集する
// {
//    "1": [
//      {id:1, description:"Câu 1 là gì?", image:"img1.png", answers:{id:11, description:"Đáp án A"}},
//      {id:1, description:"Câu 1 là gì?", image:"img1.png", answers:{id:12, description:"Đáp án B"}}
//    ],
//    "2": [
//      {id:2, description:"Câu 2 là gì?", image:"img2.png", answers:{id:21, description:"Đáp án A"}}
//    ]
// }
// Sau .map, bạn sẽ nhận được 1 mảng:

// js
// コピーする
// 編集する
// [
//   {
//     questionId: "1",
//     questionDescription: "Câu 1 là gì?",
//     image: "img1.png",
//     answers: [
//       {id:11, description:"Đáp án A", isSelected:false},
//       {id:12, description:"Đáp án B", isSelected:false}
//     ]
//   },
//   {
//     questionId: "2",
//     questionDescription: "Câu 2 là gì?",
//     image: "img2.png",
//     answers: [
//       {id:21, description:"Đáp án A", isSelected:false}
//     ]
//   }
// ]

// let dataQuizClone = _.cloneDeep(dataQuiz);	Tạo ra 1 bản sao hoàn toàn mới của dataQuiz (không ảnh hưởng đến dữ liệu gốc).
// let question = dataQuizClone.find(item => +item.questionId === +questionId)	Tìm ra đối tượng câu hỏi có questionId khớp với tham số truyền vào.
// if (question && question.answers) { ... }	Nếu tìm thấy câu hỏi và câu hỏi có danh sách câu trả lời, thực hiện logic bên trong.
// let b = question.answerId.map(item => { ... })	⚠ Đây bị sai: question.answerId không đúng! Phải là question.answers.
// if (+item.id === +answerId) { item.isSelected = true; }	Nếu câu trả lời có id khớp với answerId được truyền vào, thì set isSelected = true.
// question = b	Gán kết quả sau .map vào biến question — nhưng cách làm này cũng sai logic, giải thích bên dưới.
// let index = dataQuizClone.findIndex(...)	Tìm vị trí của câu hỏi trong dataQuizClone.
// dataQuizClone[index] = question	Gán lại câu hỏi đã chỉnh sửa vào vị trí cũ.


// tim index vi du let dataQuiz = [
//     {
//         questionId: 1,
//         questionText: "Câu hỏi 1",
//         answers: [
//             { id: 101, text: "Đáp án A", isSelected: false },
//             { id: 102, text: "Đáp án B", isSelected: false }
//         ]
//     },
//     {
//         questionId: 2,
//         questionText: "Câu hỏi 2",
//         answers: [
//             { id: 201, text: "Đáp án A", isSelected: false },
//             { id: 202, text: "Đáp án B", isSelected: false }
//         ]
//     }
// ];

// const answerId = 101;
// const questionId = 1;

// let dataQuizClone = _.cloneDeep(dataQuiz);

// // Tìm object câu hỏi có questionId = 1
// let question = dataQuizClone.find(item => +item.questionId === +questionId);
// console.log("question = ", question);

// // Tìm vị trí (index) của phần tử này trong mảng
// let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
// console.log("index = ", index);

