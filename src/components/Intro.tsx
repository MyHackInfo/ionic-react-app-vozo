import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { IonButton, IonText } from "@ionic/react";

import Intro1 from "../assests/intro/1.svg";
import Intro2 from "../assests/intro/2.svg";
import Intro3 from "../assests/intro/3.svg";

import "./Intro.css";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};
const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={Intro1} alt="Intro 1" />
        <IonText>
          {" "}
          <h3>Build awesome apps with Ionic</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src={Intro2} alt="Intro 2" />
        <IonText>
          {" "}
          <h3>Create powerful native apps with capacitor.</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src={Intro3} alt="Intro 3" />
        <IonText>
          {" "}
          <h3>Enjoy learing to code!</h3>
        </IonText>
        <IonButton onClick={onFinish}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
