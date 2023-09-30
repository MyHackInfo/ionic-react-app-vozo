import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

import { Tab1, Tab2 } from "./index";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { playCircle, radio } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/app/settings/tab1" component={Tab1} exact />
          <Route path="/app/settings/tab2" component={Tab2} exact />
          <Route exact path="/app/settings">
            <Redirect to="/app/settings/tab1" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/app/settings/tab1">
            <IonIcon icon={playCircle} />
            <IonLabel>Tab1</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/app/settings/tab2">
            <IonIcon icon={radio} />
            <IonLabel>Tab2</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Settings;
