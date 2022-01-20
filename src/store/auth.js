const state = {
  user: null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    let use = JSON.stringify(user);
    localStorage.setItem("user", use);
  },

  logout(state) {
    state.user = null;
    localStorage.removeItem("user");
  },
};

const getters = {
  userName(state) {
    if (state.user !== null) {
      return { name: state.user.user.name, surname: state.user.user.surname };
    }
  },
  getToken(state) {
    if (state.user !== null) {
      return state.user.token;
    }
  },
  userLogged(state) {
    if (state.user !== null) {
      return state.user.message === "Auth Passed" ? true : false;
    }
    return false;
  },
  userData(state) {
    if (state.user !== null) {
      return state.user;
    }
  },
  userEmail(state) {
    if (state.user !== null) {
      return state.user.user.email;
    }
  },
  getRole(state) {
    if (state.user !== null) {
      return state.user.user.role;
    }
    return false;
  },
  getId(state) {
    if (state.user !== null) {
      return state.user.user.id;
    }
  },
  getContact(state) {
    if (state.user !== null) {
      return state.user.user.contact;
    }
  },
  getDate(state) {
    if (state.user !== null) {
      return state.user.user.createdAt;
    }
  },
};

export default {
  state,
  mutations,
  getters,
};
