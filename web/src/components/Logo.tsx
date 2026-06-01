import Icon from './Icon';

export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center shadow-logo"
      style={{ width: size, height: size, borderRadius: size * 0.32, background: 'linear-gradient(140deg, #f0a35e, #e76f51)' }}
    >
      <Icon name="plane" size={size * 0.52} stroke="#fff" sw={2} />
    </div>
  );
}
