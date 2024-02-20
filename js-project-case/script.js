let Questions = [];
let Answer = [];
let AnswerName=["A","B","C","D"];
let splashScreen = document.getElementById("splashScreen")
let correctAnswer = []
let incorrectAnswers =[]
let time;
let currQuestion = 0
let score = 0
let options=[];
let titleQues = document.getElementById("title")
const checkButton= document.querySelector('button');


if (Questions.length === 0) {
	splashScreen.innerHTML = `<h3>Sınav sayfasına yönlendiriliyorsunuz. Başarılar.</h3>`
	splashScreen.innerHTML+= `<br/><h5> Soruları açıldıktan 10 saniye sonra cevaplayabilirsiniz.
							 	Her soru 30 saniyedir. 30 saniye sonra diğer soruya geçilecektir. 
								Bir önceki soruya dönemezsiniz.</h5>`

}
setTimeout(() => {
	checkButton.style.display='block';
	questionsAndAnswers();

	if (Questions.length === 0) {
		splashScreen.innerHTML = `<h5 style='color: red'>Bir sorun oluştu. Lütfen tekrar deneyiniz.</h5>`
	}


}, 5000)
fetchApi();


async function fetchApi() {
	try {
		const response = await
		fetch('https://jsonplaceholder.typicode.com/posts?userId=1');

		if (!response.ok) {
			throw new Error(`Something went wrong!!
		Unable to fecth the data`);
		}
		const data = await response.json();
		Questions = data;
		Questions.forEach((el, index) => {
			correctAnswer.push(el.body.slice(0,10))
			for (let index = 0; index < 3; index++) {
				incorrectAnswers.push(el.body.slice((index+20),(index+25)))
			}

		})
	}
	catch (error) {
		console.log(error);
		splashScreen.innerHTML = `<h5 style='color: red'>
		${error}</h5>`;
	}
}

function questionsAndAnswers() {
	const opt = document.getElementById("opt");
	const body = document.getElementById("body");
	splashScreen.innerHTML="";
	titleQues.innerText= 'Title: ' + Questions[currQuestion].title;
	body.innerHTML='Body: '+ Questions[currQuestion].body;
	opt.innerHTML = ""

    options = [correctAnswer[currQuestion]]
    options.forEach((option) => {
		const choicesdiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");
		choice.type = "radio";
		choice.name = "answer";
		choice.disabled = true;
		choice.value = option;
		choiceLabel.textContent = AnswerName[0]+ ' - ' + option;
		choicesdiv.appendChild(choice);
		choicesdiv.appendChild(choiceLabel);
		opt.appendChild(choicesdiv);

		setTimeout(() => {
		choice.disabled = false;
	
	
		}, 10000)
	});
	
	
    for (let index=0;index < 3;index++) {

        options = [incorrectAnswers[index]];
        options.forEach((option) => {
		const choicesdiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");
		choice.type = "radio";
		choice.name = "answer";
		choice.disabled = true;
		choice.value = option;
		choiceLabel.textContent = AnswerName[index+1]+' - ' + option;
		choicesdiv.appendChild(choice);
		choicesdiv.appendChild(choiceLabel);
		opt.appendChild(choicesdiv);

		setTimeout(() => {
			choice.disabled = false;
		
		
		}, 10000) 
	});
	}
	time=setTimeout(checkAnswer, 30000); 
}

function scoreTable() {
	const totalScore = document.getElementById("correctScore");
	const tableText = document.getElementById("tableText");
	const tableColText = document.getElementById("tableColText");

	totalScore.innerHTML =`<h1 style="color:green">Correct :  ${score}</h1>`;
	tableColText.innerHTML += '<th scope="col">#</th>';
	tableColText.innerHTML += '<th scope="col">Answer</th>';
	Questions.forEach((el, index) => {
	
		if (Answer[index]==correctAnswer[index]) 
		{
			tableText.innerHTML+= `<tr><th scope="row">${index + 1}</th><td>${Answer[index]}  <i  style="color:green" class="bi bi-check"></i></td></tr> `;
		
		}
		else if(Answer[index]==undefined){
			tableText.innerHTML+= `<tr><th scope="row">${index + 1}</th><td>No answer</td> </tr>`;
			
		}
		else{
			tableText.innerHTML+= `<tr><th scope="row">${index + 1}</th><td>${Answer[index]}  <i style="color:red" class="bi bi-x"></i></td> </tr>`;

			
		}
	})
}


function nextQuestion() {
	
	   if (currQuestion <Questions.length-1) {

		currQuestion++;
		questionsAndAnswers();
	} else {
		document.getElementById("opt").remove()
		document.getElementById("title").remove()
		document.getElementById("body").remove()
		document.getElementById("btn").remove()
		scoreTable();
	}
}

function checkAnswer() {
	clearTimeout(time); 
	const selectedAns = document.
		querySelector('input[name="answer"]:checked')?.value;
	
	if(selectedAns){
		if (selectedAns === correctAnswer[currQuestion]) {
		score++;
		Answer.push(selectedAns);
		nextQuestion();
	} else {
		Answer.push(selectedAns);
		nextQuestion();
	}
	}
	else{
		
		Answer.push(selectedAns);
		nextQuestion();
	}
	
}
