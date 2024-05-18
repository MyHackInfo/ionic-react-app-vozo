import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useGetUsersQuery } from "../services/user";

import "./List.css";

const List: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { data: users, isLoading: loading } = useGetUsersQuery();

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const model = useRef<HTMLIonModalElement>(null);

  console.log("isLoading", loading, users);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List2</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={"success"}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed">
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading &&
          Array.from(Array(10), (_, i) => (
            <IonCard key={i}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>

                  <IonLabel>
                    <IonSkeletonText />
                  </IonLabel>

                  <IonChip slot="end" color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {users?.results?.map((user: any) => (
          <IonCard key={user.cell} onClick={() => setSelectedUser(user)}>
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonImg src={user?.picture?.thumbnail} />
                </IonAvatar>

                <IonLabel className="show-me">
                  {user?.name?.first} {user?.name?.last}
                  <p>{user?.email}</p>
                </IonLabel>

                <IonChip slot="end" color={"primary"}>
                  {user?.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.5}
          ref={model}
          isOpen={selectedUser !== null}
          onIonModalDidDismiss={() => setSelectedUser(null)}
        >
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonButtons slot="start">
                <IonButton onClick={() => model?.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>ds</IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default List;
