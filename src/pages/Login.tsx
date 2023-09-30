import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import FCC_LOGO from "../assests/free-code-camp-logo.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Login in....");
    setTimeout(() => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = async () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      console.log("Checking...", seen);
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img src={FCC_LOGO} alt="FCC Logo" width="50%" />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid fixed>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Email"
                          type="email"
                          placeholder="narsi@ionicacdemy.com"
                          mode="md"
                        ></IonInput>
                        <IonInput
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password"
                          type="password"
                          placeholder="gh@rt#32ghkdyu"
                          mode="md"
                        ></IonInput>
                        <IonButton
                          type="submit"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Login
                          <IonIcon icon={logInOutline} slot="end"></IonIcon>
                        </IonButton>
                        <IonButton
                          routerLink="/register"
                          type="button"
                          color={"secondary"}
                          expand="block"
                          className="ion-margin-top"
                        >
                          {" "}
                          Create account
                          <IonIcon
                            icon={personCircleOutline}
                            slot="end"
                          ></IonIcon>
                        </IonButton>

                        <IonButton
                          onClick={seeIntroAgain}
                          fill="clear"
                          size="small"
                          color={"medium"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Watch intro again
                          <IonIcon
                            icon={personCircleOutline}
                            slot="end"
                          ></IonIcon>
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
