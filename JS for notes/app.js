////// This function is to store the user entered notes data into local storage when they click the add note button //////

const addButton = document.getElementById("addBtn");

addButton.addEventListener("click", () => {
    let addTitle = document.getElementById("addTitle"); // set a variable and assign it to the id of the title of the note text field tag.
    let addtext = document.getElementById("addTxt"); // do the same for the note comments text area tag
    let notes = localStorage.getItem("notes"); // in order to save to local storage, we need to assign a name for the key which we used "notes" here. We need the key to get the elements / notes.

    if (notes == null) {
      notesObj = []; // blank array initally, but we want to add and display new notes. We used an array here because we will expect a list of notes each saved as an object data type.
    } else {
      notesObj = JSON.parse(notes); // convert JSON string into JS object and re-assign in the variable for manipulation.
    }
    /// assign a temp obj, add the value assigned to the note title and the value assigned to the note comment and push the data into the notesObj. ///
    let myObj = {
      title: addTitle.value,
      text: addtext.value,
    };
    notesObj.push(myObj);
    // console.log(notesObj); // test output
    /// after pushing to the temp array, now we can save it to local storage with stringify ///
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log(notesObj); // test output
    ///  After clicking the add note button, we need to reset the value of the field to an empty string, as we don't want the old comment to still be visible after clicking add note button. ///
    addtext.value = "";
    addTitle.value = "";

    showNote(); // finally, we need to display the new note with the show note function defined below.
  });

//////

////// this function is to show the notes in the DOM //////

function showNote() {
  let notes = localStorage.getItem("notes"); // grab the local storage JSON obj with a key of "notes", store it in the temp variable notes.

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = ""; // set the temp variable initially to a blank empty string
  /// in the function below, for each item in the notesObj array, append the html markup to the variable html, where element is the object value-pairs, index represents element position, title represents the note title of that element that the user types and text is that element's or note's comments. ///

  notesObj.forEach(function (element, index) {
    // console.log(element);
    // console.log(index);
    html += `
            <div class="card col align-items-start my-2 mx-0 noteCard w-33 bg-light">
                <div class="card-body">
                    <h5 id="example" class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" class="btn btn-warning" onclick="handlePush(this.id)">Push to Progress</button>
                    <button id=" ${index}" class="btn btn-danger" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>
            `;
  });

  let notesElm = document.getElementById("notes"); //this is another variable to store the notes in
  /// presumably .length returns the number of child elements within the html tag with id of "notes". This returns 0 ?
  if (notesElm.length != 0) {
    notesElm.innerHTML = `<h3 id="to-do-heading" class="mx-2 text-center">Assigned / Backlog</h3>${html}`;
  } else {
    notesElm.innerHTML = "Nothing to show at this point";
  }
}

showNote();


////// Function to delete note //////

function deleteNote(index) {
  console.log(index); // test
  // console.log("deleting" + index);
  let confirmDel = true // confirm("Delete note?");
  let notes = localStorage.getItem("notes"); // grab the local storage notes
  let progNotes = localStorage.getItem("notes-progress"); // grab the local storage notes
  if (confirmDel == true) {
    if (notes == null || progNotes  == null) { // not sure this is needed? notes can not be null as this would mean the local storage would be empty and so the html markup containing the delete note button would not be rendered to the DOM.
      notesObj = [];
      progNotesObj = [];
    } else {
      notesObj = JSON.parse(notes);
      progNotesObj = JSON.parse(progNotes);
    }
    notesObj.splice(index, 1); // this means start from the first number defined by the parameter index position. 1 = delete one item.
    progNotesObj.splice(index, 1); 
    localStorage.setItem("notes", JSON.stringify(notesObj)); // take the remaining notes items in notesObj and save it back to local storage.
    localStorage.setItem("notes-progress", JSON.stringify(progNotesObj));
    showNote(); // re-display updated notes
    showProgNote();
  }
}

//////

