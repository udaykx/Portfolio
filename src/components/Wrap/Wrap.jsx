import { useEffect, useRef } from "react";
import "./Wrap.scss";

export default function WrapSpeed() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

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
            this.y = Math.random() * h; 
            this.c = 0;
        }

        Star.prototype.updateColor = function () {
            this.c = Math.min(255, this.c + 5);
        };

        Star.prototype.updatePos = function () {
            const speedMult = wrapSpeed ? 0.028 : 0.02;

            const cx = w / 2;
            const cy = h / 2;

            this.x += xMod + (this.x - cx) * speedMult;
            this.y += yMod + (this.y - cy) * speedMult;

            this.updateColor();

            if (this.x > w || this.x < 0) {
                this.x = Math.random() * w;
                this.c = 0;
            }
            if (this.y > h || this.y < 0) {
                this.y = Math.random() * h;
                this.c = 0;
            }
        };

        const STAR_COUNT = 200;
        const stars = Array.from({ length: STAR_COUNT }, () => new Star()); // Fixed typo: lengh -> length

        const onKeyDown = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32:
                    setWrap(true);
                    break;
                case 37:
                    xMod = Math.min(6, xMod + 0.3);
                    break;
                case 38:
                    yMod = Math.min(6, yMod + 0.3); // Fixed logical error: xMod -> yMod
                    break;
                case 39:
                    xMod = Math.max(-6, xMod - 0.3);
                    break;
                case 40:
                    yMod = Math.max(-6, yMod - 0.3);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };

        const onKeyUp = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32:
                    setWrap(false);
                    break;
                case 37:
                case 39:
                    xMod = 0;
                    break;
                case 38:
                case 40:
                    yMod = 0;
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };

        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            setWrap(true);
        };

        const onMouseUp = (e) => {
            if (e.button !== 0) return;
            setWrap(false);
        };

        const onTouchStart = (e) => {
            e.preventDefault();
            setWrap(true);
        };
        const onTouchEnd = () => setWrap(false);

        const draw = () => {
            if (wrapSpeed === 0) {
                ctx.fillStyle = "rgba(0,0,0,0.2)"; // Fixed format: 0,2 -> 0.2
                ctx.fillRect(0, 0, w, h);
            }

            for (let i = 0; i < stars.length; i++) { // Fixed typo: lenght -> length
                const s = stars[i];
                const c = s.c;

                if (wrapSpeed) {
                    ctx.fillStyle = `rgb(${c},${Math.floor(c * 0.45)},0)`; // Fixed template string
                } else {
                    ctx.fillStyle = `rgb(${c},${c},${c})`;
                }
                const size = c / 128;
                ctx.fillRect(s.x, s.y, size, size); // Fixed typo: fillReact -> fillRect
                s.updatePos();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        // Add Listeners
        window.addEventListener("resize", resize);
        window.addEventListener("keydown", onKeyDown, { passive: false });
        window.addEventListener("keyup", onKeyUp, { passive: false });
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("touchstart", onTouchStart, { passive: false }); // Added missing listener
        canvas.addEventListener("touchend", onTouchEnd); // Added missing listener

        // Cleanup
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            canvas.removeEventListener("mousedown", onMouseDown); // Fixed: window -> canvas
            canvas.removeEventListener("mouseup", onMouseUp); // Fixed: window -> canvas
            canvas.removeEventListener("touchstart", onTouchStart);
            canvas.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <div className="wrap-wrap">
            <canvas ref={canvasRef} className="wrap-canvas"></canvas>
        </div>
    );
}
