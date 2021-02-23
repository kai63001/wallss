import { NextSeo } from "next-seo";
const Header = (props) => (
  <NextSeo
    title={props.title ? props.title + " | MoonsTalk" : "MoonsTalk แหล่งรวมกระทู้"}
    description={props.des ? props.des : "MoonsTalk"}
    canonical={`https://moonstalks.com${props.can}`}
    openGraph={{
        type: 'website',
        locale: 'th_TH',
        title: props.title ? props.title + " | MoonsTalk" : "MoonsTalk แหล่งรวมกระทู้",
        description: props.des ? props.des : "MoonsTalk",
        images: [
          {url: props.image == undefined ||props.image.length == 0?'https://cdn.wallpapersafari.com/55/92/SDVHx6.jpg':props.image}
        ],
        url: `https://moonstalks.com${props.can}`,
        site_name: 'MoonsTalk',
      }}
      twitter={{
        handle: '@moonstalk',
        site: '@moonstalk',
        cardType: 'summary_large_image',
      }}
  />
);

export default Header;