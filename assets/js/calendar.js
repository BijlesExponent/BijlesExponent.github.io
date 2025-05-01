function toggleCalendar() {
    const wrapper = document.getElementById("calendar-wrapper");
    const toggle = document.querySelector(".calendar-toggle");

    if (!wrapper || !toggle) return;

    if (wrapper.classList.contains("open")) {
      wrapper.style.maxHeight = "0";
      wrapper.classList.remove("open");
      toggle.classList.remove("open");
    } else {
      wrapper.style.maxHeight = wrapper.scrollHeight + "px";
      wrapper.classList.add("open");
      toggle.classList.add("open");
    }
}

document.querySelector(".calendar-toggle")?.addEventListener("click", toggleCalendar);