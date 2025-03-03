
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [color, setColor] = useState("gray");

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prevSpeed) => {
        if (prevSpeed < 130) {
          return prevSpeed + 1; 
        }
        clearInterval(interval); 
        return prevSpeed;
      });
    }, 30); 

    if (speed < 50) {
      setColor("gray");
    } else if (speed < 100) {
      setColor("yellow");
    } else {
      setColor("red"); 
    }

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="text-6xl font-bold"
        animate={{ scale: 1.2, opacity: 1 }}
        initial={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color, fontSize: "2rem" }}
      >
        {speed} мм
      </motion.div>
      <p className="text-4xl text-gray-400 mt-2">Ход (мм)</p>
    </div>
  );
};

export default Speedometer;
