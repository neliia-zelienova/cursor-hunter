class MoveLetter {
  constructor(target) {
    this.target = target;
    console.log("this.target", this.target);
    const styles = getComputedStyle(this.target);
    console.log("target.style", styles);
    this.currentPositionX = styles.left;
    this.currentPositionY = styles.bottom;
    this.addListener();
    console.log("this.currentPositionX", this.currentPositionX);
  }

  addListener() {
    console.log("addListener");
    this.target.addEventListener("mousemove", (e) => {
      console.log("addListener in handler");
      this.setNewPosition(e);
    });
  }

  setNewPosition(e) {
    console.log(" MoveLetter setNewPosition");
    console.log(" e.pageX,  e.pageY", e.pageX, e.pageY);
    console.log(" this.target.style", this.target.style.left);
    this.target.style.left = `${e.pageX}px`;
    this.target.style.top = `${e.pageY}px`;
  }
}

export default MoveLetter;
