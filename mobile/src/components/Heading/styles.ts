import { THEME } from './../../theme/index';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    width: '100%',
    pedding: 52,
  },
  title:{
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    FontFamily: THEME.FONT_FAMILY.BLACK,
  },
  subtitle:{
    color: THEME.COLORS.CAPTION_400,
    fontSize: THEME.FONT_SIZE.MD,
    FontFamily: THEME.FONT_FAMILY.REGULAR,
  }

});
