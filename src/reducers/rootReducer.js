const initState = {
  user: {},
  pro: {},
  post: [],
  listCollection: [],
  likes: [],
  interest: null,
  counterReview: 0,
  report: {
    open: false,
    file: "",
    kind: "",
  },
  deletePost: {
    open: false,
    file: "",
  },

  peopleRecent: [],
  inbox: null,
  usernameList: [],
  iconList: [],
  followList: [],
  postData: [],
};
const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_LIKES") {
    return {
      ...state,
      likes: action.data,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.data,
    };
  }
  if (action.type === "PRO") {
    return {
      ...state,
      pro: action.data,
    };
  }
  if (action.type === "ADD_TO_COLLECTION") {
    return {
      ...state,
      listCollection: action.data,
    };
  }

  if (action.type === "ADD_TO_INTEREST") {
    return {
      ...state,
      interest: action.data,
    };
  }
  if (action.type == "UPDATE_REVIEW") {
    return {
      ...state,
      counterReview: action.data,
    };
  }
  if (action.type == "UPDATE_REPORT") {
    return {
      ...state,
      report: action.data,
    };
  }
  if (action.type == "DELETE_POST") {
    return {
      ...state,
      report: action.data,
    };
  }
  if (action.type == "UPDATE_INBOX") {
    return {
      ...state,
      inbox: action.data,
    };
  }
  if (action.type == "UPDATE_USERNAME") {
    return {
      ...state,
      usernameList: action.data,
    };
  }
  if (action.type == "UPDATE_ICON") {
    return {
      ...state,
      iconList: action.data,
    };
  }
  if (action.type == "UPDATE_FOLLOWER") {
    return {
      ...state,
      followList: action.data,
    };
  }
  if (action.type == "UPDATE_POSTDATA") {
    return {
      ...state,
      postData: action.data,
    };
  }
  return state;
};

export default rootReducer;
