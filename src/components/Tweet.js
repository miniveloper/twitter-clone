import styled from "styled-components";
import { dbService } from "fb";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { storageService } from "./../fb";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencilAlt,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import Detail from "./Detail";

const TweetItem = styled(motion.div)`
  background-color: white;
  border-radius: 5px;
  position: relative;

  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
  min-height: 100px;
  max-height: 320px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(0, 0, 0, 0.8);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EditBox = styled.div`
  width: 100%;
`;

const EditForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const EditInput = styled.input`
  width: 90%;
  height: 30px;
  margin-right: 10px;
`;

const IconBox = styled.span`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.span`
  cursor: pointer;
`;

const Cancle = styled.span`
  margin-left: 10px;
  color: #ee5253;
  cursor: pointer;
`;

const H4 = styled.h4`
  font-size: 14px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const AttachImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const ManageBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  position: absolute;
  right: 10px;
  top: 10px;
`;

const ManageBtn = styled.span`
  cursor: pointer;
`;

const Layout = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const [layoutId, setLayoutId] = useState("");

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // delete
      await deleteDoc(doc(dbService, "tweets", tweetObj.id));
      if (tweetObj.attachUrl !== "") {
        await deleteObject(ref(storageService, tweetObj.attachUrl));
      }
    }
  };

  const toggleEdit = () => {
    setNewTweet("");
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "tweets", tweetObj.id), { text: newTweet });
    setEditing(false);
  };

  const contentChange = async () => {
    await updateDoc(doc(dbService, "tweets", tweetObj.id), { text: newTweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const NO_IMG =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlz1nScKxKQoZhQOAhiPMx6bjBSwJ9boR0Lw&usqp=CAU";

  // const onLayout = (id) => {
  //   setLayoutId(id);
  // };
  return (
    <>
      <TweetItem layoutId={tweetObj.id}>
        {editing ? (
          <EditBox>
            <EditForm onSubmit={onSubmit}>
              <EditInput
                onChange={onChange}
                type="text"
                placeholder="Edit your tweet"
                value={newTweet}
                autoFocus
                required
              />
              <IconBox>
                <SubmitBtn onClick={contentChange}>
                  <FontAwesomeIcon icon={faCheck} />
                </SubmitBtn>
                <Cancle onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faTimes} />
                </Cancle>
              </IconBox>
            </EditForm>
          </EditBox>
        ) : (
          <>
            {tweetObj.attachUrl ? (
              <AttachImg
                onClick={() => setLayoutId(tweetObj.id)}
                src={tweetObj.attachUrl}
                alt="img"
              />
            ) : (
              <AttachImg
                onClick={() => setLayoutId(tweetObj.id)}
                src={NO_IMG}
              />
            )}
            <H4 onClick={() => setLayoutId(tweetObj.id)}>{tweetObj.text}</H4>

            {isOwner && (
              <ManageBox>
                <ManageBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </ManageBtn>
                <ManageBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEdit();
                  }}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </ManageBtn>
              </ManageBox>
            )}
          </>
        )}
      </TweetItem>
      <AnimatePresence>
        {layoutId && (
          <>
            <Layout onClick={() => setLayoutId("")}></Layout>
            <Detail tweetObj={tweetObj} layoutId={layoutId} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tweet;
