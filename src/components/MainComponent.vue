<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeComponent from './HomeComponent.vue';
</script>

<template>
    <Suspense>
        <div v-if="$route.path === '/home'">
            <HomeComponent />
        </div>
    </Suspense>

    <nav>
        <RouterView>
            <ul class="menu">
                <RouterLink to="/home">
                    <li class="menu__item--active">
                        <svg width="32" height="32">
                            <use xlink:href="#iconHome" />
                        </svg>
                        <p>Accueil</p>
                    </li>
                </RouterLink>
                <RouterLink to="search">
                    <li class="menu__item">
                        <svg width="32" height="32">
                            <use xlink:href="#iconSearch" />
                        </svg>
                        <p>Recherche</p>
                    </li>
                </RouterLink>
                <RouterLink to="playlist">
                    <li class="menu__item">
                        <svg width="32" height="32">
                            <use xlink:href="#iconPlaylist" />
                        </svg>
                        <p>Playlists</p>
                    </li>
                </RouterLink>
            </ul>
        </RouterView>
    </nav>
    <!-- <RouterLink to="/about">About</RouterLink> -->
    <symbol style="display: none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" id="iconHome">
            <path
                d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="iconSearch" fill="currentColor">
            <path
                d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="iconPlaylist" fill="currentColor">
            <path
                d="M640.118 896Q591 896 556 862.441q-35-33.559-35-81.5t33.542-81.441Q588.083 666 636 666q16 0 31.5 3t30.5 10V336h182v71H758v375q0 47.5-34.382 80.75-34.383 33.25-83.5 33.25ZM120 726v-60h306v60H120Zm0-165v-60h473v60H120Zm0-165v-60h473v60H120Z" />
        </svg>
    </symbol>
</template>