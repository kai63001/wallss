import { NextSeo } from "next-seo";
const Header = (props) => (
  <NextSeo
    title={props.title ? `${props.title} Wallpapers HD Background Images` : "Wallss HD 4k Beautiful Wallpapers Backgrounds"}
    description={props.des ? props.des : "Wallss the best website to download beautiful wallpapers backgrounds images hd 4k desktops phones iphone and tables free"}
    canonical={`https://wallss.net${props.can}`}
    openGraph={{
        type: 'website',
        locale: 'th_TH',
        title: props.title ? `${props.title} Wallpapers HD Background Images` : "Wallss HD 4k Beautiful Wallpapers Backgrounds",
        description: props.des ? props.des : "Wallss the best website to download beautiful wallpapers backgrounds images hd 4k desktops phones iphone and tables free",
        images: [
          {url: props.image == undefined ||props.image.length == 0?'https://cdn.wallpapersafari.com/55/92/SDVHx6.jpg':props.image}
        ],
        url: `https://wallss.net${props.can}`,
        site_name: 'MrWalli',
      }}
      twitter={{
        handle: '@wallss',
        site: '@wallss',
        cardType: 'summary_large_image',
      }}
  />
);

export default Header;