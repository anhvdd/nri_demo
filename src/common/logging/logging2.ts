const BasicLogging = {
  requestDidStart(requestContext: any) {
    console.log("request started");
    console.log(requestContext.request.query);
    console.log(requestContext.request.variables);
    return {
      didEncounterErrors(requestContext: any) {
        console.log(
          "an error happened in response to query " +
            requestContext.request.query
        );
        console.log(requestContext.errors);
      },
    };
  },

  willSendResponse(requestContext: any) {
    console.log("response sent", requestContext.response);
  },
};

export default BasicLogging;
