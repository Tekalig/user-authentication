import { motion } from "framer-motion";
import PropTypes from "prop-types";

function FloatShape({ color, size, left, top, delay }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top: top, left: left }}
      animate={{
        y: ["0", "100%", "0"],
        x: ["0", "100%", "0"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: delay,
      }}
      aria-hidden="true"
    />
  );
}

FloatShape.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default FloatShape;
