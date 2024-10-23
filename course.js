// Soal, opsi jawaban, dan jawaban benar
const questions1 = [
    {
        question: 'Apa output dari program ini?<br><pre><code>number=2<br>print(number+number+number)</code></pre>',
        options: ['6', 'numbernumbernumber', 'Syntax Error'],
        correctAnswer: '6'
    },
    {
        question: 'Dibawah ini adalah program untuk mengubah satuan detik menjadi satuan jam<br><pre><code>seconds = 14926<br><br>hours = seconds (A) 3600<br>leftover_seconds = seconds (B) 3600<br>minutes = leftover_seconds (C) 60<br>final_seconds = leftover_seconds (D) 60<br><br>print(str(hours) , "hours," , minutes  , "minutes, and" , final_seconds , "seconds")</code></pre><br>operasi apa yang benar untuk A, B, C, dan D?',
        options: ['%, //, %, //', '//, %, //, %', '//, //, %, %'],
        correctAnswer: '//, %, //, %'
    },
    {
        question: 'Apa output dari program ini?<br><pre><code>num = 3<br>num = num + num<br>num = num * 2 <br>print(num)</code></pre>',
        options: ['3', '6', '12'],
        correctAnswer: '12'
    },
    // Tambahkan soal-soal lain di sini
];

const questions2 = [
    {
        question: 'Apa output dari kode berikut?<br><pre><code>for letter in "hello":<br>   print(letter)</code></pre>',
        options: ['h, e, l, l, o', '"hello"', 'Tidak ada output'],
        correctAnswer: 'h, e, l, l, o'
    },
    {
        question: 'Apa output dari kode berikut?<br><pre><code>num=10<br>for i in range 4<br>   num = num-i<br>print(num)</code></pre>',
        options: ['10', '7', '3'],
        correctAnswer: '3'
    },
    {
        question: 'Apa output dari kode berikut?<br><pre><code>i = 0<br>while i < 3:<br>   print(i)<br>   i+=1</code></pre>',
        options: ['1, 2, 3', '0, 1, 2', 'i, i, i'],
        correctAnswer: '0, 1, 2'
    },
    // Tambahkan soal-soal lain di sini
];

const questions = [
    {
        question: '<pre><code>if x > 5:<br>   print("banyak)<br>else:<br>   print("dikit")</code></pre><br>Jika x = 5, apa outputnya?',
        options: ['banyak', 'dikit', 'Tidak ada output'],
        correctAnswer: 'dikit'
    },
    {
        question: '<pre><code>if z % 2 == 0:<br>   print(____A_____)<br>else:<br>   print(_____B____)</code></pre><br> kata apa yang cocok untuk bagian A dan B?',
        options: ['Positif dan Negatif', 'Genap dan Ganjil','Besar dan Kecil'],
        correctAnswer: 'Genap dan Ganjil'
    },
    {
        question: '<pre><code>x = 5<br>y = 10<br>if x > 10 or y > 5:<br>    print("Salah satu atau kedua kondisi benar")<br>else:<br>    print("Kedua kondisi salah")</code></pre><br> Apa output dari kode ini?',
        options: ['Salah satu atau kedua kondisi benar', 'Kedua kondisi salah', 'Tidak ada output'],
        correctAnswer: 'Salah satu atau kedua kondisi benar'
    },
    // Tambahkan soal-soal lain di sini
];

let currentQuestion = 0;
let progressWidth = 0;
const totalQuestions = questions.length;

// Fungsi untuk menampilkan soal dan opsi jawaban ke layar
function loadQuestion() {
    const questionObj = questions[currentQuestion];

    // Gunakan innerHTML untuk mendukung elemen-elemen khusus dalam soal
    document.getElementById('question').innerHTML = questionObj.question;

    // Menampilkan opsi jawaban
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = ''; // Membersihkan opsi sebelumnya

    questionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${option}">
            ${option}
        `;
        optionsContainer.appendChild(label);
    });

    // Disable check button at the beginning
    document.getElementById('check-btn').disabled = true;

    // Enable check button and add 'checked' class when an option is selected
    const inputs = document.querySelectorAll('input[name="answer"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            // Remove 'checked' class from all labels
            document.querySelectorAll('.options label').forEach(label => {
                label.classList.remove('checked');
            });

            // Add 'checked' class to the selected label
            const selectedLabel = input.parentElement;
            selectedLabel.classList.add('checked');

            // Enable check button
            document.getElementById('check-btn').disabled = false;
        });
    });
}

// Fungsi untuk memeriksa jawaban
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        alert("Correct!");
        nextQuestion();
    } else {
        alert("Wrong answer. Try again!");
    }
}

// Fungsi untuk menuju soal berikutnya
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        // Update progress bar
        progressWidth += 100 / totalQuestions;
        document.getElementById('progress').style.width = progressWidth + '%';

        loadQuestion(); // Load next question
    } else {
        alert("Quiz completed!");
    }
}

// Kembali ke halaman utama
function goBack() {
    window.location.href = 'index.html'; // Redirect ke halaman utama
}

// Memulai kuis dengan pertanyaan pertama
loadQuestion();