import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export default function GrowAndShrinkTypography({
  animateNum,
  remainingNumber,
  changeColor,
  setChangeColor,
}) {
  const elmRef = useRef(null);
  const animationRef = useRef(null);
  const [color, setColor] = useState("primary");

  useEffect(() => {
    if (animateNum === 0) return;
    setColor("success.main");
    animationRef.current = anime({
      targets: elmRef.current,
      scale: 1.05,
      duration: 300,
      easing: "easeInOutQuad",
      direction: "alternate",
      autoplay: false,
    });
    setTimeout(() => {
      setColor("primary");
    }, 1000);

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
        anime.remove(elmRef.current);
      }
    };
  }, [animateNum]);

  useEffect(() => {
    if (animateNum !== 0 && animationRef.current) {
      setColor("success.main");
      setTimeout(() => {
        setColor("primary");
      }, 1500);
      animationRef.current.restart();
    }
  }, [animateNum]);

  useEffect(() => {
    if (!changeColor) return;
    setColor(changeColor);
    setTimeout(() => {
      setColor("primary");
      setChangeColor(null);
    }, 1000);
  }, [changeColor]);

  return (
    <Typography ref={elmRef} align="start" variant="subtitle2" color={color}>
      {remainingNumber} Remain
    </Typography>
  );
}
