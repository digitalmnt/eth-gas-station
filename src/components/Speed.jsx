import { useSpring, animated, config } from "react-spring";
const speedMeta = {
  fastest: {
    color: "#39FF14",
    label: "Fastest",
  },
  fast: {
    color: "#33a532",
    label: "Fast",
  },
  average: {
    color: "#f7b500",
    label: "Average",
  },
  safeLow: {
    color: "#bb1e10",
    label: "Safe Low",
  },
};

export function Speed({ gas, speed, total }) {
  const { color, label } = speedMeta[speed];
  const gwei = gas[speed];
  const calcedWidth = (gwei / total) * 100 - 2;

  const widthAnimation = useSpring({
    from: {
      width: "25%",
    },
    to: {
      width: `${calcedWidth}%`,
    },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{
        ...widthAnimation,
        margin: "1%",
        height: 150,
        background: color,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <div>Speed: {label}</div>
      <div>GWEI: {gwei / 10}</div>
      <div>
        Average Wait: {speed === "average" ? gas.avgWait : gas[`${speed}Wait`]}{" "}
        minutes
      </div>
    </animated.div>
  );
}
