<template>
  <div class="container-home">
    <HeaderHome />
    <div class="block-content">
      <!-- Первый блок -->
      <div class="header-content-home">
        <div class="header-text">
          <h1>Made For You</h1>
        </div>
        <ActionGroupButton
          @selected-clicked-fst="transitionSlideFst"
          :optionFst="[isDisabledPrevFst, isDisabledNextFst]"
        />
      </div>
      <div class="main-content-home cards">
        <TransitionGroup name="card-slide" tag="div" class="cards-container">
          <div
            v-for="(item, index) in currentSlideFst"
            :key="`fst-${currentSlideIndexFst}-${index}`"
            class="home-card"
            :style="{ '--card-index': index }"
          >
            <div class="img-card">
              <img :src="item.image" alt="default-img" />
            </div>
            <div class="content-card">
              <div class="content-card-header">
                <h4>{{ item.title }}</h4>
                <span class="count-track">{{ item.count }}</span>
              </div>
              <div class="content-card-description">
                <span>{{ item.description }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Второй блок -->
      <div class="header-content-home">
        <div class="header-text">
          <h1>Your Top Mixes</h1>
        </div>
        <ActionGroupButton
          @selected-clicked-sec="transitionSlideSec"
          :optionSec="[isDisabledPrevSec, isDisabledNextSec]"
        />
      </div>
      <div class="main-content-home cards">
        <TransitionGroup name="card-slide" tag="div" class="cards-container">
          <div
            v-for="(item, index) in currentSlideSec"
            :key="`sec-${currentSlideIndexSec}-${index}`"
            class="home-card"
            :style="{ '--card-index': index }"
          >
            <div class="img-card">
              <img :src="item.image" alt="default-img" />
            </div>
            <div class="content-card">
              <div class="content-card-header">
                <h4>{{ item.title }}</h4>
                <span class="count-track">{{ item.count }}</span>
              </div>
              <div class="content-card-description">
                <span>{{ item.description }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Третий блок -->
      <div class="header-content-home">
        <div class="header-text">
          <h1>Your Favorite Artists</h1>
        </div>
        <ActionGroupButton
          @selected-clicked-thrd="transitionSlideThrd"
          :optionThrd="[isDisabledPrevThrd, isDisabledNextThrd]"
        />
      </div>
      <div class="main-content-home cards">
        <TransitionGroup name="card-slide" tag="div" class="cards-container">
          <div
            v-for="(item, index) in currentSlideThrd"
            :key="`thrd-${currentSlideIndexThrd}-${index}`"
            class="home-card artist-card"
            :style="{ '--card-index': index }"
          >
            <div class="img-card-radius">
              <img :src="item.image" alt="artist-img" />
            </div>
            <div class="content-card">
              <div class="content-card-header">
                <h4 class="overlight">{{ item.name }}</h4>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";

import cardImg0 from "@/assets/img/image-0.png";
import cardImg1 from "@/assets/img/image-1.png";
import cardImg2 from "@/assets/img/image-2.png";

import artist0 from '@/assets/img/artist-0.png';
import artist1 from '@/assets/img/artist-1.jpg';
import artist2 from '@/assets/img/artist-2.jpeg';
import artist3 from '@/assets/img/artist-3.jpeg';

interface PlayListType {
  title: string;
  count: number;
  description: string;
  image: string;
}

interface ArtistType {
  name: string;
  image: string;
}

interface CardType {
  slide: number;
  playlists?: PlayListType[];
  artists?: ArtistType[];
}

// Заглушки для компонентов
const HeaderHome = {
  template: '<div class="header-home">Header Home Component</div>',
};

const ActionGroupButton = {
  template: '<div class="action-group-button">Action Buttons</div>',
};

export default defineComponent({
  name: "HomePage",
  components: {
    HeaderHome,
    ActionGroupButton,
  },
  setup() {
    // Данные для первого блока
    const cardsPlaylistFst = [
      {
        slide: 0,
        playlists: [
          {
            title: "Discover Weekly",
            count: 10,
            description: "Your weekly mixtape of fresh music",
            image: cardImg0,
          },
          {
            title: "Chill Hits",
            count: 15,
            description: "Kick back to the best new and recent chill hits",
            image: cardImg1,
          },
          {
            title: "Mood Booster",
            count: 20,
            description: "Get happy with today's dose of feel-good songs",
            image: cardImg1,
          },
          {
            title: "Rock Classics",
            count: 25,
            description:
              "Rock legends & epic songs that continue to inspire generations",
            image: cardImg0,
          },
          {
            title: "Jazz Vibes",
            count: 18,
            description: "The original chill instrumental beats",
            image: cardImg1,
          },
          {
            title: "Workout Energy",
            count: 30,
            description: "High-energy music to power your exercise",
            image: cardImg0,
          },
          {
            title: "Focus Flow",
            count: 12,
            description: "Instrumental music for deep concentration",
            image: cardImg1,
          },
        ],
      },
      {
        slide: 1,
        playlists: [
          {
            title: "Summer Hits 2024",
            count: 50,
            description: "The biggest songs of the summer",
            image: cardImg0,
          },
          {
            title: "Throwback Thursday",
            count: 45,
            description: "All the best throwbacks from the 80s, 90s and 2000s",
            image: cardImg1,
          },
          {
            title: "Electronic Rising",
            count: 35,
            description: "Future electronic hits before they blow up",
            image: cardImg1,
          },
          {
            title: "Indie Mix",
            count: 28,
            description: "Discover the best new indie music",
            image: cardImg0,
          },
          {
            title: "Rap Caviar",
            count: 42,
            description: "New music from Drake, Kendrick Lamar and more",
            image: cardImg1,
          },
          {
            title: "Country Roads",
            count: 38,
            description: "Today's top country hits",
            image: cardImg0,
          },
          {
            title: "Latin Heat",
            count: 33,
            description: "The hottest Latin tracks right now",
            image: cardImg1,
          },
        ],
      },
      {
        slide: 2,
        playlists: [
          {
            title: "Sleep & Relax",
            count: 40,
            description: "Gentle ambient piano to help you fall asleep",
            image: cardImg0,
          },
          {
            title: "Dinner Jazz",
            count: 25,
            description: "Soft jazz for your dinner party",
            image: cardImg1,
          },
          {
            title: "Acoustic Morning",
            count: 22,
            description: "Wake up gently with these acoustic pieces",
            image: cardImg1,
          },
          {
            title: "Piano Classics",
            count: 35,
            description: "The most beautiful piano compositions",
            image: cardImg0,
          },
          {
            title: "Study Lofi",
            count: 48,
            description: "A perfect selection of focus lofi beats",
            image: cardImg1,
          },
          {
            title: "Yoga & Meditation",
            count: 30,
            description: "Peaceful music for your yoga practice",
            image: cardImg0,
          },
          {
            title: "Nature Sounds",
            count: 18,
            description: "Rain, ocean waves and forest sounds",
            image: cardImg1,
          },
        ],
      },
    ] as CardType[];

    // Данные для второго блока
    const cardsPlaylistSec = [
      {
        slide: 0,
        playlists: [
          {
            title: "Rock Mix",
            count: 10,
            description: "Best rock songs for your taste",
            image: cardImg2,
          },
          {
            title: "Pop Hits",
            count: 15,
            description: "Today's top pop hits",
            image: cardImg1,
          },
          {
            title: "Electronic Dance",
            count: 20,
            description: "EDM tracks to keep you moving",
            image: cardImg1,
          },
          {
            title: "Hip Hop Essentials",
            count: 25,
            description: "Essential hip hop tracks",
            image: cardImg0,
          },
          {
            title: "R&B Soul",
            count: 18,
            description: "Smooth R&B and soul classics",
            image: cardImg1,
          },
          {
            title: "Country Mix",
            count: 30,
            description: "Best country tracks of all time",
            image: cardImg2,
          },
          {
            title: "Jazz Classics",
            count: 12,
            description: "Timeless jazz standards",
            image: cardImg1,
          },
        ],
      },
      {
        slide: 1,
        playlists: [
          {
            title: "Workout Mix",
            count: 50,
            description: "High energy tracks for your workout",
            image: cardImg0,
          },
          {
            title: "Chill Vibes",
            count: 45,
            description: "Relaxing tunes for winding down",
            image: cardImg2,
          },
          {
            title: "Party Anthems",
            count: 35,
            description: "Songs to get the party started",
            image: cardImg1,
          },
          {
            title: "Focus Mode",
            count: 28,
            description: "Music for deep concentration",
            image: cardImg0,
          },
          {
            title: "Road Trip",
            count: 42,
            description: "Perfect playlist for long drives",
            image: cardImg2,
          },
          {
            title: "Morning Coffee",
            count: 38,
            description: "Gentle tunes to start your day",
            image: cardImg2,
          },
          {
            title: "Evening Wind Down",
            count: 33,
            description: "Relaxing music for the evening",
            image: cardImg1,
          },
        ],
      },
      {
        slide: 2,
        playlists: [
          {
            title: "Classical Essentials",
            count: 40,
            description: "Essential classical compositions",
            image: cardImg0,
          },
          {
            title: "Indie Discoveries",
            count: 25,
            description: "Hidden indie gems",
            image: cardImg1,
          },
          {
            title: "Metal Power",
            count: 22,
            description: "Powerful metal tracks",
            image: cardImg2,
          },
          {
            title: "Reggae Roots",
            count: 35,
            description: "Classic reggae and roots music",
            image: cardImg0,
          },
          {
            title: "Blues Legends",
            count: 48,
            description: "Legendary blues artists",
            image: cardImg2,
          },
          {
            title: "Folk Stories",
            count: 30,
            description: "Storytelling through folk music",
            image: cardImg2,
          },
          {
            title: "World Music",
            count: 18,
            description: "Music from around the globe",
            image: cardImg1,
          },
        ],
      },
    ] as CardType[];

    // Данные для третьего блока (артисты)
    const cardsArtists = [
      {
        slide: 0,
        artists: [
          {
            name: '5opka',
            image: artist0
          },
          {
            name: 'MellSher',
            image: artist1
          },
          {
            name: 'HOLIDAYBOY',
            image: artist3,
          },
          {
            name: 'MAKE FAMILY NOT FRIENDS',
            image: artist2
          },
          {
            name: 'The Weeknd',
            image: artist0
          },
          {
            name: 'Taylor Swift',
            image: artist1
          },
          {
            name: 'Drake',
            image: artist2
          }
        ]
      },
      {
        slide: 1,
        artists: [
          {
            name: 'Ariana Grande',
            image: artist3
          },
          {
            name: 'Ed Sheeran',
            image: artist0
          },
          {
            name: 'Billie Eilish',
            image: artist1
          },
          {
            name: 'Post Malone',
            image: artist2
          },
          {
            name: 'Dua Lipa',
            image: artist3
          },
          {
            name: 'Kendrick Lamar',
            image: artist0
          },
          {
            name: 'Doja Cat',
            image: artist1
          }
        ]
      },
      {
        slide: 2,
        artists: [
          {
            name: 'Bad Bunny',
            image: artist2
          },
          {
            name: 'Harry Styles',
            image: artist3
          },
          {
            name: 'Olivia Rodrigo',
            image: artist0
          },
          {
            name: 'Bruno Mars',
            image: artist1
          },
          {
            name: 'SZA',
            image: artist2
          },
          {
            name: 'Travis Scott',
            image: artist3
          },
          {
            name: 'Lana Del Rey',
            image: artist0
          }
        ]
      }
    ] as CardType[];

    // Логика для первого блока
    const currentSlideIndexFst = ref(0);
    const isDisabledPrevFst = ref(true);
    const isDisabledNextFst = ref(false);

    const currentSlideFst = computed(() => {
      const slide = cardsPlaylistFst.find(
        (item) => item.slide === currentSlideIndexFst.value
      );
      return slide ? slide.playlists : [];
    });

    const transitionSlideFst = (value: number) => {
      if (value === 0) {
        // Prev
        if (currentSlideIndexFst.value > 0) {
          currentSlideIndexFst.value--;
        }
      } else {
        // Next
        if (currentSlideIndexFst.value < cardsPlaylistFst.length - 1) {
          currentSlideIndexFst.value++;
        }
      }

      // Update button states для первого блока
      isDisabledPrevFst.value = currentSlideIndexFst.value === 0;
      isDisabledNextFst.value =
        currentSlideIndexFst.value === cardsPlaylistFst.length - 1;
    };

    // Логика для второго блока
    const currentSlideIndexSec = ref(0);
    const isDisabledPrevSec = ref(true);
    const isDisabledNextSec = ref(false);

    const currentSlideSec = computed(() => {
      const slide = cardsPlaylistSec.find(
        (item) => item.slide === currentSlideIndexSec.value
      );
      return slide ? slide.playlists : [];
    });

    const transitionSlideSec = (value: number) => {
      if (value === 0) {
        // Prev
        if (currentSlideIndexSec.value > 0) {
          currentSlideIndexSec.value--;
        }
      } else {
        // Next
        if (currentSlideIndexSec.value < cardsPlaylistSec.length - 1) {
          currentSlideIndexSec.value++;
        }
      }

      // Update button states для второго блока
      isDisabledPrevSec.value = currentSlideIndexSec.value === 0;
      isDisabledNextSec.value =
        currentSlideIndexSec.value === cardsPlaylistSec.length - 1;
    };

    // Логика для третьего блока
    const currentSlideIndexThrd = ref(0);
    const isDisabledPrevThrd = ref(true);
    const isDisabledNextThrd = ref(false);

    const currentSlideThrd = computed(() => {
      const slide = cardsArtists.find(
        (item) => item.slide === currentSlideIndexThrd.value
      );
      return slide ? slide.artists : [];
    });

    const transitionSlideThrd = (value: number) => {
      if (value === 0) {
        // Prev
        if (currentSlideIndexThrd.value > 0) {
          currentSlideIndexThrd.value--;
        }
      } else {
        // Next
        if (currentSlideIndexThrd.value < cardsArtists.length - 1) {
          currentSlideIndexThrd.value++;
        }
      }

      // Update button states для третьего блока
      isDisabledPrevThrd.value = currentSlideIndexThrd.value === 0;
      isDisabledNextThrd.value =
        currentSlideIndexThrd.value === cardsArtists.length - 1;
    };

    onMounted(() => {
      // Initial render
    });

    return {
      // Первый блок
      transitionSlideFst,
      currentSlideFst,
      currentSlideIndexFst,
      isDisabledPrevFst,
      isDisabledNextFst,

      // Второй блок
      transitionSlideSec,
      currentSlideSec,
      currentSlideIndexSec,
      isDisabledPrevSec,
      isDisabledNextSec,

      // Третий блок
      transitionSlideThrd,
      currentSlideThrd,
      currentSlideIndexThrd,
      isDisabledPrevThrd,
      isDisabledNextThrd,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>