// FUNCTION TO PUSH NOTE FROM BACKLOG TO PROGRESS COLUMN ******************
const pushBtn = document.getElementById("push-to-progress");
let transferProgObj = []; // use this array to add each note item that was pushed from assign to progress in the DOM and save in local storage
function handlePush(index) {
  let notesProg = localStorage.getItem("notes");
  let notesProgObj = [];
  notesProgObj = JSON.parse(notesProg);
  // console.log(notesProgObj);

  let progHtml = '';
  progHtml += `
            <div class="card col align-items-start my-2 mx-0 noteCard w-33 bg-yellow">
                <div class="card-body">
                    <h5 id="card-progress-title" class="card-title">${notesProgObj[index].title}</h5>
                    <p class="card-text">${notesProgObj[index].text}</p>
                    <button id="${index}" class="btn btn-success" onclick="handleComplete(this.id)">Push to Completion</button>
                </div>
            </div>
            `;
  let notesProgCol = document.getElementById("notes-progress");
  if (notesProgCol.childElementCount == 0) {
    // console.log(notesProgCol.childElementCount);
    notesProgCol.innerHTML += `<h3 id="in-progress-heading" class="mx-2 text-center">In Progress</h3>${progHtml}`;
  } else {
    notesProgCol.innerHTML += `${progHtml}`;
    // console.log(notesProgCol.childElementCount);
  }
  // localStorage.setItem("prog-notes",)
  let progNotesObj = {
    title: notesProgObj[index].title,
    text: notesProgObj[index].text
  };
  
  transferProgObj.push(progNotesObj);
  // console.log(progNotesObj);
  localStorage.setItem("notes-progress", JSON.stringify(transferProgObj));
  deleteNote(index);
  showProgNote();
}

//////

function showProgNote() {
  let notesProgress = localStorage.getItem("notes-progress");
  
  if (notesProgress == null) {
    notesProgObj = [];
  } else {
    notesProgObj = JSON.parse(notesProgress);
    console.log(notesProgObj);
  }

  let progHtml = "";

  notesProgObj.forEach(function (element, index) {
    console.log(element);
    console.log(index);
    progHtml += `
    <div class="card col align-items-start my-2 mx-0 noteCard w-33 bg-yellow">
    <div class="card-body">
        <h5 id="card-progress-title" class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id="${index}" class="btn btn-success" onclick="handleComplete(this.id)">Push to Completion</button>
        <button id=" ${index}" class="btn btn-danger" onclick="deleteNote(this.id)">Delete Note</button>
    </div>
</div>
            `;
  });
  let notesProgElm = document.getElementById('notes-progress')
  if (notesProgress.length != 0) {
    console.log(notesProgElm.length)
    notesProgElm.innerHTML = `<h3 id="in-progress-heading" class="mx-2 text-center">In Progress</h3>${progHtml}`;
  } else {
    notesProgElm.innerHTML = "Nothing to show at this point";
  }
}

showProgNote();

///// SEARCH BAR //////

let search = document.getElementById("searchTxt");
// input event listener to fire when text is entered in the search bar. We cannot use keyup event, this only applies to checking the last key that was pressed, not the entire text string suggestion in the search bar.
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase(); // In HTML DOM, the value property sets or returns the value of the attribute: For button, input and option elements, the value attribute specifies the initial value of the element.

  let noteCards = document.getElementsByClassName("noteCard"); // we access the divs which contain each card. We can specify noteCard as the className we are looking for as it is separated by whitespace. Be careful with bootstrap class names.
  Array.from(noteCards).forEach(function (element) {
    // construct an array and for each array card item, run this function:
    let cardText = element.getElementsByTagName("p")[0].innerText; //grab the p tag text using .innerText. the [0] means start from index position 0
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    if (
      cardText.toLowerCase().includes(inputVal) ||
      cardTitle.toLowerCase().includes(inputVal)
    ) {
      // if the text saved in any card stored in the cardtext variable returned as lowercase, includes a certain value among its entries, returning true or false as appropriate, then run the code below:
      element.style.visibility = "visible";
    } else {
      element.style.visibility = "hidden";
    }
  });
});


// POSSIBLE TWEAKS
/// 1.IMPROVE THE SEARCH FUNCTIONLITY == BY TITLE, BY NOTES
//// 2. MARK SOME NOTES AS IMPORTANT (FOR EXAMPLE, A BUTTON NEXT TO DELETE NOTE, LET'S SAY - 'IMP' THAT WILL MARK THE NOTE AS IMPORTANT LIKE PUT A RED COLOUR BORDER SO THAT IT'S EASILY ACCESSIBLE. )
/////