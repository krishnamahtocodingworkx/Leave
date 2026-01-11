import HomeBannerSlider from "@/components/bannerSlider";
import Categories from "@/components/catergories";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-3">
      <Categories />
      {/* <HomeBannerSlider /> */}
      {/* <h1>Home Page</h1> */}
      {/* <Link href="/login">Open Login Modal</Link> */}
    </div>
  );
}
