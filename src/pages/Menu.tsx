import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { List, Settings } from "./index";
import { Redirect, Route } from "react-router";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";

const Menu: React.FC = () => {
  const paths = [
    { name: "Home", url: "/app/list", icon: homeOutline },
    { name: "Settings", url: "/app/settings", icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths?.map((item, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    detail={false}
                    routerLink={item.url}
                    routerDirection="none"
                  >
                    <IonIcon icon={item.icon} slot="start" />
                    {item.name}
                  </IonItem>
                </IonMenuToggle>
              );
            })}
            <IonMenuToggle autoHide={false}>
              <IonButton expand="full" routerLink="/" routerDirection="root">
                <IonIcon icon={logOutOutline} slot="start" />
                Logout
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app/list" component={List} />
          <Route path="/app/settings" component={Settings} />
          <Route exact path="/app">
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
