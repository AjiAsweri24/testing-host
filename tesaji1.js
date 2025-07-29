// mendapatkan referensi elemen-elemen HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('resultt-screen');

const namaInput = document.getElementById('nama');
const kelasInput = document.getElementById('kelas');
const startQuizBtn = document.getElementById('Start-quiz-btn');

const questionElement = document.getElementById('question');
const optionsContainer = document.querySelector('.option');
const nextQuestionBtn = document.getElementById('next-quetion-btn');
const currenQuetionNumberSpan = document.getElementById('current-quetion-number');

const resultNamaSpan = document.getElementById('result-nama');
const resultKelasSpan = document.getElementById('result-kelas');
const scoreSpan = document.getElementById('score');
const correctAnswersSpan =document.getElementById('corret-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const statusSpan = document.getElementById('status');
const restartQuizBtn = document.getElementById('restart-quiz-btn');

// variabel untuk menyimpan data kuis
let namaPengguna = '';
let kelasPengguna = '';
let currentQuestionIndex = 0;
let score = 0;
let corrretCount = 0;
let wrongCount = 0;
let selectedOption = null; // menyimpan pilihan pengguna untuk soal saat ini

// array objek soal
const question = [
    {
        question: "Klub sepak bola terbaik di dunia ialah?",
        option: ["Real Madrid", "Decul", "Juventus", "Manchester United"],
        answer: "Real Madrid"
    },
    {
        question: "Siapa nama klub sepak bola yang memiliki fans bernama decul?",
        option: ["Al-nasr", "Barcelona", "Arsenal", "Acmilan"],
        answer: "Barcelona"
    },
    {
        quetion: "Siapa nama presiden Amerika Serikat?",
        option: ["Jokowi", "Cristiano Ronaldo", "Donald Trump", "WindahBasudara"],
        answer: "Donald Trump"
    },
    {
        question: "Apa nama mata uang eropa?",
        option: ["Euro", "Bath", "Dollar", "Rupiah"],
        answer: "Euro"
    },
    {
        question: "Apa nama hewan yang bisa hidup di darat dan di air?",
        option: ["AhmadJulian", "Buaya", "Samuelramos", "Cicak"],
        answer: "Buaya"
    },
    {
        question: "Ada berapa benua di dunia?",
        option: ["2", "4", "7", "1"],
        answer: "7"
    },
    {
        question: "Siapa manusia tertampan, tidak sombong, baik hati, dan dermawan?",
        option: ["Aji", "Yaaa sudah jelas Aji", "Pasti Aji", "Semua jawaban benar"],
        answer: "Aji"
    },
    {
        question: "Ada berapa jumlah kaki semut?",
        option: ["4", "6", "100", "buntung"],
        answer: "6"
    },
    {
        question: "Siapa nama raja hungaria tahun 1000m?",
        option: ["Stephen I of Hungary", "Samuel Ramos", "Jotam", "prof.Aji Asweri"],
        answer: "Stephen I of Hungary"
    },
    {
        question: "Planet terbesar di tata surya?",
        option: ["venus", "Jupiter", "Mars", "Bumi"],
        answer: "Jupiter"
    }
];

// --- fungsi-fungsi Utama ---

// fungsi untuk menampilkan layar tertentu
function showScreen(screenToShow) {
    const screens = [startScreen, quizScreen, resultScreen];
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

// fungsi untuk memulai kuis
startQuizBtn.addEventListener('click',() => {
    namaPengguna = namaInput.value.trim();
    kelasPengguna = kelasInput.value.trim();

    if (namaPengguna === '' || kelasPengguna === '') {
        alert('Nama dan Kelas tidak boleh kosong!');
        return;
    }

    // reset semua variabel kuis
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    selectedOption = null;
    nextQuestionBtn.disabled = true;

    //tampilkan soal pertama
    loadQuestion();
    showScreen(quizScreen);
});

// fungsi untuk memuat soal ke tampilan
function loadQuestion() {
    // memastikan tombol next dinonaktifkan setiap kali soal baru dimuat
    nextQuestionBtn.disabled = true;
    optionsContainer.innerHTML = ''; // kosongkan pilihan sebelumnya

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestionNumberSpan.textContent = currentQuestionIndex +1; // update nomor soal

    // buat tombol untuk setiap pilihan jawaban
    currentQuestion.options.forEach(option => {
        const buttom = document.createElement('button');
        button.textContent = option;
        button.classlist.add('option-btn');
        button.addEventListener('click', () => selectedOption(button, option));
        optionsContainer.appendChild(button);
    });
}

// fungsi untuk menangani pilihan jawaban oleh pengguna
function selectOption(button, selectedAnswer) {
    // nonaktifkan semua tombol pilihan setelah satu dipilih
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.removeEventListener('click', () => {}); // hapus event listener
    });

    selectedOption = selectedAswers; // simpan pilihan pengguna
    button.classList.add('selected'); // sandai pilihan yang dipilih

    //periksa jawaban dan berikan feedback visual
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        button.classList.add('correct');
        score += 10; // setiap soal bernilai 10
        correctCount++;
    } else {
        button.classList.add('wrong');
        wrongCount++;
        // tampilkan jawaban yang benar
        const correctAnswer = question[currentQuestionIndex].answer;
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // aktifkan tombol ke 'Soal Selanjutnya'
    nextQuestionBtn.disabled = false;
}

// fungsi untuk pergi ke soal berikutnya
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    selectedOption = null; // reset pilihan untuk soal berikutnya

    if (currentQuestionIndex < questions.length) {
        loadQuestion (); // muat soal berikutnya
    } else {
        showResult(); //menampilkan hasil jika semua soal sudah dijawab
    }
});

// fungsi untuk menampilkan hasil kuis
function showResult() {
    resultNamaSpan.textContent = namaPengguna;
    resultKelasSpan.textContent = kelasPengguna;
    scpreSpan.textContent = score;
    correctAnswersSpan.TextContent = correctCount;
    wrongAnswersSpan.TextContent =wrongCount;

    // tentukan status kelulusan
    if (score >= 90) {
        statusSpan.textContent = 'Anjay Lolos!';
        statusSpan.classList.remove('failed');
        statusSpan.classList.add('passed');
    } else {
        statusSpan.textContent = 'Kocak kocak ga lolos!';
        statusSpan.classList.remove('passed');
        statusSpan.classList.add('failed');
    }

    showScreem(resultScreen); // tampilkan layar hasil
}

// fungsi untuk mengulang kuis
restartQuizBtn.addEventListener('click', () => {
    namaInput.value = ''; // kosongkan input nama
    kelasInput.value = ''; // kosongkan input kelas
    showScreen(startScreen); // kembali ke layar awal
});

//inisialisasi: tampilkan layar awal saat halamat dimuat
showsScreen(startScreen);