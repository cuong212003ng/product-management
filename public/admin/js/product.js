//Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change_status]")
if(buttonChangeStatus.length > 0) {

    const formChangeStatus = document.getElementById("form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path);
    

    buttonChangeStatus.forEach(button => {

        button.addEventListener("click",(e) =>{

            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            console.log(action);
            
            formChangeStatus.setAttribute("action", action)
            formChangeStatus.submit()
                    
        }) 
    })
    
}
//End Change Status