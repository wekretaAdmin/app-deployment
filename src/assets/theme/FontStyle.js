import Images from '../images';
import Apptheme from './apptheme';
import {Font} from './font';

const FontStyle = {
  headingLarge: {
    fontFamily: Font.BOLD,
    fontSize: 19,
    color: Apptheme.color.text,
    letterSpacing: 0,
    includeFontPadding: false,
    // fontWeight: "700"
  },
  heading: {
    fontFamily: Font.BOLD,
    fontSize: 17,
    color: Apptheme.color.text,
    letterSpacing: 0,
    includeFontPadding: false,
    // fontWeight: "700"
  },
  headingSmall: {
    fontFamily: Font.BOLD,
    fontSize: 14,
    color: Apptheme.color.text,
    letterSpacing: 0,
    includeFontPadding: false,
    // fontWeight: "700"
  },
  labelMedium: {
    fontSize: 14,
    color: Apptheme.color.text,
    fontFamily: Font.MEDIUM,
    letterSpacing: 0,
    includeFontPadding: false,
    // fontWeight: "500"
  },
  label: {
    fontSize: 12,
    color: Apptheme.color.text,
    fontFamily: Font.REGULAR,
    letterSpacing: 0,
    includeFontPadding: false,
    // fontWeight: "500"
  },
  titleLarge: {
    fontFamily: Font.REGULAR,
    fontSize: 18,
    color: Apptheme.color.text,
    // fontWeight: "500",
    letterSpacing: 0,
    includeFontPadding: false,
  },
  title: {
    fontFamily: Font.REGULAR,
    includeFontPadding: false,
    fontSize: 16,
    color: Apptheme.color.text,
    // fontWeight: "500",
    letterSpacing: 0,
    includeFontPadding: false,
  },
  titleSmall: {
    fontFamily: Font.REGULAR,
    includeFontPadding: false,
    fontSize: 14,
    color: Apptheme.color.text,
    // fontWeight: "500",
    letterSpacing: 0,
    includeFontPadding: false,
  },
  //   bodyLarge: {
  //     fontSize: 18,
  //     color: AppTheme.colors.text,
  //     fontFamily: Font.family.REGULAR,
  //     letterSpacing: 0,
  //     includeFontPadding: false,
  //   },
  //   body: {
  //     fontSize: 15,
  //     color: AppTheme.colors.text,
  //     fontFamily: Font.family.REGULAR,
  //     letterSpacing: 0,
  //     includeFontPadding: false,
  //   },
  //   bodySmall: {
  //     fontSize: 12,
  //     color: AppTheme.colors.text,
  //     fontFamily: Font.family.REGULAR,
  //     letterSpacing: 0,
  //     includeFontPadding: false,
  //   },
};

export default FontStyle;
