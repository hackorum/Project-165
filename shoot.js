AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        let bullet = document.createElement("a-entity");
        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.2,
        });
        bullet.setAttribute("material", "color", "blue");
        let cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");
        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 2,
          z: pos.z,
        });
        let camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        let direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        let scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        bullet.setAttribute("visible", true);

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    let scene = document.querySelector("#scene");
    //bullet element
    let element = e.detail.target.el;

    //element which is hit
    let elementHit = e.detail.body.el;

    if (elementHit.id.includes("enemy")) {
      let countMonsterEl = document.querySelector("#countMonster");
      let monsterFired = parseInt(countMonsterEl.getAttribute("text").value);
      monsterFired -= 1;

      countMonsterEl.setAttribute("text", {
        value: monsterFired,
      });

      if (monsterFired === 0) {
        let txt = document.querySelector("#completed");
        txt.setAttribute("visible", true);
      }
      scene.removeChild(elementHit);
    }

    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene
    scene.removeChild(element);
  },
  shootSound: function () {
    let entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});
