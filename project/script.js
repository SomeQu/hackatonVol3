//JSON server
const API = 'http://localhost:8000/students';

const numericList = document.querySelector('.numeric-list');
const addBtn = document.querySelector('.btn');
const modalPanel= document.querySelector('.modal-panel');
const modalPanelSecond = document.querySelector('.modal-panel-2')
const addStud = document.querySelector('.add-stud');
const saveStud = document.querySelector('.save-stud');


const firstNameModal = document.querySelector('#first-name');
const lastNameModal = document.querySelector('#last-name');
const phoneNumModal = document.querySelector('#phone-num');
const weeklyKpiModal = document.querySelector('#weekly-kpi');
const monthlyKpiModal = document.querySelector('#monthly-kpi');


const firstNameSave = document.querySelector('#edit-name');
const lastNameSave = document.querySelector('#edit-surname');
const phoneNumSave = document.querySelector('#edit-phone');
const weeklyKpiSave = document.querySelector('#edit-weekly');
const monthlyKpiSave = document.querySelector('#edit-monthly');


const searchBar = document.querySelector('.search');
let searchValue ='';


const totalStudents = document.querySelector('.total-s');
const highestKpi = document.querySelector('.highest-s')
getStudents();


async function getStudents(){
    const 
         results = await fetch(`${API}?name_like=${searchValue}`),
         data = await results.json();
          render(data);
        totalStudents.innerHTML = data.length;
        highestKpi.innerHTML= Math.max(...data.map((kpi)=>kpi.monthlyKPI));
        
}

async function getOneStudent(id){
    const 
         results = await fetch(`${API}/${id}`),
         data = await results.json();
          return data;
}


function render(arr){
        // CLEAR TO AVOID DUPLICATE
        numericList.innerHTML = '';
        arr.forEach((item)=>{
            numericList.innerHTML += `<li class="numeric-list__item">
            <ul class="just-list">
                <li class="just-list__item">
                    ${item.name}
                </li>
                <li class="just-list__item">
                    ${item.surname}
                </li>
                <li class="just-list__item">
                    ${item.phone}
                </li>
                <li class="just-list__item">
                    ${item.weeklyKPI}
                </li>
                <li class="just-list__item">
                    ${item.monthlyKPI}
                </li>
                <li class="just-list__item">
                    <button class="pencil-btn"><img src="/images/pencil.svg" id="${item.id}" class="pencil-btn"  alt=""></button>
                </li>
                <li class="just-list__item">
                    <button  class="bin-btn"><img src="/images/bin.svg" id="${item.id}" class="bin-btn" alt="" ></button>
                </li>
            </ul>
        </li>`;
        });
    }

    async function addStudents(student){
        await fetch(API, {
            method:'Post',
            body: JSON.stringify(student),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        getStudents();
    }

    async function deleteStudent(id){
        await fetch(`${API}/${id}`, {
            method: 'DELETE',
    
        });
        getStudents();
    }

    async function editStudent(id, editedStudent){
        await fetch(`${API}/${id}`,{
            method:'PATCH',
            body: JSON.stringify(editedStudent),
            headers:{
                'Content-Type':'application/json',
            }
        });
        getStudents();
    }


    addStud.addEventListener('click',(event)=>{
        event.preventDefault();
        if(!firstNameModal.value.trim() 
        || !lastNameModal.value.trim() 
        || !phoneNumModal.value.trim()
        || !weeklyKpiModal.value.trim()
        || !monthlyKpiModal.value.trim() ){
            alert('fill all fields to continue');
            return;
        }
        const studentData  = {
            name: firstNameModal.value,
            surname: lastNameModal.value,
            phone: phoneNumModal.value,
            weeklyKPI: weeklyKpiModal.value,
            monthlyKPI: monthlyKpiModal.value,
        };
        addStudents(studentData);
        firstNameModal.value = '';
        lastNameModal.value = '';
        phoneNumModal.value = '';
        weeklyKpiModal.value = '';
        monthlyKpiModal.value = '';


    });

    addBtn.addEventListener('click', (e)=>{
        modalPanel.style.visibility = 'visible';
    });
    let id = null;
    document.addEventListener('click',async (event)=>{
        event.preventDefault();
        if(event.target.classList.contains('pencil-btn')){
            modalPanelSecond.style.visibility = 'visible';
            id= event.target.id;
            const stud = await getOneStudent(id);
            firstNameSave.value = stud.name;
            lastNameSave.value = stud.surname;
            phoneNumSave.value = stud.phone;
            weeklyKpiSave.value = stud.weeklyKPI;
            monthlyKpiSave.value = stud.monthlyKPI;
        }
        
    });
       
//deleting student form server
    document.addEventListener('click',(event)=>{
        if(event.target.classList.contains('bin-btn')){
            deleteStudent(event.target.id);
        }
        event.preventDefault();
    
    });

    saveStud.addEventListener('click',()=>{
        if(!firstNameSave.value.trim() 
        || !lastNameSave.value.trim() 
        || !phoneNumSave.value.trim()
        || !weeklyKpiSave.value.trim()
        || !monthlyKpiSave.value.trim() ){
            alert('fill all fields to continue');
            return;
        }

        const editedStudent = {
            name: firstNameSave.value,
            surname: lastNameSave.value,
            phone: phoneNumSave.value,
            weeklyKPI: weeklyKpiSave.value,
            monthlyKPI: monthlyKpiSave.value
        };
        editStudent(id, editedStudent);
    });

    searchBar.addEventListener('input', ()=>{
        searchValue = searchBar.value;
        console.log(searchValue)
        getStudents();
    })


    // addStud.addEventListener('click', (e)=>{
    //     modalPanel.style.visibility = 'hidden';
    // })

