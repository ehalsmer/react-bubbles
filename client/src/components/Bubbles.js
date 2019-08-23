import React, { useState, useEffect } from "react";
import { Pack, Chord } from "@potion/layout";
import { Svg, Circle, Ribbon } from "@potion/element";

const Bubbles = ({ colors }) => {
  // console.log('colors', colors)
  const [bubbleData, setBubbleData] = useState([]);
  // const [ribbonData, setRibbonData] = useState([]);

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  const click = e => {
    e.preventDefault();
    alert("pop!");
  };

  return (
    <div className="vis-wrap">
      <div className="bubble-wrap">
        <Svg width={400} height={400}>
          <Pack
            data={{
              children: bubbleData
            }}
            sum={datum => datum.value}
            size={[400, 400]}
            includeRoot={false}
            nodeEnter={d => ({ ...d, r: 0 })}
            animate
          >
            {nodes =>
              nodes
                .map(({ x, y, r, key }, i) => {
                  if (i < colors.length) {
                    return (
                      <Circle
                        key={key}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={colors[i].code.hex}
                        animate
                        onClick={click}
                      />
                    );
                  }
                  return null;
                })
                .filter(v => v)
            }
          </Pack>
        </Svg>

        <Svg width={400} height={400}>
          <Chord
            data={[
              [900, 1000, 2000, 3000],
              [4000, 5000, 6000, 7000],
              [8000, 9000, 10000, 11000],
              [12000, 13000, 14000, 15000]
            ]}
            animate
            nodeEnter={d => ({
              ...d,
              sourceStartAngle: d.sourceEndAngle,
              targetStartAngle: d.targetEndAngle
            })}
          >
            {nodes =>
              nodes.map((node, i) => {
                if (i < colors.length) {
                  return (
                    <Ribbon
                      {...node}
                      fill={colors[i].code.hex}
                      stroke={colors[i].code.hex}
                      fillOpacity={0.9}
                      radius={200}
                      transform={{ translate: [200, 200] }}
                    />
                  );
                }
                return null;
              })
            }
          </Chord>
        </Svg>
      </div>
    </div>
  );
};

export default Bubbles;
