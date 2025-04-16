import "./Home.css";
import baju from "../assets/product4.png";

function Home() {
  return (
    <section className="full-width-section fade-in">
      <div className="home-wrapper container">
        <div className="home-card">
          <img src={baju} alt="Baju" className="home-image" />
        </div>
        <div className="home-description">
          <h1>
            IRREGULAR <br /> FASHION STORE
          </h1>
          <p>
            Tampil keren dan nyaman dengan kaos berkualitas tinggi berbahan
            adem, cocok untuk segala aktivitas! Desain bisa dibuat sesuai
            keinginan, mulai dari gambar, tulisan, hingga warna favoritmu. Pesan
            sekarang dan wujudkan kaos impianmu dengan harga bersahabat! Buruan,
            stok terbatas!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
