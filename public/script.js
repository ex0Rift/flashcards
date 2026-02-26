subjects_selector = document.getElementById('subjects_selector');
subject_text = document.getElementById('subject_text');

card_title = document.getElementById('title');

let cards_list = [];
let current_subject;


//function for loading the next card
function loadCard(cardNum){
    card_title.textContent = cards_list[cardNum].title;
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
            console.log(cards_list);

            //load the first card that has the correct subject
            card_title.textContent = cards_list[0].title;
        });

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
