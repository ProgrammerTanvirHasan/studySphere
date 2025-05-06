import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./banner.css";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }
    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Banner = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 6,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider h-[75vh] ">
        <div className="keen-slider__slide number-slide1">
          <img src={"https://i.ibb.co.com/LD3L8NDj/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide2">
          <img src={"https://i.ibb.co.com/vCjCf0Qf/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide3">
          <img src={"https://i.ibb.co.com/jvh0NF9M/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide4">
          <img src={"https://i.ibb.co.com/Y7LKtJCC/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide5">
          <img src={"https://i.ibb.co.com/NngrjFCj/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide6">
          <img src={"https://i.ibb.co.com/Rp10wpC6/image.png"} alt="" />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        <div className="keen-slider__slide number-slide1">
          <img src={"https://i.ibb.co.com/LD3L8NDj/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide2">
          <img src={"https://i.ibb.co.com/vCjCf0Qf/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide3">
          <img src={"https://i.ibb.co.com/jvh0NF9M/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide4">
          <img src={"https://i.ibb.co.com/Y7LKtJCC/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide5">
          <img src={"https://i.ibb.co.com/NngrjFCj/image.png"} alt="" />
        </div>

        <div className="keen-slider__slide number-slide6">
          <img src={"https://i.ibb.co.com/Rp10wpC6/image.png"} alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
