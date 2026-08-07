import { useEffect, useRef } from "react";
import "./Wrap.scss";

export default function WrapSpeed() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return;

        const ctx = canvas.getContext("2d", {alpha: true});
        if(!ctx) return;

        let w = 0;
        let h = 0;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        resize();

        let xMod = 0;
        let yMod = 0;
        let wrapSpeed = 0;

        const setWrap = (on) => (wrapSpeed = on ? 1 : 0);

        function Star() {
            this.x = Math.random() * w;
            this.y = Math.randow() * h;
            this.c = 0;
            
        }
    })
}