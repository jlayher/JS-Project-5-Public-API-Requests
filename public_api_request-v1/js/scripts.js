



const randomUserAPI = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob';
const galleryDiv = document.getElementById('gallery');


/*fetch API Data
**convert to json
**map data
**write to DOM
**catch errors
*/
function getEmployees() {
  fetch(randomUserAPI)
    .then(result => result.json())
    .then(jsonData => writeHTML(jsonData.results))
    .catch(err => {
      console.log(new Error(err));
      galleryDiv.innerHTML = '<h2>An error occured when fetching user data.</h2>';
    });
}


//function to map json data, and display as HTML
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
          clickListener(employee, employeeData, index);
    return html;
    //use .join to eliminate commas.
  }).join('');
  galleryDiv.insertAdjacentHTML('beforeend',employees)
}

getEmployees();


//create modal window


function createModalWindow(employee, json, index) {
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal-container';
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
                <p class="modal-text">Address: ${employee.location.street}, ${employee.location.city}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`
  modalDiv.insertAdjacentHTML('beforeend', modalHTML);
  document.querySelector('body').appendChild(modalDiv);

}


//click event listener to display modal createModalWindow
function clickListener(employee, json, index) {
  setTimeout(event => {
    const modal = document.getElementById(`${employee.name.first}${employee.name.last}`);
    modal.addEventListener('click', e => createModalWindow(employee, json, index));
  },100)
}
