// DAFTAR SOAL
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
];
const questions2 = [
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
];

const questions3 = [
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
];

//pilih course
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const courseParam = getQueryParam('course');
let questions;

if (courseParam === 'variable') {
    questions = questions1;
} else if (courseParam === 'conditional') {
    questions = questions2;
} else if (courseParam === 'loop') {
    questions = questions3;
}

//show question
let currentQuestion = 0;
let progressWidth = 0;
const totalQuestions = questions.length;

function loadQuestion() {
    //soal
    const questionObj = questions[currentQuestion];
    document.getElementById('question').innerHTML = questionObj.question;
    //jawab
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    questionObj.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${option}">
            ${option}
        `;
        optionsContainer.appendChild(label);
    });

    //check button
    document.getElementById('check-btn').disabled = true;
    const inputs = document.querySelectorAll('input[name="answer"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.options label').forEach(label => {
                label.classList.remove('checked');
            });

            const selectedLabel = input.parentElement;
            selectedLabel.classList.add('checked');

            document.getElementById('check-btn').disabled = false;
        });
    });
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        nextQuestion();
    } else {
        alert("Wrong answer. Try again!");
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        // update progress bar
        progressWidth += 100 / totalQuestions;
        document.getElementById('progress').style.width = progressWidth + '%';

        loadQuestion();
    } else {
        showCompletionMessage();
    }
}

function showCompletionMessage() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <div class="completion-message">
            <img src='assets/party-popper.png' alt="Party Popper" class="completion-image">
            <h2>Selamat, Anda telah menyelesaikan kuis!</h2>
            <button onclick="goBack()" class="back-btn">Back to Home</button>
        </div>
    `;

    document.getElementById('progress').style.width = '100%';
    saveCompletedCourse();
}

// Kembali ke halaman utama
function goBack() {
    window.location.href = 'index.html';
}

loadQuestion();

// completed course
function markCompletedCourses() {
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
    
    completedCourses.forEach(courseId => {
        let courseLink = document.querySelector(`a[href*="course=${courseId}"]`);
        if (courseLink) {
            courseLink.classList.add('completed');
        }
    });
}

function saveCompletedCourse() {
    const courseParam = getQueryParam('course');
    let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

    if (!completedCourses.includes(courseParam)) {
        completedCourses.push(courseParam);
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    }
}