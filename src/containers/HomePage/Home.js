import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealTimeConversations,
  getRealTimeUsers,
  updateMessage,
} from "../../actions/Action";
import Layout from "../../components/Layout/Layout";
import "./style.css";

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div className="displayName" onClick={() => onClick(user)}>
      <div className="displayPic">
        <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1, //for innner flex
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span
          className={user.isOnline ? `onlineStatus` : `offlineStatus`}
        ></span>
        {/* <span>{user.isOnline ? "online" : "offline"}</span> */}
      </div>
    </div>
  );
};

const Home = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    //async function return promise
    unsubscribe = dispatch(getRealTimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe; //here it returns promise
      })
      .catch((err) => console.log(err));
  }, []);

  //componentWillUnmount => return some cleanup
  useEffect(() => {
    //cleanup process
    return () => {
      unsubscribe.then((f) => f()).catch((err) => console.log(err));
    };
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    console.log("confirm" + user);
    setUserUid(user.uid);

    dispatch(getRealTimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

  const submitMessage = (e) => {
    const msg = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };
    console.log(msg);
    if (message !== "") {
      dispatch(updateMessage(msg));
    }
  };

  // console.log(user);
  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                return <User key={user.uid} user={user} onClick={initChat} />;
              })
            : null}
        </div>
        <div className="chatArea">
          <div className="chatHeader">{chatStarted ? chatUser : ""}</div>
          <div className="messageSections">
            {chatStarted
              ? user.conversations.map((con) => (
                  <div
                    style={{
                      textAlign: con.user_uid_1 == auth.uid ? "right" : "left",
                    }}
                  >
                    <p className="messageStyle">{con.message}</p>
                  </div>
                ))
              : null}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message"
              />
              <button onClick={submitMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
