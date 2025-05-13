import { Product, Footer, FooterBanner, HeroBanner } from "./components";
import { clint } from "./lib/clint";

const getData = async () => {
    const query = '*[_type == "product"]';
    const products = await clint.fetch(query);
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await clint.fetch(bannerQuery);
    return [products, bannerData];
};
export default async function Home() {
    const [products, bannerData] = await getData();
    return (
        <div>
            <HeroBanner bannerData={bannerData[0]} />
            <div className="products-heading">
                <h2>Beast Sealing Product</h2>
                <p>Speakers of many variations</p>
            </div>
            <div className="products-container">
                {products.map((product) => {
                    return <Product key={product._id} product={product} />;
                })}
            </div>
            <FooterBanner footerData={bannerData[0]} />
        </div>
    );
}
