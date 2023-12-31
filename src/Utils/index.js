export const ThreeSlideSettings = {
  dots: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  className: "Carouselsettings",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};
export const FourSlideSettings = {
  dots: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  className: "Carouselsettings",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
      },
    },
  ],
};

export const SingleImageCarouselsettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  className: "Carouselsettings",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        arrows: true,
      },
    },
  ],
};

export const propertyFor = [
  { name: "rent", value: "Rent" },
  { name: "sale", value: "Sale" },
  // { name: "buy", value: "buy" },
];
export const category = [
  { name: "house", value: "house" },
  { name: "land", value: "land" },
];
export const subCategory = [
  { name: "mansion", value: "mansion", category: "house" },
  { name: "bungalow", value: "bungalow", category: "house" },
  { name: "triplex", value: "triplex", category: "house" },
  { name: "duplex", value: "duplex", category: "house" },
  { name: "villa", value: "villa", category: "house" },
  { name: "cottage", value: "cottage", category: "house" },
  { name: "agricultural", value: "agricultural", category: "land" },
  { name: "residential", value: "residential", category: "land" },
  { name: "commercial", value: "commercial", category: "land" },
];
