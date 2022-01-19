<template>
  <div class="ctn">
    <input type="checkbox" id="check" />
    <label for="check" class="btn-label">
      <span class="load open"></span>
      <p class="btn-text">Log-In</p>
    </label>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
    .ctn {
  display: flex;
  justify-content: center;
}
#check {
  display: none;
}
.btn-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #33849c;
  border: none;
  font-family: 'Raleway', serif;
  font-size: 30px;
  color: #fffeee;
  margin-top: 10px;
  height: 40px;
  width: 260px;
  border-radius: 5px;
}
.btn-text {
  font-family: 'Raleway', serif;
  font-size: 20px;
  color: #fffeee;
}
.load {
  display: none;
  width: 20px;
  height: 20px;
  border: 5px solid #fff;
  border-radius: 100%;
}
.open {
  border-top: 5px solid transparent;
  animation: load-animate infinite linear 1s;
}
#check:checked ~ .btn-label > .btn-text {
  display: none;
}
#check:checked ~ .btn-label > .load {
  display: inline-block;
}
@-moz-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load-animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.35;
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
