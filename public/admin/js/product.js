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

// Upload image
const upLoadImage = document.querySelector("[upload-image]");
if (upLoadImage) {
  const upLoadImageInput = document.querySelector("[upload-image-input]");
  const upLoadImagePreview = document.querySelector("[upload-image-preview]");
  const upLoadImageRemove = document.querySelector("[upload-image-remove]");

  upLoadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      upLoadImagePreview.src = URL.createObjectURL(file);
    }
  });

  upLoadImageRemove.addEventListener("click", (e) => {
    upLoadImagePreview.src = "";
    upLoadImageInput.value = "";
  });
}

//End Upload image