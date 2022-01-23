import React, {useState, useEffect} from "react";


const Message = (props) => {

  const [text, setText] = useState(props.text)

  return(
    <div>
        <h3>
            {props.name}: <span>{props.text}</span><span>
              <button >
                translate
              </button></span>
        </h3>    
      </div>
  )
}

export default Message