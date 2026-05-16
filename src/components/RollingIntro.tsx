import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["DEVELOPER", "FULL-STACK", "BACKEND", "ENGINEER", "VIKRAM", "KUMAR"];
const ROLL_DURATION = 200; // ms per word (slowed to 0.75x)
const FINAL_DELAY = 1100; // ms before overlay slides away

interface RollingIntroProps {
  onComplete: () => void;
}

const RollingIntro = ({ onComplete }: RollingIntroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (currentIndex < WORDS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, ROLL_DURATION);
      return () => clearTimeout(timer);
    } else {
      // Final word reached
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, FINAL_DELAY);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isComplete) {
      const hideTimer = setTimeout(() => {
        setShowOverlay(false);
        setTimeout(onComplete, 800);
      }, 100);
      return () => clearTimeout(hideTimer);
    }
  }, [isComplete, onComplete]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <div className="rolling-container flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: currentIndex === WORDS.length - 1 ? 0.55 : 0.16,
                  ease: currentIndex === WORDS.length - 1 ? [0.16, 1, 0.3, 1] : "linear",
                }}
                className="rolling-text text-foreground block text-center"
              >
                {WORDS[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          {/* Subtle loading indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-1">
              {WORDS.map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i <= currentIndex ? "bg-foreground" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RollingIntro;
