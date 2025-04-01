import _ from 'lodash';

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleCheckbox = (event, aId, qId) => {
        props.handleCheckbox(aId, qId);
    }

    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div> :
                <div className='q-image'></div>
            }

            <div className="question">
                Question {index + 1}: {data.questionDescription}?
            </div>

            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected} //  Điều khiển theo state
                                        onChange={(event) => handleCheckbox(event, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;
// onChange={(event) => handleCheckbox(event, a.id, data.questionId)}
//                                     />
//                                     <label className="form-check-label">
// "Khi người dùng tick hoặc bỏ tick vào checkbox này, hãy gọi hàm handleCheckbox và truyền vào:

// đối tượng sự kiện,

// id của đáp án này (a.id),

// id của câu hỏi đang hiển thị (data.questionId)."
