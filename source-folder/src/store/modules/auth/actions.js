let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCb3-BWjNVRhXRhfHuDxm94oookPQ6WiiY";

    if(mode === 'signup') {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCb3-BWjNVRhXRhfHuDxm94oookPQ6WiiY";
    }

    const response = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate."
      );
      throw error;
    }


    //expiresIn = expiresIn(responseData)(second) * 1000 -> milisecond
    //convert to number by adding "+"
    // const expiresIn = +responseData.expiresIn * 1000;
    const expiresIn = 5000;

    //expirationDate = this.Time + expiresIn(milisecond)
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);



    // console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: expirationDate,
    });
  },


  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    //token, userId are invalid if expiresIn < 0
    if(expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }

  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didAutoLogout');
  }
};
