
import { useEffect, useState } from 'react';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Background } from '../../components/background';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

interface RouteParams {
  id: string;
  title: string;
  bunnerUrl: string;
}

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation()
  const route = useRoute();
  const game = route.params as GameParams;

  // botão de retornar para pagina principal -> <
  function handleGoBack() {
    navigation.goBack();
  }

async function getDiscordUser(adsId: string){
 
    fetch(`http://192.168.1.112:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord));
 }



  useEffect(() => {
    fetch(`http://192.168.1.112:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading
          title={game.title}
          style={styles.cover} 
          subtitle="Conecte-se e comece a jogar!"
        />
        <FlatList 
        data={duos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard 
          data={item} // data={duos[0]} trocar depois pra ver se o erro para
          onConnect={() => getDiscordUser(item.id)}
          />
        )}
        horizontal
        style={styles.containerList}
        // se tamanho é maior(>) que 0  vá para(?) estilo 1 caso contrario(:) estilo 2 
        // Resumo - se tem conteudo primera estilização se nao tem vai para outra estilização
        contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.adsCenter ]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.notAds}>
            Não há anúncios publicados ainda!
          </Text>
        )}
        />
      <DuoMatch 
      visible={discordDuoSelected.length > 0}
      discord={discordDuoSelected}
      onClose={() => setDiscordDuoSelected('')}
      />       
      </SafeAreaView>
    </Background>
  );
}