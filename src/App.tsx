import {
  AnimatePresence,
  motion,
  MotionConfig,
  useAnimate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cardsData } from "./data";
import { Icon } from "@iconify/react";
import bg from "./assets/bg.jpg";

const ANIMATION_DURATION = 0.5;
function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, animate] = useAnimate();
  const [activeCard, setActiveCard] = useState<number>();
  const activeCardData = cardsData[activeCard!];

  const saveFrameWidth = () => {
    const width = containerRef.current?.offsetWidth;
    containerRef.current?.style?.setProperty(`--frame-height`, `${width}px`);
  };

  useEffect(() => {
    saveFrameWidth();
  }, []);

  useEffect(() => {
    animate(
      ref.current,
      {
        scale: activeCardData ? 0.9 : 1,
        opacity: activeCardData ? 0 : 1,
      },
      {
        duration: ANIMATION_DURATION,
        bounce: 0,
        ease: "easeOut",
        delay: activeCardData ? ANIMATION_DURATION / 6 : 0,
      }
    );
  }, [activeCardData, animate, ref]);

  return (
    <MotionConfig
      transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
    >
      <div className="flex h-[100dvh]  items-center justify-center bg-black">
        <motion.div
          ref={containerRef}
          className="relative bg-slate-700 rounded-xl max-w-full h-[98dvh] md:h-[90dvh] aspect-[9/19.5] border-4 border-black-900 overflow-hidden"
        >
          <figure className="absolute top-0 left-0 w-full h-full brightness-75">
            <img className="h-full w-full object-cover blur-lg" src={bg} />
          </figure>

          {/* ================================================= Modal  =================================================*/}
          <AnimatePresence>
            {Number.isInteger(activeCard) && (
              <motion.div
                className="absolute w-full h-full bg-black/50 z-20 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setActiveCard(undefined);
                }}
              >
                <motion.div
                  className="flex flex-col gap-6"
                  layoutId={"container" + activeCardData.id}
                >
                  <motion.p
                    layoutId={activeCardData.id + "title"}
                    className="text-white font-bold text-4xl"
                  >
                    {activeCardData.label}
                  </motion.p>

                  <motion.div className="rounded-lg grid grid-cols-4 w-fit mx-auto relative gap-4 gap-y-5 justify-center ">
                    {activeCardData.shuffledModalIcons.map(
                      (icon, index, data) => (
                        <ModalIcon
                          activeCardDataId={activeCardData.id}
                          allIcons={data}
                          index={index}
                          icon={icon.icon}
                          id={icon.id}
                          name={icon.name}
                          key={icon.id}
                        />
                      )
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ================================================= Modal  =================================================*/}

          <motion.div
            ref={ref}
            className=" overflow-y-auto overflow-x-hidden p-3 pt-6 h-full relative z-10 flex flex-col gap-6"
          >
            <div className=" rounded-lg bg-white/40 p-5 sticky" />
            <div className="grid grid-cols-2 gap-4">
              {cardsData.map((card, cardIndex) => (
                <motion.div id="card" key={card.id} className="grid gap-2">
                  <motion.div className="bg-slate-200/50 p-[7%] rounded-xl aspect-square w-[100%] grid grid-cols-2 gap-2">
                    {card.largeIcons.map((e) => (
                      <div
                        key={e.id}
                        className=" w-full aspect-square rounded-lg bg-white overflow-hidden p-1 flex justify-center items-center"
                      >
                        <Icon
                          className="w-full h-full text-center"
                          icon={e.icon}
                        />
                      </div>
                    ))}
                    <motion.div
                      layoutId={"container" + card.id}
                      className=" w-full aspect-square  gap-2 grid grid-cols-2 relative"
                      onClick={() => {
                        setActiveCard(cardIndex);
                      }}
                      whileTap={{
                        filter: "brightness(50%)",
                        transition: { filter: { duration: 0.1 } },
                      }}
                    >
                      <motion.p
                        layoutId={card.id + "title"}
                        className="text-white font-bold text-sm absolute"
                        style={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 0,
                          transition: { opacity: { delay: 10 } },
                        }}
                      >
                        {card.label}
                      </motion.p>
                      {card.modalIcons.map((e, index) => {
                        const isSmall = index < 4;
                        const layoutId = card.id + (isSmall ? index : e.id);
                        return (
                          <motion.div
                            key={layoutId}
                            layoutId={layoutId + "box"}
                            initial={{ opacity: isSmall ? 1 : 0 }}
                            animate={{
                              opacity: isSmall ? 1 : 0,
                              transition: {
                                duration: isSmall
                                  ? ANIMATION_DURATION - 0.2
                                  : ANIMATION_DURATION,
                                delay: isSmall ? 0.2 : 0,
                              },
                            }}
                            className="flex flex-col"
                            style={{
                              width: isSmall ? "100%" : 0,
                              opacity: isSmall ? 1 : 0,
                              top: isSmall ? 0 : "45%",
                              left: isSmall ? 0 : "45%",
                              position: isSmall ? "relative" : "absolute",
                            }}
                          >
                            <motion.div
                              layoutId={layoutId}
                              className=" aspect-square rounded-md bg-white p-1  overflow-hidden flex justify-center items-center"
                            >
                              <Icon
                                className="w-full h-full text-center"
                                icon={e.icon}
                              />
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                  <p className="text-center text-white text-sm">{card.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

type P = (typeof cardsData)[number]["shuffledModalIcons"][number];
interface ModalIconProps extends P {
  index: number;
  allIcons: (typeof cardsData)[number]["shuffledModalIcons"];
  activeCardDataId: string;
}

const ModalIcon = (props: ModalIconProps) => {
  const { icon, index, allIcons: data, id, activeCardDataId } = props;

  const extra = data?.length % 4;
  const isSquare = !extra;
  const rowsCount = Math.floor(data.length / 4) + (isSquare ? 0 : 1);

  const lastIndex = isSquare ? rowsCount * 4 - 1 : (rowsCount - 1) * 4 - 1;
  const penultimateIndex = isSquare ? lastIndex - 3 : (rowsCount - 1) * 4;

  // map icons to the first four icons on the cards icons
  const sharedIndexData = {
    0: 0,
    3: 1,
    [penultimateIndex]: 2,
    [lastIndex]: 3,
  };
  const isIconAtGridEdge = [0, 3, penultimateIndex, lastIndex].includes(index);
  const layoutId =
    activeCardDataId + (isIconAtGridEdge ? sharedIndexData[index] : id);
  const delay = isIconAtGridEdge ? 0 : 0.2;
  const duration = isIconAtGridEdge
    ? ANIMATION_DURATION
    : ANIMATION_DURATION - 0.2;
  return (
    <motion.div
      className="flex flex-col items-center"
      style={{
        width: "calc(var(--frame-height) * 0.17)",
      }}
      layoutId={layoutId + "box"}
      animate={{
        opacity: 1,
        transition: {
          transform: {
            duration,
            delay,
          },
        },
      }}
    >
      <motion.div
        layoutId={layoutId}
        transition={{
          duration,
          delay,
        }}
        className="aspect-square rounded-xl overflow-hidden p-1 inline-block w-full"
      >
        <Icon className="w-full h-full" icon={icon} />
      </motion.div>
    </motion.div>
  );
};
export default App;
