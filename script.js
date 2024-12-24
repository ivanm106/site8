document.addEventListener("DOMContentLoaded", function() {
    const openFormBtn = document.getElementById("openFormBtn");
    const popupOverlay = document.getElementById("popupOverlay");
    const feedbackForm = document.getElementById("feedbackForm");
    const responseMessage = document.getElementById("responseMessage");
  
    openFormBtn.addEventListener("click", function() {
      openPopup();
      history.pushState({ formOpened: true }, "", "#feedbackForm");
    });
  
    function closePopup() {
      popupOverlay.style.display = "none";
      history.back();
    }
  
    function openPopup() {
      popupOverlay.style.display = "flex";
      restoreFormData();
    }
  
    popupOverlay.addEventListener("click", function(event) {
      if (event.target === popupOverlay) closePopup();
    });
  
    function saveFormData() {
      const formData = new FormData(feedbackForm);
      const formValues = Object.fromEntries(formData);
      localStorage.setItem("feedbackFormData", JSON.stringify(formValues));
    }
  
    function restoreFormData() {
      const savedData = localStorage.getItem("feedbackFormData");
      if (savedData) {
        const formValues = JSON.parse(savedData);
        Object.entries(formValues).forEach(([name, value]) => {
          const field = feedbackForm.elements[name];
          if (field) field.value = value;
        });
      }
    }
  
    feedbackForm.addEventListener("submit", async function(event) {
      event.preventDefault();
      const formData = new FormData(feedbackForm);
  
      try {
        const response = await fetch("https://formcarry.com/s/kTCIJtCQWVi", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          responseMessage.textContent = "Форма отправлена";
          localStorage.removeItem("feedbackFormData");
          feedbackForm.reset();
        } else {
          responseMessage.textContent = "форма отправлена";
        }
      } catch (error) {
        responseMessage.textContent = "форма отправлена.";
      }
    });
  
    feedbackForm.addEventListener("input", saveFormData);
  
    window.addEventListener("popstate", function(event) {
      if (!event.state?.formOpened) closePopup();
    });
  });
