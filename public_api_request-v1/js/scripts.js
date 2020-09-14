



const randomUserAPI = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob';
const galleryDiv = document.getElementById('gallery');
const employeesArray = [];


//fetch API Data
function getEmployees() {
  fetch(randomUserAPI)
    .then(result => result.json())

    //have your appendUser/writeToDOM function here *before jsonData.results
    .then(jsonData => jsonData.results)
    .then(mapEmployees)
    //use catch to generate Error object with the response text displayed to the console
    .catch(err => {
      console.log(new Error(err));
      galleryDiv.innerHTML = '<h2>An error occured when fetching user data.</h2>';
    });
}

//function to map the parsed json
const mapEmployees = (employeesJSON) => {
  employeesJSON.map(employee => {
    employeesArray.push(employee);
  })
  //test code
  console.log(employeesArray);

  //call function to write employees to page with employeesArray as param
}








//function to write to page
// const generateEmployeeDivs = (employeesArray) => {
//   galleryDiv.innerHTML= '';
//
//   employeesArray.forEach(employee => {
//     let employeeDiv= document.createElement('div');
//     employeeDiv.classList.add('card');
//
//
//     galleryDiv.insertAdjacentHTML('beforeend', `
//       //html goes here
//
//
//       `
//     )
//   );
// }
