import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cardsData } from "./data";
import { Icon } from "@iconify/react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>();
  const saveWidth = () => {
    const width = containerRef.current?.offsetWidth;
    containerRef.current?.style?.setProperty("--frame-height", `${width}px`);
  };
  const activeCardData = cardsData[activeCard!];

  useEffect(() => {
    saveWidth();
  }, []);
  return (
    <div className="flex h-screen items-center justify-center bg-slate-800">
      <motion.div
        ref={containerRef}
        className="relative bg-slate-700 rounded-xl max-w-full h-[90vh] aspect-[414/896] border-4 border-slate-900 overflow-hidden"
      >
        <AnimatePresence>
          {Number.isInteger(activeCard) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full h-full bg-black/50 z-20 flex flex-col justify-center items-center"
              onClick={() => {
                setActiveCard(undefined);
              }}
            >
              <motion.div className="flex flex-col gap-6">
                <motion.p
                  layoutId={activeCardData.id + "title"}
                  className="text-white font-bold text-4xl"
                >
                  {activeCardData.label}
                </motion.p>

                <motion.div
                  layoutId={"container" + cardsData[activeCard!]?.id}
                  className="rounded-lg grid grid-cols-4 w-fit mx-auto relative gap-3 gap-y-5 justify-center "
                >
                  {activeCardData.modalIcons.map((icon) => (
                    <motion.div key={icon.id}>
                      <motion.div
                        layoutId={activeCardData?.id + icon.id}
                        style={{ width: "calc(var(--frame-height) * 0.18)" }}
                        className="aspect-square rounded-xl overflow-hidden bg-white p-2 inline-block "
                      >
                        <Icon className="w-full h-full" icon={icon.icon} />
                      </motion.div>
                      <motion.p className="text-xs text-white text-center">
                        {icon.name}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="grid grid-cols-2 gap-4 overflow-scroll p-2 h-full relative z-10">
          {cardsData.map((card, cardIndex) => (
            <motion.div key={card.id}>
              <motion.div className="bg-gray-100/35 p-2 rounded-xl aspect-square w-[100%] grid grid-cols-2 gap-2">
                {card.largeIcons.map((e) => (
                  <div
                    key={e.id}
                    className=" w-full aspect-square rounded-md overflow-hidden bg-white p-2"
                  >
                    <Icon className="w-full h-full" icon={e.icon} />
                  </div>
                ))}
                <motion.div
                  layoutId={"container" + card.id}
                  className=" w-full aspect-square rounded-md gap-2 grid grid-cols-2 relative"
                  onClick={() => {
                    setActiveCard(cardIndex);
                  }}
                >
                  <motion.p
                    layoutId={card.id + "title"}
                    className="text-white font-bold text-sm absolute"
                    style={{ opacity: 0 }}
                  >
                    {card.label}
                  </motion.p>
                  {card.modalIcons.map((e) => {
                    return (
                      <motion.div
                        key={e.id}
                        layoutId={card.id + e.id}
                        style={{
                          width: e.isSmall ? "100%" : 0,
                          opacity: e.isSmall ? 1 : 0,
                          top: e.isSmall ? 0 : "50%",
                          left: e.isSmall ? 0 : "50%",
                          position: e.isSmall ? "relative" : "absolute",
                        }}
                        className=" aspect-square rounded-sm p-1 bg-white  overflow-hidden"
                      >
                        <Icon className="w-full h-full" icon={e.icon} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
              <p className="text-center text-white text-sm">Suggestions</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
console.log({ cardsData });

export default App;
