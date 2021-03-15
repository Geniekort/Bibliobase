import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#93DCD7", // Greenblue
        secondary: "#181D27", // Black
        accent: "#FFDA22", // Yellow
        error: "#AB3428" // Red
      },
    },
  },
});
