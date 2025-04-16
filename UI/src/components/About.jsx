import React from 'react';
import "./About.css";

const About = () => {
    return (
        <div className='About' style={aboutStyle}>
            <h2>ABOUT US</h2>
            <p>Irregular Fashion Store adalah destinasi terbaik bagi kamu yang ingin tampil beda dengan gaya unik dan penuh karakter. Kami menghadirkan koleksi kaos berkualitas tinggi yang tidak hanya stylish, tetaoi juga nyaman dikenakan dalam berbagai aktivitas.</p>
            <p>Dengan desain eksklusif yang terinspirasi dari tren urban dan streetwear, setiap produk kami dibuat untuk mencerminkan kepribadian dan keunikan pemakainya. Kami menggunakan bahan premium yang lembut, adem, dan tahan lama, memastikan setiap kaos yang kamu kenakan memberikan kenyamanan maksimal. </p>
            <p>Kami percaya bahwa fashion adalah bentuk ekspresi diri, dan melalui Irregular Fashion Store, kami ingin membantumu menemukan gaya yang paling sesuai dengan kepribadianmu. Dengan komitmen terhadap kualitas, desain inovatif, dan harga yang tetap terjangkau, kami siap menjadi bagian dari perjalanan fashionmu.</p>
        </div>
    );
};

const aboutStyle = {
    padding: '20px',
    textalign: 'center'
};

export default About