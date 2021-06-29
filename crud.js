//globals
const FormUI = document.querySelector("#Employee-form")
const employeUI = document.getElementById("Employee-list")
let arrayemployees = [];

//functions
function Employee(IDI, name, salary) {
    this.id = IDI;
    this.name = name;
    this.salary = salary;
    this.active = false;
}

const SaveDB = (incomingEmployee) => {
    arrayemployees.push(incomingEmployee);

    localStorage.setItem("employees", JSON.stringify(arrayemployees))
    PrintDB();
}

const SaveDBnodata = () => {
    localStorage.setItem("employees", JSON.stringify(arrayemployees))
    PrintDB();
}



const PrintDB = () => {
    employeUI.innerHTML = "";

    arrayemployees = JSON.parse(localStorage.getItem("employees"));
    console.log(arrayemployees);
    if (arrayemployees === null) { arrayemployees = []; }
    else {
        arrayemployees.forEach(element => {
            console.log(element.id)
            if (element.active == false) {            employeUI.innerHTML += `<div class="alert alert-danger " role="alert">
            <span class="material-icons float-left mr-2">
                face
            </span>
            <b>${element.id} </b>
            <b>${element.name} US$ ${element.salary}</b> <small> Currently in activity </small> <b>${element.active}</b>
            <span class="material-icons float-right">

                <i style="cursor: pointer" class="material-icons button1">
                    done
                </i>
                <i style="cursor: pointer" class="material-icons button2">
                    delete
                </i>

            </span>
        </div>`}
            else {
            employeUI.innerHTML += `<div class="alert alert-primary " role="alert">
            <span class="material-icons float-left mr-2">
                face
            </span>
            <b>${element.id} </b>
            <b>${element.name} US$ ${element.salary}</b> <small> Currently in activity </small> <b>${element.active}</b>
            <span class="material-icons float-right">

                <i style="cursor: pointer" class="material-icons button1">
                    done
                </i>
                <i style="cursor: pointer" class="material-icons button2">
                    delete
                </i>

            </span>
        </div>`}
        }
        )
        $('.button1').on("click", function () {
            var active = $(this).parent().parent().find("b")[2];

            var id = $(this).parent().parent().find("b").first();
            id = $(id).text();
            let boolean = ""
            if
                ( $(active).text() === "false") 
             {
                $(active).html("true");
                boolean = true;
            }
            else if               
             ( $(active).text() === "true") 
            {
               $(active).html("false");
               boolean = false;

           }
           BooleanEmployee(id, boolean)
        })
        $('.button2').on("click", function () {
            let id = $(this).parent().parent().find("b").first();
            id = $(id).text();
            DeleteEmployee(id)

        })

    }
}
const BooleanEmployee = (id, boolean) => {
    let indexArray;
    arrayemployees.forEach((element, index) => {

       if (element.id == id){
        indexArray = index;

    }
   })
console.log(arrayemployees[indexArray])
   arrayemployees[indexArray].active = boolean;
   SaveDBnodata()
 }
 const DeleteEmployee = (id) => {
    let indexArray;
    arrayemployees.forEach((element, index) => {

       if (element.id == id){
        indexArray = index;

    }
   })

   arrayemployees.splice(indexArray,1);
   SaveDBnodata()
 }

//promises:
// function obtainbuttons(PrintDB) {
//     return data(PrintDB)
//     .catch(e => {

//     }
// }

//event listener

FormUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let IDI = parseInt(arrayemployees.length + 1);
    let NameUI = document.querySelector('#name').value;
    let SalaryUI = document.querySelector('#salary').value;
    let MyEmployee = new Employee(IDI, NameUI, SalaryUI);
    var reg = new RegExp('^[0-9]+$');
    var salary_is_valid = SalaryUI.match(reg);
    var regname =new RegExp(/^[a-z]+$/i);
    var name_is_valid = NameUI.match(regname);
    if (salary_is_valid && name_is_valid)
    {
    SaveDB(MyEmployee);
    FormUI.reset();
    return
    }
    FormUI.reset();
    alert("Wrong Data!")
})

document.addEventListener('DOMContentLoaded', PrintDB)


