export default function Avatar({ size = 38 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold font-display shadow-[inset_0_0_0_2px_#fff,0_2px_8px_rgba(58,43,37,0.12)]"
      style={{ width: size, height: size, background: 'linear-gradient(140deg, #f4c89a, #e88f6c)', fontSize: size * 0.4 }}
    >
      M
    </div>
  );
}
