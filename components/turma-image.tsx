const mapNameToColor = (name: string) => {
  const [r = 255, g = 255, b = 255] = name
    .split(" ")
    .map((palavra) => palavra.at(0)?.toUpperCase().charCodeAt(0) ?? 0)
    .map((code) => (code * 10007) % 256);
  return `rgb(${r}, ${g}, ${b})`;
};

type TurmaImageProps = {
  name: string;
};

export function TurmaImage({ name }: TurmaImageProps) {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-full flex items-center justify-center`}
      style={{
        backgroundColor: mapNameToColor(name),
      }}
    >
      {name
        .split(" ")
        .map((palavra) => palavra.at(0))
        .join("")
        .toUpperCase()}
    </div>
  );
}
