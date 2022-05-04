import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { storageService } from "./../fb";
import { v4 } from "uuid";
import { dbService } from "fb";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  height: 40px;
  color: white;
  border-radius: 5px;

  &:first-child {
    flex-grow: 1;
    padding: 0 20px;
    border: 1px solid #04aaff;
    font-weight: 500;
    font-size: 12px;
  }

  &[type="submit"] {
    position: absolute;
    right: 0;
    background-color: #04aaff;
    width: 40px;
    padding: 10px 0;
    text-align: center;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor: pointer;
  }

  &[type="file"] {
    color: #04aaff;
    text-align: center;
  }
`;

const ImgLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #04aaff;
  cursor: pointer;
`;

const LabelText = styled.span`
  font-size: 12px;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-top: 40px;
`;

const RemoveBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #04aaff;
  cursor: pointer;
`;

const RemoveText = styled.span`
  font-size: 12px;
`;

function TweetFactory({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attach, setAttach] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachUrl = "";
    if (attach !== "") {
      const attachRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const res = await uploadString(attachRef, attach, "data_url");
      attachUrl = await getDownloadURL(res.ref);
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachUrl,
    };
    await addDoc(collection(dbService, "tweets"), tweetObj);
    setTweet("");
    setAttach("");
    fileInput.current.value = null;
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  };

  const clearPhoto = () => {
    setAttach("");
    fileInput.current.value = null;
  };

  const fileInput = useRef();

  return (
    <Form onSubmit={onSubmit}>
      <InputBox>
        <Input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <Input type="submit" value="&rarr;" />
      </InputBox>
      <ImgLabel htmlFor="attach-file">
        <LabelText>Add Photos</LabelText>
        <FontAwesomeIcon icon={faPlus} />
      </ImgLabel>
      <Input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{ opacity: 0, height: 0 }}
      />
      {attach && (
        <ImgBox>
          <Img alt="img" src={attach} width="50px" height="50px" />
          <RemoveBox onClick={clearPhoto}>
            <RemoveText>Remove</RemoveText>
            <FontAwesomeIcon icon={faTimes} />
          </RemoveBox>
        </ImgBox>
      )}
    </Form>
  );
}

export default TweetFactory;
