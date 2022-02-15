showNote();
console.log("begin app");

//we would add an event listener to 'Add Note' Button
// When a user adds a note, add it to the local storage

let addButton = document.getElementById("addBtn"); // capture the id with a variable
addButton.addEventListener("click", function () {
  //set the variable to an event listener
  let addtext = document.getElementById("addTxt"); //set a variable and assign it to the id of the text area.
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes"); // set a variable, accesses the local storage and gets the element associated with the specified key, presumably this saves the notes in the local storage
  let title = localStorage.getItem("notes-title");

  if (notes == null) {
    notesObj = []; //blank array initally, but we want to add and display new notes
    //JSON.parse(notes); // convert JS into the DOM- convert JSON string into an object.
  } else {
    notesObj = JSON.parse(notes);
  }

  myObj = {
    title: addTitle.value,
    text: addtext.value,
  };
  notesObj.push(myObj);
  // we will be inserting the notes to the local storage. .value means take the value and pass int as an argument into the push function to add to notesObj.

  localStorage.setItem("notes", JSON.stringify(notesObj)); // convert object to string with stringify

  addtext.value = "";
  addTitle.value = "";
  // this is adding the notes/ comments as a value (key:value pair) which is initially set to empty but will be populated when the user enters their comments and presses the add note button. .parse and .stringify are opposite of each other. After clicking the add note button, it resets the value of the field to an empty string, as we don't want the old comment to still be visible after clicking add note button.
  //We have converted into a string as we need to set as string in the local storage
  console.log(notesObj);

  showNote(); // we call the function before writing the funciton as we want the notes to display as soon as the add notes button is clicked.
  //toCheckLocalStorage();
  // document.getElementById("example").style.visibility = "hidden";
});

// this function is to display the note on the html doc
function showNote() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = ""; // blank empty string
  // in the function below, the element is the content that the user types in i.e. their notes, and index represents a number starting from 0. So, when they click add note it would be 0 + 1 i.e. Note 1. When they click the add note button again, it will display Note 2.
  notesObj.forEach(function (element, index) {
    html += `
            <div class="card row my-2 mx-0 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 id="example" class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id=" ${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>
            `;
  });

  let notesElm = document.getElementById("notes"); //this is another variable to store the notes in
  if (notesElm.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "Nothing to show at this point";
  }
}

// FUNCTION TO DELETE NOTE
function deleteNote(index) {
  console.log("deleting" + index);
  let confirmDel = confirm("Delete note?"); //getElementsByClassName("btn btn-primary").confirm("Delete note?");
  let notes = localStorage.getItem("notes");
  if (confirmDel == true) {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1); // this means start from the first number defined by the parameter index position. 1 = delete one item.
    localStorage.setItem("notes", JSON.stringify(notesObj)); // notes refers to the updated array object with an element deleted.
    showNote();
    //toCheckLocalStorage();
  }
}

// IF STATEMENT TO GET THE DISPLAYED NOTES TO SHOW/HIDE

//function toCheckLocalStorage() {
// if ((localStorage.length = 0)) {
//   document.getElementById("toggle_heading").style.display = "none";
// } else {
//   document.getElementById("toggle_heading").style.display = "block";
// }
//}

// SEARCH BAR SUGGESTIONS
// must use event listener even for search bar- keydown
// function searchFunction() {
//   let input = document.getElementById("search"); // grab the search bar text area
//   let filter = input.value.toUpperCase(); // store the user's text in filter variable
//   let notes = localStorage.getItem("notes");
//   notesObj = JSON.parse(notes);
//   //console.log(notesObj);
//   let notes_array_item = notesObj[i].toUpperCase();
//   let outer_body_container = document.getElementsByClassName("container my-2");
//   let parent_container =
//     outer_body_container.getElementsByClassName("container-fluid");
//   let separate_note_container = parent_container.getElementsByTagName("div");

