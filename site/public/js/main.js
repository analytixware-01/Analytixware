(function () {
    "use strict";

    var ready = function (callback) {
        if (document.readyState !== "loading") {
            callback();
            return;
        }

        document.addEventListener("DOMContentLoaded", callback);
    };

    ready(function () {
        document.body.classList.add("is-ready");

        var spinner = document.getElementById("spinner");
        if (spinner) {
            window.setTimeout(function () {
                spinner.classList.remove("show");
            }, 80);
        }

        var sticky = document.querySelector(".sticky-top");
        var setStickyState = function () {
            if (!sticky) {
                return;
            }

            sticky.classList.toggle("is-scrolled", window.scrollY > 12);
        };

        setStickyState();
        window.addEventListener("scroll", setStickyState, { passive: true });

        var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
        var currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

        navLinks.forEach(function (link) {
            var href = (link.getAttribute("href") || "").split("#")[0].toLowerCase();
            link.classList.toggle("active", href === currentPage);
            if (href === currentPage) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        var toggler = document.querySelector(".navbar-toggler");
        var collapse = document.getElementById("navbarCollapse");

        if (!window.bootstrap && toggler && collapse) {
            toggler.addEventListener("click", function () {
                var expanded = toggler.getAttribute("aria-expanded") === "true";
                toggler.setAttribute("aria-expanded", String(!expanded));
                collapse.classList.toggle("show", !expanded);
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (!collapse || !toggler) {
                    return;
                }

                collapse.classList.remove("show");
                toggler.setAttribute("aria-expanded", "false");
            });
        });

        // Blog posts: links to other websites open in a new tab.
        document.querySelectorAll(".full-content a[href^='http']").forEach(function (link) {
            link.target = "_blank";
            link.rel = "noopener";
        });

        document.querySelectorAll(".toggle-content").forEach(function (button) {
            var card = button.closest(".card-body");
            if (!card) {
                return;
            }

            var shortContent = card.querySelector(".short-content");
            var fullContent = card.querySelector(".full-content");
            if (!shortContent || !fullContent) {
                return;
            }

            fullContent.hidden = fullContent.style.display === "none" || fullContent.hidden;
            fullContent.style.display = "";
            button.setAttribute("aria-expanded", "false");

            button.addEventListener("click", function (event) {
                event.preventDefault();
                var isHidden = fullContent.hidden;
                fullContent.hidden = !isHidden;
                shortContent.hidden = isHidden;
                button.textContent = isHidden ? "Read Less" : "Read More";
                button.setAttribute("aria-expanded", String(isHidden));
            });
        });

        var backToTop = document.querySelector(".back-to-top");
        var setBackToTopState = function () {
            if (!backToTop) {
                return;
            }

            backToTop.classList.toggle("is-visible", window.scrollY > 360);
        };

        if (backToTop) {
            backToTop.addEventListener("click", function (event) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        setBackToTopState();
        window.addEventListener("scroll", setBackToTopState, { passive: true });

        var counters = document.querySelectorAll("[data-toggle='counter-up']");
        var animateCounter = function (counter) {
            var target = Number(counter.textContent.replace(/[^0-9.]/g, ""));
            if (!Number.isFinite(target) || target <= 0 || counter.dataset.counted) {
                return;
            }

            counter.dataset.counted = "true";
            var startTime = performance.now();
            var duration = 1100;

            var tick = function (now) {
                var progress = Math.min((now - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = String(Math.round(target * eased));

                if (progress < 1) {
                    window.requestAnimationFrame(tick);
                } else {
                    counter.textContent = String(target);
                }
            };

            window.requestAnimationFrame(tick);
        };

        var revealTargets = document.querySelectorAll(".wow, .card, .service-item, .case-item, .container > .row.align-items-center.justify-content-center.my-4");

        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    if (entry.target.matches("[data-toggle='counter-up']")) {
                        animateCounter(entry.target);
                    }

                    entry.target.querySelectorAll("[data-toggle='counter-up']").forEach(animateCounter);
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

            revealTargets.forEach(function (target) {
                observer.observe(target);
            });

            counters.forEach(function (counter) {
                observer.observe(counter);
            });
        } else {
            revealTargets.forEach(function (target) {
                target.classList.add("is-visible");
            });
            counters.forEach(animateCounter);
        }
    });
})();
