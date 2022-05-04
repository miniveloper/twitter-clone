import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const BigItem = styled(motion.div)`
  position: absolute;
  top: 35%;
  width: 320px;
  height: 390px;
  z-index: 9999;
  background-color: #fff;
  border-radius: 5px;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 320px 1fr;
`;
const BigImg = styled.div`
  width: 100%;
  height: 320px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const BigTextBox = styled.div`
  padding: 15px 20px;
  overflow-y: hidden;
  position: relative;
`;

const BigText = styled.h4`
  font-size: 14px;
  height: 100%;
  color: black;
  margin: 0;
  overflow-y: hidden;
  overflow-wrap: break-word;
`;

const Heart = styled(motion.div)`
  font-size: 18px;
  color: black;
  display: inline;
  position: absolute;
  right: 15px;
  bottom: 10px;
  cursor: pointer;
`;

const NO_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlz1nScKxKQoZhQOAhiPMx6bjBSwJ9boR0Lw&usqp=CAU";

function Detail({ tweetObj, layoutId }) {
  const [heart, setHeart] = useState(false);

  return (
    <BigItem layoutId={layoutId}>
      {tweetObj.attachUrl ? (
        <>
          <BigImg
            style={{
              background: `url(${tweetObj.attachUrl}) center center/cover`,
            }} /*src={tweetObj.attachUrl}*/
          />
        </>
      ) : (
        <>
          <BigImg
            style={{
              background: `#fff url(${NO_IMG}) center center/cover`,
            }}
          />
        </>
      )}
      <BigTextBox>
        <BigText>{tweetObj.text}</BigText>
        <Heart
          whileTap={{ scale: 0.8 }}
          onClick={() => setHeart((prev) => !prev)}
        >
          {heart ? (
            <HeartFilled
              style={{
                color: "#EE5253",
                transition: "all 1s ease-in-out",
              }}
            />
          ) : (
            <HeartOutlined />
          )}
        </Heart>
      </BigTextBox>
    </BigItem>
  );
}

export default Detail;
