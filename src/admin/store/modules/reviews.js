export default {
  namespaced: true,
  state: {
    data: [],
    user: {},
  },
  mutations: {
    SET_USER: (state, user) => {
			state.user = user;
		},
    ADD_REVIEW(state, newReview) {
      state.data.push(newReview);
    },
    SET_REVIEW(state, reviews) {
      state.data = reviews;
    },
    REMOVE_REVIEW: (state, reviewId) => {
      state.data = state.data.filter(review => review.id !== reviewId)
    },
    EDIT_REVIEW: (state, editReview) => {
      state.data = state.data.map(review => {
        return review.id === editReview.review.id ? editReview.review : review
      })
    }
  },
  actions: {
    async add({ commit }, newReview) {
      const formData = new FormData();
      
      Object.keys(newReview).forEach(item => {
        formData.append(item, newReview[item]);
      })

      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REVIEW", data);
      } catch (error) {
        console.log("error");
      }
    },
    async fetch({commit, rootState}) {
      try {
        const { data } = await this.$axios.get(`/reviews/${rootState.user.user.id}`);
        commit("SET_REVIEW", data);
      } catch (error) {
        console.log("error");
      }
    }, 
    async remove({commit}, reviewId) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${reviewId}`);
        commit("REMOVE_REVIEW", reviewId)
      } catch (error) {
        console.log("error");
      }
    }, 
    async edit({commit}, editReview) {
      const formData = new FormData();
      
      Object.keys(editReview).forEach(item => {
        formData.append(item, editReview[item]);
      })

      try {
        const { data } = await this.$axios.post(`/reviews/${editReview.id}`, formData);
        commit("EDIT_REVIEW", data);
      } catch (error) {
        console.log("error");
      }
    }
  },
};