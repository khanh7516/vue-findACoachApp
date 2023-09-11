export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      // coachId: payload.coachID,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://hello-f4192-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachID}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    console.log(response);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to send request");
      throw error;
    }

    console.log(responseData);

    newRequest.id = responseData.name;
    newRequest.coachID = payload.coachID;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userID;

    const response = await fetch(
      `https://hello-f4192-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to send request");
      throw error;
    }

    // console.log(responseData);
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    console.log(requests);

    context.commit("setRequests", requests);
  },
};
