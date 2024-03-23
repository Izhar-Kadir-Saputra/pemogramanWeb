
// Fungsi untuk menampilkan nama pengguna di navbar
function displayUsername(username) {
    const userNavElements = document.querySelectorAll('.userNav');
    userNavElements.forEach(element => {
        element.innerText = 'Halo ' + username;
    });
}
// function untuk running string secara bertahap
function tampilkanStringSecaraBertahap(string, delay) {
    let index = 0;
    let outputElement = document.querySelector('.output');
    let interval = setInterval(function() {
        if (index <= string.length) {
            outputElement.textContent = "Selamat Datang, " + string.substring(0, index);
            index++;
        } else {
            index = 0; // Setel kembali indeks ke 0 setelah selesai
        }
    }, delay);
}
// Mengenkripsi kata sandi sebelum menyimpannya
function encryptPassword(password) {
    // fungsi btoa() digunakan untuk mengenkripsi kata sandi dari string menjadi formatBase64
    return btoa(password);
}

// Fungsi untuk menampilkan home dan menyembunyikan form login
function showHome() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Fungsi untuk menyembunyikan home dan menampilkan form login
function showLoginForm() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Mengambil data dari localStorage (jika ada)
const usersData = localStorage.getItem('users');
const users = usersData ? JSON.parse(usersData) : [];

// Function untuk menyimpan data pengguna ke localStorage
function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Event listener untuk tombol logout
document.getElementById('logout').addEventListener('click', function() {
    showLoginForm();
    // Hapus informasi pengguna yang login kemudian segarkan halaman
    const loggedInUser = users.find(user => user.isLoggedIn);
    if (loggedInUser) {
        loggedInUser.isLoggedIn = false;
        saveUsersToLocalStorage(); // Simpan perubahan ke localStorage
    }
    location.reload();
});

// Fungsi untuk menangani proses login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = encryptPassword(document.getElementById('loginPassword').value);

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('yeei, berhasil logiin!');
        user.isLoggedIn = true; // Menandai pengguna yang login
        saveUsersToLocalStorage(); 
        document.getElementById('home').style.display = 'block'; // Tampilkan nhome
        document.getElementById('loginForm').style.display = 'none'; 
        displayUsername(user.username); // Panggil fungsi untuk menampilkan nama pengguna di navbar
        tampilkanStringSecaraBertahap(user.username, 500);
    } else {
        alert('Username atau password tidak salah, YAAAH COBA LAGII!!!');
    }
}


// Fungsi untuk menangani proses registrasi
function register(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Konfirmasi password anda tidak sesuai, YAAAH COBA LAGII!!!');
        return;
    }

    const existingUser = users.find(user => user.username === newUsername);
    if (existingUser) {
        alert('Username sudah ada. Silakan pilih yang lain.');
    } else {

        const encryptedPassword = encryptPassword(newPassword);
        users.push({ username: newUsername, password: encryptedPassword });
        saveUsersToLocalStorage(); 
        alert('Registrasi berhasil');
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }
}

// Event listener untuk pengiriman formulir login
document.getElementById('login').addEventListener('submit', login);

// Event listener untuk "Daftar" link
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

// Event listener untuk pengiriman formulir registrasi
document.getElementById('register').addEventListener('submit', register);

// Memeriksa apakah ada pengguna yang sudah login sebelumnya
const loggedInUser = users.find(user => user.isLoggedIn);
if (loggedInUser) {
    showHome(); // Menampilkan home jika pengguna sudah login sebelumnya
    displayUsername(loggedInUser.username); // Menampilkan nama pengguna di navbar
    tampilkanStringSecaraBertahap(loggedInUser.username, 500); // Menampilkan string secara bertahap
}

