import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    /* MOSTRA AS NOTIFICAÇÕES AGENDADAS */
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });

    return () => subscription.remove();


    /* O CÓDIGO COMENTADO ABAIXO APAA TODAS AS NOTIFICAÇÕES AGENDADAS */
    /*
async function notifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const data = await Notifications.getAllScheduledNotificationsAsync();
  console.log("######## Notificações agendadas ########")
  console.log(data);
}

notifications();
*/
  }, [])

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}