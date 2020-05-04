"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
     traits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      getAge(people);
    displayPerson(person);    
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}



function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  
  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}



function searchByTrait(people){
  let trait = promptFor("What is a trait you would like to search for? You may choose 2-5 of the following traits \n Eye Color \n Gender \n Age \n Weight \n Height in inches")
  let eyecolor;
  let gender;
  let height;
  let age;
  let weight;
  switch(trait){
    case 'Eye Color':
    searchByEyeColor(people);
    break;

    case 'Gender':
    gender = promptFor('Would you like to search by male or female?')
    break;

    case 'Height':
    height = promptFor("What is the height (In inches) you would like to search by?")
    break;

    case 'Weight':
    weight = promptFor("What is the weight you would like to search by?")
    break;

    case 'Age':
      age = promptFor("What is the age you would like to search by?")
      break;

      default:
        alert("You must choose from one of those traits.")
        traits(people)
        break;
    }
    let ans = promptFor("Would you like to include another trait into your search?")
    if(ans == 'yes'){
      traits(people);
    }
    else{
      
    }

}
function searchByEyeColor(people){
  let eyecolor = promptFor("What eye color would you like to search by?\n brown \n black \n hazel \n blue \n green");
  
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyecolor){
      return true;
    }
    else{
      return false;
    }
  })
}
function getAge(people){
  let foundPerson = people.filter(function(person){
  let split = person.dob.split("/");
  let birthyear = parseInt(split[2]);
let age = 2020-birthyear;
person.age = age;
  })
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " +person.gender + "\n";
  personInfo += "Height: " +person.height + "\n";
  personInfo += "Weight: " +person.weight + "\n";
  personInfo += "Eye Color: " +person.eyeColor + "\n";
  personInfo += "Occupation: " +person.occupation + "\n";
  personInfo += "Age: " +person.age;
  alert(personInfo);
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
