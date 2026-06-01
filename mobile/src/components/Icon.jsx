import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Icon({ name, size = 20, stroke = '#000', sw = 1.9 }) {
  const paths = {
    plus:     <Path d="M12 5v14M5 12h14" />,
    back:     <Path d="M15 5l-7 7 7 7" />,
    edit:     <Path d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3z M14 7l3 3" />,
    trash:    <Path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />,
    calendar: <Path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6zM4 9h16M8 3v3M16 3v3" />,
    pin:      <Path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />,
    dots:     <Path d="M12 6h.01M12 12h.01M12 18h.01" />,
    search:   <Path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />,
    plane:    <Path d="M21 4 13 12m8-8-5 17-3-7-7-3 15-7z" />,
    image:    <Path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM4 16l4-4 4 4 3-3 5 5" />,
    check:    <Path d="M5 13l4 4L19 7" />,
    x:        <Path d="M6 6l12 12M18 6L6 18" />,
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </Svg>
  );
}
