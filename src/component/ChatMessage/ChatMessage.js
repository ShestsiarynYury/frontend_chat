import "./ChatMessage.css";

const ChatMessage = (props) => {

    return (
        <div class="chat-message">
            <div class="sender"><h3>{props.sender}</h3></div>
            <div class="avatar"><img src={props.avatar} ></img></div>
            <div class="show-message">
                <label>{props.message}</label>
            </div>
        </div>
    );
}

export default ChatMessage;