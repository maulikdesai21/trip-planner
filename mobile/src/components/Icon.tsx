import Svg, { Path } from 'react-native-svg';

export type IconName =
  | 'plus' | 'back' | 'edit' | 'trash' | 'calendar' | 'pin'
  | 'dots' | 'search' | 'plane' | 'image' | 'check' | 'x';

interface IconProps { name: IconName; size?: number; stroke?: string; sw?: number; }

const PATHS: Record<IconName, string> = {
  plus:     'M12 5v14M5 12h14',
  back:     'M15 5l-7 7 7 7',
  edit:     'M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3z M14 7l3 3',
  trash:    'M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13',
  calendar: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6zM4 9h16M8 3v3M16 3v3',
  pin:      'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  dots:     'M12 6h.01M12 12h.01M12 18h.01',
  search:   'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  plane:    'M21 4 13 12m8-8-5 17-3-7-7-3 15-7z',
  image:    'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM4 16l4-4 4 4 3-3 5 5',
  check:    'M5 13l4 4L19 7',
  x:        'M6 6l12 12M18 6L6 18',
};

export default function Icon({ name, size = 20, stroke = '#000', sw = 1.9 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <Path d={PATHS[name]} />
    </Svg>
  );
}
