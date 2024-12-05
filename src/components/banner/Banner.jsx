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
      <div ref={sliderRef} className="keen-slider h-[600px] ">
        <div className="keen-slider__slide number-slide1">
          <img
            src={
              "https://i.ibb.co.com/DV2zXpW/boy-girl-go-school-by-hand-background-facade-new-building-232631-60.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img
            src={
              "https://i.ibb.co.com/vQt1NQM/it-education-with-children-school-530697-84829.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img
            src={
              "https://i.ibb.co.com/C6hPJww/young-people-studying-using-laptop-23-2147844843.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img
            src={
              "https://i.ibb.co.com/Xb9YQnB/young-teacher-helping-her-students-class-23-2148633379.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide5">
          <img
            src={
              "https://i.ibb.co.com/QkXz2hR/students-knowing-right-answer-329181-14271.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide6">
          <img
            src={
              "https://i.ibb.co.com/KKx0FYP/women-study-together-smiling-23-2147844850.jpg"
            }
            alt=""
          />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        <div className="keen-slider__slide number-slide1">
          <img
            src={
              "https://i.ibb.co.com/DV2zXpW/boy-girl-go-school-by-hand-background-facade-new-building-232631-60.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img
            src={
              "https://i.ibb.co.com/vQt1NQM/it-education-with-children-school-530697-84829.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img
            src={
              "https://i.ibb.co.com/C6hPJww/young-people-studying-using-laptop-23-2147844843.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img
            src={
              "https://i.ibb.co.com/Xb9YQnB/young-teacher-helping-her-students-class-23-2148633379.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide5">
          <img
            src={
              "https://i.ibb.co.com/QkXz2hR/students-knowing-right-answer-329181-14271.jpg"
            }
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide6">
          <img
            src={
              "https://i.ibb.co.com/KKx0FYP/women-study-together-smiling-23-2147844850.jpg"
            }
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
