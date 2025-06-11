//Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change_status]")
if(buttonChangeStatus.length > 0) {

    const formChangeStatus = document.getElementById("form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    // console.log(path);
    

    buttonChangeStatus.forEach(button => {

        button.addEventListener("click",(e) =>{

            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            
            
            formChangeStatus.setAttribute("action", action)
            formChangeStatus.submit()
                    
        }) 
    })
    
}
//End Change Status

//Delete Product
const buttonDeleteProduct = document.querySelectorAll("[button-delete]")
if(buttonDeleteProduct.length > 0) {
    const formDeleteProduct = document.querySelector("#form-delete-item")
    const path = formDeleteProduct.getAttribute("data-path")

    buttonDeleteProduct.forEach(button => {
        button.addEventListener("click", () => {
            const IsConfirm = confirm("Bạn có muốn xóa không?")

            if(IsConfirm) {
                const id = button.getAttribute("data-id")

                const action = path + `/${id}?_method=DELETE`
                
                
                formDeleteProduct.setAttribute("action", action)
                formDeleteProduct.submit()
            
            }
        })
    })
}

// End Delete Product