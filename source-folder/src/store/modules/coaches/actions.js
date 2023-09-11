export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userID;
    const token = context.rootGetters.token;
    const coachData = {
      // id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.des,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://hello-f4192-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        // method: 'POST',
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch');
        throw error;
    }

    // context.commit('registerCoach', coachData); //call mutation registerCoach
    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if(!context.getters.shouldUpdate && !payload) {
      return;
    }


    const response = await fetch(
      `https://hello-f4192-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );
     
    const responseData = await response.json();

    if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch');
        throw error;
    }

    const coaches = [];

    for(const key in responseData) {
        const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas,
        };

        coaches.push(coach);
    }
    console.log(coaches);
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
    
  },

};
