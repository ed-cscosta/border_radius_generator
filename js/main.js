(() => {
  // Variables
  var directions = ["top", "bottom", "left", "right"];
  var positions = { top: 30, bottom: 80, left: 60, right: 80 };
  var isActive = false;
  var selectedId = null;

  // Cache DOM
  var box = document.getElementById("box");
  var pattern = document.getElementById("pattern");
  var patternText = document.getElementById("patternText");
  var inputBoxWidth = document.getElementById("inputBoxWidth");
  var inputBoxHeight = document.getElementById("inputBoxHeight");
  var copyBtn = document.getElementById("copyBtn");

  // Bind Events
  document.addEventListener("touchstart", dragStart, false);
  document.addEventListener("touchend", dragEnd, false);
  document.addEventListener("touchmove", drag, false);

  document.addEventListener("mousedown", dragStart, false);
  document.addEventListener("mouseup", dragEnd, false);
  document.addEventListener("mousemove", drag, false);
  inputBoxWidth.addEventListener("change", changeBoxSize, false);
  inputBoxHeight.addEventListener("change", changeBoxSize, false);
  copyBtn.addEventListener("click", copyPattern, false);

  _render();

  function _render() {
    document.getElementById("top").style.left = positions.top + "%";
    document.getElementById("bottom").style.left = positions.bottom + "%";
    document.getElementById("left").style.top = positions.left + "%";
    document.getElementById("right").style.top = positions.right + "%";
    pattern.style.borderRadius = _calcPattern();
    patternText.innerHTML = _calcPattern();
  }

  function dragStart(event) {
    if (directions.includes(event.target.id)) {
      selectedId = event.target.id;
      document.getElementById(selectedId).classList.add("active");
      isActive = true;
    }
  }

  function drag(event) {
    if (isActive) {
      event.preventDefault();

      var eventY = event.pageY;
      var eventX = event.pageX;
      if (event.type === "touchmove") {
        eventY = event.touches[0].pageY;
        eventX = event.touches[0].pageX;
      }
      if (
        (selectedId == "left" || selectedId == "right") &&
        eventY > box.offsetTop &&
        eventY < box.offsetTop + box.offsetHeight
      ) {
        positions[selectedId] = Math.round(
          ((eventY - box.offsetTop) * 100) / box.offsetHeight
        );
      } else if (
        (selectedId == "top" || selectedId == "bottom") &&
        eventX > box.offsetLeft &&
        eventX < box.offsetLeft + box.offsetWidth
      ) {
        positions[selectedId] = Math.round(
          ((eventX - box.offsetLeft) * 100) / box.offsetWidth
        );
      }
      _render();
    }
  }

  function dragEnd() {
    isActive = false;
    if (selectedId) {
      document.getElementById(selectedId).classList.remove("active");
    }
    selectedId = null;
  }

  function _calcPattern() {
    return `${positions.top}% ${100 - positions.top}% ${
      100 - positions.bottom
    }% ${positions.bottom}% / ${positions.left}% ${positions.right}% ${
      100 - positions.right
    }% ${100 - positions.left}%`;
  }

  function changeBoxSize(event) {
    if (event.target.id == "inputBoxWidth") {
      box.style.width = event.target.value + "px";
    } else {
      box.style.height = event.target.value + "px";
    }
  }

  function copyPattern() {
    const el = document.createElement("textarea");
    el.value = `border-radius: ${_calcPattern()}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
})();
