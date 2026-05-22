type RetanguloProps = {
  width: string;
  height: string;
  bgColor?: string;
};

export function Retangulo({ width, height, bgColor = "red" }: RetanguloProps) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: bgColor,
      }}
    ></div>
  );
}
