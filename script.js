/* 鈴音らん 配布页交互脚本 */
(function () {
  "use strict";

  /* 1. 标题打字机 */
  var title = document.querySelector(".typewriter");
  if (title) {
    var text = title.dataset.text || title.textContent || "";
    title.textContent = "";
    var i = 0;
    (function type() {
      if (i < text.length) {
        title.textContent += text.charAt(i++);
        setTimeout(type, 140);
      }
    })();
  }

  /* 2. 滚动入场 */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("show"); });
  }

  /* 3. 飘落的铃兰 */
  var rain = document.querySelector(".lily-rain");
  if (rain) {
    for (var n = 0; n < 16; n++) {
      var lily = document.createElement("div");
      lily.className = "lily";
      lily.style.left = Math.random() * 100 + "%";
      lily.style.animationDuration = 8 + Math.random() * 10 + "s";
      lily.style.animationDelay = -Math.random() * 16 + "s";
      lily.style.transform = "scale(" + (0.6 + Math.random() * 0.7) + ")";
      rain.appendChild(lily);
    }
  }

  /* 4. 光标光晕 */
  var glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", function (e) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  } else if (glow) {
    glow.style.display = "none";
  }

  /* 5. 试听播放器 */
  var audio = document.getElementById("audio");
  var playBtn = document.getElementById("playBtn");
  var bar = document.getElementById("bar");
  var time = document.getElementById("time");

  function fmt(sec) {
    if (!isFinite(sec)) return "0:00";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  if (audio && playBtn) {
    playBtn.addEventListener("click", function () {
      if (audio.paused) {
        var p = audio.play();
        if (p && p.catch) p.catch(function () { playBtn.textContent = "▶"; });
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", function () { playBtn.textContent = "⏸"; });
    audio.addEventListener("pause", function () { playBtn.textContent = "▶"; });
    audio.addEventListener("timeupdate", function () {
      if (audio.duration) {
        if (bar) bar.style.width = (audio.currentTime / audio.duration * 100) + "%";
        if (time) time.textContent = fmt(audio.currentTime);
      }
    });
    audio.addEventListener("loadedmetadata", function () {
      if (time) time.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener("ended", function () {
      playBtn.textContent = "▶";
      if (bar) bar.style.width = "0%";
    });
  }
})();