//   for (i = 0; i < notesObj.length; i++) {
//     //console.log(notesObj[i].toUpperCase());
//     let p = separate_note_container[i].getElementsByTagName("p")[0];
//     let txtValue = p.textContent || p.innerText;
//     if (/*notes_array_item*/ txtValue.toUpperCase().indexOf(filter) > -1) {
//       separate_note_container[i].style.display = "";
//       //document.getElementById("notes").style.display = "";
//     } else {
//       separate_note_container[i].style.display = "none";
//       //document.getElementById("notes").style.display = "none";
//     }
let search = document.getElementById("searchTxt"); // grab the search bar input field
// event listener to fire when text is entered in the search bar. // we cannot use keyup event, this only applies to checking the last key that was pressed, not the entire text string suggestion in the search bar.
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase(); // In HTML DOM, the value property sets or returns the value of the attribute: For button, input and option elements, the value attribute specifies the initial value of the element.

  let noteCards = document.getElementsByClassName("noteCard"); // we access the divs which contain each card (<div class="card row my-2 mx-2 noteCard" style="width: 18rem;">). We can specify noteCard as the other wording are bootstrap classes.
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

/*
  let input = document.getElementById("search"); // this accesses the input field search bar
  let filter = input.value.toUpperCase(); // a variable that stores what the user entered into the search bar and returns as uppercase
  let ul = document.getElementById("myUL"); // variable that access the unordered list (containing the finite list of options)
  let li = ul.getElementsByTagName("li"); // a variable that accesses all elements in the unordered list by element li
  for (i = 0; i < li.length; i++) {
    // loop through all items in the list.
    let anchor = li[i].getElementsByTagName("a")[0]; //set a variable equal to 'anchor 'a' tag and search the first (index position 0) element.
    let txtValue = anchor.textContent || anchor.innerText; //textContent returns the text content of all elements, while innerText returns the content of all elements, except for <script> and <style> elements. innerText will not return the text of elements that are hidden with CSS (textContent will).
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Understand what the .indexOf() does- provides the text string as a single argument, this will return the index position of that provided string. If a number is provided as the second argument, then it will locate FROM THAT number position, where the string is- so the output could be positive or negative.
      // So, if the text from txtValue above called on the uppercase method, matches the first looped element, then execute the code below. indexOf is taking the entered string (or letters saved in the variable called filter), checks against the first element. "> - 1" means we want to match what was entered in the search bar to the iterated element from the start of the iterated element which is position 0 = first character. If you put > 0, it would find matches after position 0 i.e. any characters after position 0.

      li[i].style.display = ""; // display the element if it matches the entered string
    } else {
      li[i].style.display = "none"; // hide if it does not match the string.
    }
  }
}
*/

//target the html form tag and input id with a variable
// let searchBar = document.getElementById("search");
// let searchButton = document.getElementById("searchButton");
// ////call our function using search event listener. When the user begins typing and presses the search button, the function will run to search for suggestions in the available notes elements.
// searchButton.addEventListener("click", function () {
//   //alert("button was clicked");
//   let x = document.getElementById("search");
//   document.getElementById(
//     "test"
//   ).innerHTML = `You typed${x.value} into the search bar`;
//});

// access localstorage, convert

//console.log(x);
///// access the stored search terms- localStorage. Convert to obj array with JSON.parse().

////// create function to check if the input is blank- then return [] array, else

// let search_terms = ['apple', 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12'];

// function autoCompleteMatch(input) {
// if (input === '') {
//   return [];
// }
// let reg = new RegExp(input)
// return search_terms.filter(function(term) {
//   if (term.match(reg)) {
//     return term;
//   }
// });
// };

// function showResults(val) {
//   res = document.getElementById("result");
//   res.innerHTML = '';
//   let list = '';
//   let terms = autocompleteMatch(val);
//   for (i=0; i<terms.length; i++) {
//     list += '<li>' + terms[i] + '</li>';
//   }
//   res.innerHTML = '<ul>' + list + '</ul>';}
//

// ADD A 'TITLE' TO THE NOTES INSTEAD OF 'NOTE 1', 'NOTE 2', NOTE 3' AND SO ON....

// IMPROVE THE SEARCH FUNCTIONLITY == BY TITLE, BY NOTES

// MARK SOME NOTES AS IMPORTANT (FOR EXAMPLE, A BUTTON NEXT TO DELETE NOTE, LET'S SAY - 'IMP' THAT WILL MARK THE NOTE AS IMPORTANT LIKE PUT A RED COLOUR BORDER SO THAT IT'S EASILY ACCESSIBLE. )
