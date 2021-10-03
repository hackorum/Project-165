AFRAME.registerComponent("enemy-fireballs", {
  init: function () {
    setInterval(this.shootOgre, 2000);
  },
  shootOgre: function () {
    let scene = document.querySelector("#scene");
    let enemyMonster = document.querySelectorAll(".enemy");
    for (let i = 0; i < enemyMonster.length; i++) {
      let fireball = document.createElement("a-entity");
      fireball.setAttribute("class", "fireball");
      fireball.setAttribute("gltf-model", "./models/fireball/scene.gltf");
      fireball.setAttribute("dynamic-body", { mass: 0 });
      let pos = enemyMonster[i].getAttribute("position");
      fireball.setAttribute("position", {
        x: pos.x,
        y: pos.y,
        z: pos.z,
      });
      fireball.setAttribute("scale", {
        x: 0.05,
        y: 0.05,
        z: 0.05,
      });
      scene.appendChild(fireball);
      let position1 = new THREE.Vector3();
      let position2 = new THREE.Vector3();
      let player = document.querySelector("#weapon").object3D;
      let enemy_fireball = fireball.object3D;
      player.getWorldPosition(position1);
      enemy_fireball.getWorldPosition(position2);
      let direction = new THREE.Vector3();
      direction.subVectors(position1, position2).normalize();
      fireball.setAttribute("velocity", direction.multiplyScalar(20));
      let element = document.querySelector("#countLife");
      let playerLife = parseInt(element.getAttribute("text").value);
      fireball.addEventListener("collide", function (e) {
        if (e.detail.body.el.id === "weapon") {
          if (playerLife > 0) {
            playerLife -= 1;
            element.setAttribute("text", {
              value: playerLife,
            });
          }
          if (playerLife <= 0) {
            let txt = document.querySelector("#over");
            txt.setAttribute("visible", true);
            let el = document.querySelectorAll(".enemy");
            for (let i = 0; i < el.length; i++) {
              scene.removeChild(el);
            }
          }
        }
      });
    }
  },
});
