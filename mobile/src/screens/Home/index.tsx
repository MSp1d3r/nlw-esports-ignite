import React from 'react';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/background';
import { styles } from './styles';


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);


  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl});
  }


  useEffect(() => {
    fetch('http://192.168.1.112:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Heading style={styles.headIng}
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}

          // desabilita elemento de rolagem que aparece quando vc segura com mouse ou dedo o card para rolar

          showsHorizontalScrollIndicator={true}

          // para os cards ficarem rolando na horizonal, pois por padrão fica na vertical

          horizontal
          // estilza o conteudo da nossa lista

          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>
  );
}
