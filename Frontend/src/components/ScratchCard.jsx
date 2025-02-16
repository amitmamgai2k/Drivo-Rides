import React, { useRef, useEffect, useState } from "react";

const ScratchCoupon = (props) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef(null);
  const couponCode = "SAVE50NOW";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual canvas dimensions
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context for drawing operations
    ctx.scale(dpr, dpr);

    // Set CSS dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Initial gray cover
    ctx.fillStyle = "#6bda90";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const calculateScratchPercentage = (ctx) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) transparentPixels++;
    }

    const totalPixels = pixels.length / 4;
    const percentage = (transparentPixels / totalPixels) * 100;
    setScratchPercentage(percentage);

    if (percentage >= 80 && !isRevealed) {
      setIsRevealed(true);


    }
    if(percentage >= 85){
        props.scratchCard(false);
    }
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentPoint = {
      x: "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left,
      y: "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top,
    };

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 30;
      ctx.lineCap = "round";
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
      calculateScratchPercentage(ctx);
    }
    lastPoint.current = currentPoint;
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    lastPoint.current = {
      x: "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left,
      y: "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top,
    };
  };

  const stopDrawing = () => {
    setIsDrawing(false);

    lastPoint.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 ">


      <div className="relative w-[300px] h-[150px] select-none mt-[150%] bg-white rounded-xl shadow-xl overflow-hidden">

        {/* Background Card */}
        <div className="absolute inset-0  flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-300">
          <div className={`text-center transition-all duration-300 ${isRevealed ? "text-3xl" : "text-2xl"}`}>
            <p className="font-bold text-white tracking-wider">
              {isRevealed ? couponCode : "Scratch Here"}
            </p>
            {!isRevealed && (
              <p className="text-sm mt-2 opacity-80">(Scratch Card to reveal)</p>
            )}
          </div>
        </div>

        {/* Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={scratch}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={scratch}
          onTouchEnd={stopDrawing}
        />

        {/* Progress Indicator */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/30 backdrop-blur-sm text-xs text-white rounded-full">
          Scratched: {Math.round(scratchPercentage)}%
        </div>
      </div>


    </div>
  );
};

export default ScratchCoupon;