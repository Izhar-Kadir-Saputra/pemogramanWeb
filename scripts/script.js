// Fungsi untuk menampilkan berita dari local storage saat halaman dimuat
window.onload = () => {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    const newsContainer = document.getElementById('news-container');

    // Loop melalui setiap berita yang disimpan dan menambahkannya ke dalam tampilan halaman
    savedNews.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const judulElement = document.createElement('h3');
        judulElement.textContent = news.judul;

        const gambarElement = document.createElement('img');
        gambarElement.alt = news.judul;
        gambarElement.src = news.gambar; // Menggunakan URL gambar yang disimpan

        const paragrafElement = document.createElement('p');
        paragrafElement.textContent = news.paragraf;

        // Tombol hapus
        const hapusButton = document.createElement('button');
        hapusButton.textContent = 'Hapus';
        hapusButton.onclick = () => {
            hapusBerita(news.judul); // Panggil fungsi hapusBerita dengan judul sebagai parameter
            newsContainer.removeChild(newsCard); // Hapus elemen berita dari DOM
        };

        newsCard.appendChild(judulElement);
        newsCard.appendChild(gambarElement);
        newsCard.appendChild(paragrafElement);
        newsCard.appendChild(hapusButton); // Tambahkan tombol hapus

        newsContainer.appendChild(newsCard);
    });
}

// Fungsi untuk menampilkan berita
function tampilkanBerita() {
    const judul = document.getElementById('judul').value;
    const gambar = document.getElementById('gambar').files[0];
    const paragraf = document.getElementById('paragraf').value;

    if (judul && gambar && paragraf) {
        const newsContainer = document.getElementById('news-container');
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const judulElement = document.createElement('h3');
        judulElement.textContent = judul;

        const gambarElement = document.createElement('img');
        gambarElement.alt = judul;

        const reader = new FileReader();
        reader.onload = event => {
            gambarElement.src = event.target.result;

            const paragrafElement = document.createElement('p');
            paragrafElement.textContent = paragraf;

            // Tombol hapus
            const hapusButton = document.createElement('button');
            hapusButton.textContent = 'Hapus';
            hapusButton.onclick = () => {
                hapusBerita(judul); // Panggil fungsi hapusBerita dengan judul sebagai parameter
                newsContainer.removeChild(newsCard); // Hapus elemen berita dari DOM
            };

            newsCard.appendChild(judulElement);
            newsCard.appendChild(gambarElement);
            newsCard.appendChild(paragrafElement);
            newsCard.appendChild(hapusButton); // Tambahkan tombol hapus

            newsContainer.appendChild(newsCard);

            // Simpan berita ke local storage
            const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
            const newNews = {
                judul,
                gambar: event.target.result, // Simpan URL gambar
                paragraf
            };
            savedNews.push(newNews);
            localStorage.setItem('savedNews', JSON.stringify(savedNews));
        };
        reader.readAsDataURL(gambar);
    } else {
        alert('Mohon isi semua kolom input!');
    }
}

// Fungsi untuk menghapus berita berdasarkan judul dari local storage
function hapusBerita(judul) {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    const updatedNews = savedNews.filter(news => news.judul !== judul); // Filter berita yang memiliki judul yang sama dengan berita yang akan dihapus
    localStorage.setItem('savedNews', JSON.stringify(updatedNews));
    alert('Berita telah dihapus dari local storage!');
}
