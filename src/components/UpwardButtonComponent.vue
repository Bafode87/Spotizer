<template>

  <svg width="32" height="32" class="upwardIcon">
    <use xlink:href="#upwardIcon"/>
  </svg>

  <symbol style="display: none;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="currentColor" id="upwardIcon">
      <path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z"/>
    </svg>
  </symbol>

</template>

<script setup>
import {onMounted} from 'vue';

const props = defineProps({
  showPosition: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  const arrow = document.querySelector('.upwardIcon');


  window.addEventListener('scroll', () => {
    if (window.scrollY > props.showPosition) {
      arrow.classList.add('show');
    } else {
      arrow.classList.remove('show');
    }
  });

  arrow.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  })

})


</script>
