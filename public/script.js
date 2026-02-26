subjects_selector = document.getElementById('subjects_selector');
subject_text = document.getElementById('subject_text');

card_title = document.getElementById('title');
card_info = document.getElementById('info');

let cards_list = [];
let current_subject;
let current_card = 0;


//function for loading the next card
function loadCard(cardNum){
    card_title.textContent = cards_list[cardNum].title;
    card_info.textContent = cards_list[cardNum].info;
}

function loadSubjectList(){
    fetch('data/cards.json')
        .then(res => res.json())
        .then(data => {
            //fill the list with the items
            cards_list = [];
            data.cards.forEach(item => {
                if (item.subject === current_subject) cards_list.push(item);
            });

            //load the first card that has the correct subject
            loadCard(0);
        });
}

//for chosing next card by pressing the button
function switchCard(num){
    current_card += num;
    if (current_card === -1)current_card = 0;
    if (current_card === cards_list.length) current_card --;
    loadCard(current_card);
}

//fetch inititally 
fetch('data/cards.json')
    .then(res => res.json())
    .then(data => {
        //get and set the current subject to what is in the json file
        current_subject = data.subject;
        subject_text.textContent = current_subject;

        //loop through the potential subjects
        data.potential_subjects.forEach(item => {
            const option = document.createElement("option");
            option.textContent = item;
            subjects_selector.appendChild(option);
        });    
    });
    loadSubjectList(); 


//check when subject is changed
subjects_selector.addEventListener("change", function (){
    //get the value
    current_subject = subjects_selector.value;
    subject_text.textContent = current_subject;
    //save it to JSON
    fetch("/updateData", {
        method: "POST",
        headers:{
            "content-Type": "application/json"
        },
        body:JSON.stringify({subject:current_subject})
    });
    loadSubjectList();
    loadCard(0);
});
