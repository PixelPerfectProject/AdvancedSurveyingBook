let btns = document.querySelectorAll('.btn');
let chapter = document.getElementById('chapter');
let bookName = document.getElementById('bookName');
let nav = document.getElementById('nav');
let qna = document.getElementById('qna');
let Q = document.getElementById('Q');
let Ans = document.getElementById('Ans');
let img = document.getElementById('img');
let showValue = document.getElementById('showValue');
let showValue2 = document.getElementById('showValue2');
let totalQuestions = bookData.chapters.reduce((total, chapter) => total + chapter.questions.length, 0); //প্রশ্নের সংখ্যা বের করা
let bookMarkContainer = document.getElementById('bookMarkContainer');
let bookMarkContainer2 = document.getElementById('bookMarkContainer2');
let answeredQuestions = 0; // ক্লিক করা প্রশ্নের সংখ্যা
let showProgress = document.getElementById('showProgress');
let total = document.getElementById('totalQuestions');
let opened = document.getElementById('opened');
let remaining = document.getElementById('remaining');
let percentage = document.getElementById('percentage');
let closeAllBookmark = document.getElementById('closeAllBookmark');

let progressAndBookmark = document.getElementById('progressAndBookmark');
let bookmarkDetails = document.getElementById('bookmarkDetails');
let PnBtoggle = true;

let bookmark = {
    question : [],
    answer : []
}


window.onload = () => {
    chapter.style.display = 'none';
    total.innerText = totalQuestions;
    progressAndBookmark.style.display = 'none';
}
img.addEventListener('click', function () {
    nav.style.display = 'block';
    img.style.display = 'none';
})

let currentPosition = chapter.offsetTop;
window.onscroll = function () {
    let windowPosition = document.documentElement.scrollTop;
    if (windowPosition >= currentPosition) {
        chapter.classList.add('sticky');
    }else{
        chapter.classList.remove('sticky');
    }
}

function generateQuestion (c) {
    bookData.chapters[c].questions.forEach((everyQ) =>{
        let p = document.createElement('p');
        let button = document.createElement('button');
        button.classList.add('borderTop');
        button.textContent = everyQ.question;
   
        let isAnswered = false;
        let count = 1;

        p.appendChild(button)
        qna.appendChild(p);

        button.addEventListener('click', () => {
            if (!isAnswered) {
                answeredQuestions++;
                isAnswered = true;

                let addBookMark = document.createElement('p');
                addBookMark.classList.add('addBookMark');
                p.appendChild(addBookMark);

                let isbookMarked = false;

                function starImageToggle (question, answer) {
                    if (!isbookMarked) {
                        addBookMark.style.backgroundImage = `url('image/starWithFill.png')`;
                        bookmark.question.push(question);
                        bookmark.answer.push(answer);
                        isbookMarked = true;

                    }else{
                        addBookMark.style.backgroundImage = `url('image/starWithoutFill.png')`;
                        bookmark.question = bookmark.question.filter(item => item !== question);
                        bookmark.answer = bookmark.answer.filter(item => item !== answer);
                        isbookMarked = false;
                    }
                }
                
                addBookMark.addEventListener('click', function() {
                    let question = everyQ.question;
                    let answer = everyQ.answer;
                    starImageToggle(question, answer);
                    localStorage.setItem('bookmark', JSON.stringify(bookmark));
                });



                let progressPercentage = (answeredQuestions / totalQuestions) * 100;
                let progressDegrees = (answeredQuestions / totalQuestions) * 360; // 360 ডিগ্রি পুরো বৃত্ত
                bookMarkContainer.style.background = `conic-gradient(#03f818 ${progressDegrees}deg, white 0deg)`;
                showValue.innerText = answeredQuestions + '%';
                bookMarkContainer2.style.background = `conic-gradient(#03f818 ${progressDegrees}deg, white 0deg)`;
                showValue2.innerText = answeredQuestions + '%';
                opened.innerText = answeredQuestions;
                remaining.innerText = totalQuestions - answeredQuestions;
                percentage.innerText = progressPercentage.toFixed(2) + ' %';
            }
            let h3 = document.createElement('h3');
            h3.textContent = everyQ.answer;
            p.appendChild(h3); 
        })
    } )
}
function displayQuestions (btn) {

        if (btn.textContent == '১ম অধ্যায়'){
            generateQuestion(0);
        }else if (btn.textContent == '২য় অধ্যায়'){
            generateQuestion(1);
        }else if (btn.textContent == '৩য় অধ্যায়'){
            generateQuestion(2);
        }else if (btn.textContent == '৪র্থ অধ্যায়'){
            generateQuestion(3);
        }else if (btn.textContent == '৫ম অধ্যায়'){
            generateQuestion(4);
        }else if (btn.textContent == '৬ষ্ঠ অধ্যায়'){
            generateQuestion(5);
        }else if (btn.textContent == '৭ম অধ্যায়'){
            generateQuestion(6);
        }else if (btn.textContent == '৮ম অধ্যায়'){
            generateQuestion(7);
        }else if (btn.textContent == '৯ম অধ্যায়'){
            generateQuestion(8);
        }else if (btn.textContent == '১০ম অধ্যায়'){
            generateQuestion(9);
        }else if (btn.textContent == '১১শ অধ্যায়'){
            generateQuestion(10);
        }else{
            console.log('faruk')
        }

}

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    img.style.display = 'block';
    nav.style.display = 'none';

    qna.textContent = ''
    chapter.textContent = btn.textContent
    chapter.style.display = 'block'
    bookName.style.display = 'none';
    displayQuestions(btn);
  });
});

function searchResult() {
    let input = document.getElementById('input').value.trim(); 
    let searchResults = document.getElementById('searchResults'); 
    if (input === '') {
        searchResults.innerHTML = '';
        return;
    }
    searchResult.innerHTML = '';

    bookData.chapters.forEach(chapter => {
        chapter.questions.forEach(questionObj => {
            if (questionObj.question.includes(input)) { 
                let resultItem = document.createElement('div');
                resultItem.innerHTML = `<p>প্রশ্ন: ${questionObj.question}</p> 
                <p>উত্তর: ${questionObj.answer}</p> `;
                searchResults.appendChild(resultItem); 
            }
        });
    });
}
bookMarkContainer.addEventListener('click', function () {
    if (PnBtoggle == true) {
        progressAndBookmark.style.display = 'block';
        PnBtoggle = false;
            let storedBookmark = JSON.parse(localStorage.getItem('bookmark'));

            function generateBookmarkSection () {
                for (let i = 0; i < storedBookmark.question.length; i++) {
                    // প্রশ্নের জন্য <p> এলিমেন্ট তৈরি
                    let questionElement = document.createElement('p');
                    questionElement.classList.add('bookmarkStyle');
                    questionElement.textContent = storedBookmark.question[i];  // প্রশ্নের টেক্সট
                    
                    // উত্তরের জন্য <p> এলিমেন্ট তৈরি
                    let answerElement = document.createElement('p');
                    answerElement.textContent = storedBookmark.answer[i];  // উত্তরের টেক্সট
                    
                    // <p> এলিমেন্টগুলো 'bookmarkDetails' ডিভে এপেন্ড করা
                    bookmarkDetails.appendChild(questionElement);
                    bookmarkDetails.appendChild(answerElement);
                }
            }
            generateBookmarkSection();

    }else{
        progressAndBookmark.style.display = 'none';
        PnBtoggle = true;
    }
    closeAllBookmark.addEventListener('click', function () {
        localStorage.clear();
        bookmarkDetails.innerText = '';
        console.log('All bookmarks cleared from localStorage.');
    })
})

