function login() {
    const email_empty = document.getElementById("input-email").value === "";
    const password_empty = document.getElementById("input-password").value === "";
    
    if (!email_empty && !password_empty) {
        // window.location.href = "todo.html";
    } else {
        if (email_empty) showError("input-email", "email-empty-error", "mb-16px");
        if (password_empty) showError("input-password", "password-empty-error", "mb-24px");
    }
}

function register() {
    const email_empty = document.getElementById("input-email").value === "";
    const nickname_empty = document.getElementById("input-nickname").value === "";
    const password_empty = document.getElementById("input-password").value === "";
    const confirm_password_empty = document.getElementById("input-confirm-password").value === "";
    if (!email_empty && !password_empty) {
        // window.location.href = "todo.html";
    } else {
        if (email_empty) showError("input-email", "email-empty-error", "mb-16px");
        if (nickname_empty) showError("input-nickname", "nickname-empty-error", "mb-16px");
        if (password_empty) showError("input-password", "password-empty-error", "mb-16px");
        if (confirm_password_empty) showError("input-confirm-password", "confirm-password-empty-error", "mb-24px");
    }
}

function showError(input_element_id, error_element_id, mb_class) {
    document.getElementById(input_element_id).classList.remove(mb_class);
    document.getElementById(error_element_id).style.display = "block";
}
  