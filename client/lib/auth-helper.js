import { signout } from "./api-auth.js";

const auth = {
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  },

  isAdmin() {
    const authData = this.isAuthenticated();
    return authData?.user?.role === "admin";
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    cb();
  },

  clearJWT(cb) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("jwt");
    }
    cb(); // optional callback
    signout().then(() => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;