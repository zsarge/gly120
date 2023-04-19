// Modified from https://codepen.io/ahansson/pen/KKNZqKY
class CountUp {
  constructor(triggerEl, counterEl) {
    const counter = document.querySelector(counterEl);
    const trigger = document.querySelector(triggerEl);
    let num = 0;
    const decimals = counter.dataset.decimals;

    const countUp = () => {
      if (num < counter.dataset.stop)
        if (decimals) {
          // Do we want decimals?
          num += 0.01;
          counter.textContent = new Intl.NumberFormat("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);
        } else {
          // No decimals
          num += parseInt(counter.dataset.amount) || 1;
          counter.textContent = new Intl.NumberFormat("en-GB").format(num);
        }
    };

    const observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          const interval = setInterval(() => {
            num < counter.dataset.stop ? countUp() : clearInterval(interval);
          }, counter.dataset.speed);
        }
      },
      { threshold: [0] }
    );

    observer.observe(trigger);
  }
}

// Initialize any number of counters:
for (const label of [
  "#death-count",
  "#injured-count",
  "#aid-count",
  "#displaced-count",
]) {
  new CountUp(label, label);
}
