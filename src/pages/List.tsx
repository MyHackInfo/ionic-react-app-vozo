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

import "./List.css";

const List: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const model = useRef<HTMLIonModalElement>(null);

  const getUser = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const { results } = await data.json();
    setUsers(results);
    setLoading(false);
  };

  const clearList = () => {
    showAlert({
      header: "Confirm",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setUsers([]);
            showToast({
              message: "All users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: any) => {
    getUser();
    event.detail.complete();
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(users);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
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
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
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

        {users?.map((user) => (
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
