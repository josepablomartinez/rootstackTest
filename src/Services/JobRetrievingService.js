import TokenManagement from "../utils/TokenManagement";

//returns the list of jobs
const getJobs = () => {
  let securityToken = TokenManagement.get();
  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY29kaW5nLXRlc3Qucm9vdHN0YWNrLm5ldFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYwOTMzOTE4NywiZXhwIjoxNjA5MzQyNzg3LCJuYmYiOjE2MDkzMzkxODcsImp0aSI6IkJnaXFEN1NEUXhWOW85WEoiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.MAevljygxfWURrSdgf2ShFNsKaLWFXQm4hM41WIUkKU";
  // TokenManagement.get;
  const jobURL = "https://coding-test.rootstack.net/api/jobs";

  const requestOptions = {
    method: "GET",
    crossDomain: true,
    Accept: "*/*",
    mimeType: "multipart/json",
    headers: { Authorization: `bearer ${securityToken}` },
  };

  return fetch(jobURL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
};

export const JobRetrievingService = {
  getJobs,
};
