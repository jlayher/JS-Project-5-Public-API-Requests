

const randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us';
const galleryDiv = document.getElementById('gallery');


/*fetch API Data
**convert to json
**map data
**give data to function that writes to DOM (writeHTML)
**catch errors
*/
function getEmployees() {
  fetch(randomUserAPI)
    .then(result => result.json())
    .then(employeeData => writeHTML(employeeData.results))
    .catch(err => {
      console.log(new Error(err));
      galleryDiv.innerHTML = '<h2>An error occured when fetching user data.</h2>';
    });
}

//function to map json data, and display array as HTML
const writeHTML = (employeeData) => {
  const employees = employeeData.map((employee, index)=> {
    const html =
          `<div class="card" id='${employee.name.first}${employee.name.last}'>
              <div class="card-img-container">
                  <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
              </div>
              <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="card-text">${employee.email}</p>
                  <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
              </div>
          </div>`;
    //why does my call to the clickListener function have to be here?  Trying it after the return or join causes errors
    clickListener(employee, employeeData, index);
    return html;
    //use .join to eliminate commas.
  }).join('');
  galleryDiv.insertAdjacentHTML('beforeend',employees)
}

//create modal window
//!!!!Issues:  Need DOB formatted.  Why Does location.street require .number and .name?  This doesn't show up on the API page

function createModalWindow(employee, json, index) {
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal-container';
  const dob = formatBday(employee.dob.date);

  const modalHTML = `
    div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">Cell Phone: ${employee.cell}</p>
                <p class="modal-text">Address: ${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`
  modalDiv.insertAdjacentHTML('beforeend', modalHTML);
  document.querySelector('body').appendChild(modalDiv);

  //Add event listener for close button
  const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', e => {
      modalDiv.remove();
    })

  //Add event listener for next button
  const nextButton = document.getElementById('modal-next').addEventListener('click', e => {
    if(index < 11){
      modalDiv.remove();
      nextEmployee(json, index)
    }else if (index === 11){
      modalDiv.remove();
      nextEmployee(json, index)
      document.getElementById('modal-next').disabled = true;
      document.getElementById('modal-next').style.display = 'none';
    }
  })

  //Add event listener for previous button
  const prevButton = document.getElementById('modal-prev').addEventListener('click', e => {
    if(index >= 0){
        modalDiv.remove();
        prevEmployee(json, index)
    }else if (index === 0){
        modalDiv.remove();
        prevEmployee(json, index)
        document.getElementById('modal-prev').disabled = true;
        document.getElementById('modal-prev').style.display = 'none';
      }
  })
}

//Next button
const nextEmployee = (json, index) => {
  let employee = json[index += 1];
  createModalWindow(employee, json, index);
  if (index < 11){
    document.getElementById('modal-next').disabled = false;
  } else {
    //change css styles here to blur button
    document.getElementById('modal-next').style.display = 'none';
  }
}

//Previous button
const prevEmployee = (json, index) => {
  let employee = json[index -= 1];
  createModalWindow(employee, json, index);
  if (index > 0){
    document.getElementById('modal-prev').disabled = false;
  } else {
    //change css styles here to blur button
    document.getElementById('modal-prev').style.display = 'none';
  }
}

//click event listener to display modal createModalWindow
//!!!!Could I use something other than setTimeout here?  shouldn't need to be asynchronous
function clickListener(employee, json, index) {
  setTimeout(event => {
    const modalWindow = document.getElementById(`${employee.name.first}${employee.name.last}`);
    modalWindow.addEventListener('click', e => createModalWindow(employee, json, index));
  },1)
}

//Format the DOB
const formatBday = (dob) => {
  let bday = new Date (dob);
  let month = bday.getMonth();
  let day = bday.getDate();
  let year = bday.getFullYear();
  return month + '/' + day + '/' + year;
}

//Create and Append the Search Function
function createSearch() {
  const searchContainer = document.querySelector('.search-container');
  const form = `<form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;
  searchContainer.insertAdjacentHTML('beforeend', form);


  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    search(e.target[0].value);
    e.target[0].value = '';
  });

  document.querySelector('#search-input').addEventListener('change', e => {
    e.preventDefault();
    search(e.target.value);
    e.target.value = '';
  });
};
createSearch();

//search for users
function search(input) {
  let search = input.toLowerCase();
  let employees = galleryDiv.children;
  for (let i = 0; i< employees.length; i++) {
    let person = employees[i].querySelector('h3');
    let input = person.textContent;
    if (input.toLowerCase().indexOf(search) > -1) {
      employees[i].style.display = "";
    } else {
      employees[i].style.display = "none";
    }
  }
}










//Main Function Call
getEmployees();
