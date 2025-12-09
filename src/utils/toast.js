import Swal from "sweetalert2";

const toastConfig = {
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
};

export const showSuccess = (message, title = "Success!") => {
  return Swal.fire({
    ...toastConfig,
    icon: "success",
    title: title,
    text: message,
    iconColor: "#10b981",
    background: "#f0fdf4",
    color: "#065f46",
    toast: true,
  });
};

// Error toast
export const showError = (message, title = "Error!") => {
  return Swal.fire({
    ...toastConfig,
    icon: "error",
    title: title,
    text: message,
    iconColor: "#ef4444",
    background: "#fef2f2",
    color: "#991b1b",
    toast: true,
  });
};

export const showWarning = (message, title = "Warning!") => {
  return Swal.fire({
    ...toastConfig,
    icon: "warning",
    title: title,
    text: message,
    iconColor: "#f59e0b",
    background: "#fffbeb",
    color: "#92400e",
    toast: true,
  });
};

export const showInfo = (message, title = "Info") => {
  return Swal.fire({
    ...toastConfig,
    icon: "info",
    title: title,
    text: message,
    iconColor: "#3b82f6",
    background: "#eff6ff",
    color: "#1e40af",
    toast: true,
  });
};

export const showSuccessModal = (message, title = "Success!") => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#10b981",
    background: "#ffffff",
    color: "#1f2937",
    iconColor: "#10b981",
    customClass: {
      popup: "rounded-2xl shadow-2xl",
      confirmButton: "px-6 py-3 rounded-lg font-semibold",
    },
  });
};

export const showErrorModal = (message, title = "Error!") => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#ef4444",
    background: "#ffffff",
    color: "#1f2937",
    iconColor: "#ef4444",
    customClass: {
      popup: "rounded-2xl shadow-2xl",
      confirmButton: "px-6 py-3 rounded-lg font-semibold",
    },
  });
};

export const showConfirm = (message, title = "Are you sure?") => {
  return Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#10b981",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    color: "#1f2937",
    customClass: {
      popup: "rounded-2xl shadow-2xl",
      confirmButton: "px-6 py-3 rounded-lg font-semibold",
      cancelButton: "px-6 py-3 rounded-lg font-semibold",
    },
  });
};

export default {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showSuccessModal,
  showErrorModal,
  showConfirm,
};
