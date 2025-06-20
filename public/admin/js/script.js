// Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      // console.log(url.href);
      window.location.href = url.href;
    });
  });
}
// End Button status
// Form Search
const formSearch = document.getElementById("form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    const keyword = e.target.elements.keyword.value;
    e.preventDefault();

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// End Form Search
// Pagination
let url = new URL(window.location.href);
const buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination) {
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Pagination

//Checkbox Multi
const checkBoxMulti = document.querySelectorAll("[checkbox-multi]");
if (checkBoxMulti) {
  const checkAll = document.querySelector("input[name='checkAll']");
  const inputsId = document.querySelectorAll("input[name='id']");

  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = document.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsId.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}

//End Checkbox Multi

//Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm(
        "Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn không?"
      );
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];

      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(",");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 sản phẩm");
    }
  });
}
//End Form Change Multi

// Show alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const alertClose1 = document.querySelector("[show-alert-close1]");
  const alertClose2 = document.querySelector("[show-alert-close2]");

  // Auto close after time
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
}
// End Show alert


