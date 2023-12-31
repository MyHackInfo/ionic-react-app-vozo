import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Tab1</IonContent>
    </IonPage>
  );
};

export default Tab1;
