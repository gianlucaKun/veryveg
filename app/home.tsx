import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const Home = () => {

  const router = useRouter();

  const navigateToHiddenPage = () => {
    router.push('/hiddenPages/HiddenPage'); // Naviga alla pagina nascosta
  };

  return (
    <View>
      <Text>add</Text>
      <Button title="Go to Hidden Page" onPress={navigateToHiddenPage} />
    </View>
  )
}

export default Home