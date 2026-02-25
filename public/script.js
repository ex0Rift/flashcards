subjects_selector = document.getElementById('subjects_selector');

function ReloadData(type = 0){
    fetch('data/cards.json')
        .then(res => res.json())
        .then(data => {
            //get and set the current subject to what is in the json file
            let current_subject = data.subject;

            //loop through the potential subjects
            data.potential_subjects.forEach(item => {
                const option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                subjects_selector.appendChild(option);
            }); 

            //loop throgh the cards
            data.cards.forEach(item => {
                console.log(item.title);
            });
        });
}
//run when pages loads first
ReloadData();

//check when subject is changed
subjects_selector.addEventListener("change", function (){
    //get the value
    current_subject = subjects_selector.value;
    //save it to JSON
    fetch("/updateData", {
        method: "POST",
        headers:{
            "content-Type": "application/json"
        },
        body:JSON.stringify({subject:current_subject})
    });

});
