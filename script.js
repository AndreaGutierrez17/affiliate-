const revealItems = document.querySelectorAll(".reveal");
const forms = document.querySelectorAll(".lead-form");
const tabButtons = document.querySelectorAll("[data-form-tab]");
const tabPanels = document.querySelectorAll("[data-form-panel]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));

const setActiveTab = (targetTab) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.formTab === targetTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.formPanel === targetTab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

const syncTabWithHash = () => {
  const hash = window.location.hash;

  if (hash === "#tab-contractors") {
    setActiveTab("contractors");
  }

  if (hash === "#tab-call") {
    setActiveTab("call");
  }

  if (hash === "#tab-wholesalers") {
    setActiveTab("wholesalers");
  }
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.formTab);
  });
});

window.addEventListener("hashchange", syncTabWithHash);
syncTabWithHash();

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const targetId = form.dataset.successTarget;
    const successMessage = document.getElementById(targetId);

    if (successMessage) {
      successMessage.classList.add("is-visible");
    }

    form.reset();
  });
});
